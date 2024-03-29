import mongoose from "mongoose";
import File from "../models/schemas/file.schema";
import Inconsist from "../models/schemas/inconsist.schema";
import code from "../resource/common.code";
import {
  IErrorBetMem,
  IInconsist,
  IMemberError,
} from "../models/dto/error.dto";
import {
  validateStep1,
  validateStep10,
  validateStep11,
  validateStep2,
  validateStep3,
  validateStep4,
  validateStep5,
  validateStep6,
  validateStep7,
  validateStep8,
  validateStep9,
} from "../helpers/consistency.helper";
import { NewCommonError } from "../helpers/commom.helper";

const aggregateFile = async (file_id: string) => {
  try {
    const file = await File.find({ _id: file_id });
    if (!file) {
      throw Error("FILE_NOT_FOUND");
    }

    const ObjectId = mongoose.Types.ObjectId;
    const result = await File.aggregate([
      { $match: { _id: new ObjectId(file_id) } },
      {
        $lookup: {
          from: "households",
          let: { file_id: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$file_id", "$$file_id"] } } },
            {
              $lookup: {
                from: "members",
                let: { iden: "$iden" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$file_id", "$$file_id"] },
                          { $eq: ["$iden", "$$iden"] },
                        ],
                      },
                    },
                  },
                ],
                as: "members",
              },
            },
          ],
          as: "households",
        },
      },
    ]);

    return { data: result[0], err: NewCommonError(code.SUCCESS) };
  } catch (err: any) {
    throw Error(err.message);
  }
};

const upsertErrorRow = async (obj: IMemberError) => {
  try {
    await Inconsist.findOneAndUpdate(
      { file_id: obj.file_id, member_id: obj.member_id, iden: obj.iden },
      { $set: { inconsist: obj.inconsist, total_errors: obj.total_errors } },
      {
        new: true,
        upsert: true, // Make this update into an upsert
      }
    );
    return { err: NewCommonError(code.CREATED) };
  } catch (err) {
    throw Error("ERR_INTERNAL");
  }
};

const updateFileStatus = async (param: string, status: string) => {
  try {
    await File.findOneAndUpdate({ _id: param }, { $set: { status } });
    return { err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    throw Error("ERR_INTERNAL");
  }
};

const deleteErrorRow = async (member_id: string) => {
  try {
    const count = await Inconsist.countDocuments({ member_id });
    if (count > 0) {
      await Inconsist.findOneAndRemove({ member_id });
    }
    return { err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    throw Error("ERR_INTERNAL");
  }
};

const findAndUpdateFile = async (file_id: string) => {
  try {
    const count = await Inconsist.countDocuments({ file_id });
    if (count === 0) {
      await updateFileStatus(file_id, "success");
    } else {
      await updateFileStatus(file_id, "error");
    }
    return { err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    throw Error("ERR_INTERNAL");
  }
};

const fetchHouseholdViaStatus = async (
  file_id: string,
  page_no: number,
  per_page: number
) => {
  try {
    const res = await File.find({ _id: file_id });
    if (res) {
      if (res[0].status === "pending") {
        return { data: "pending", err: NewCommonError(code.SUCCESS) };
      } else if (res[0].status === "error") {
        const ObjectId = mongoose.Types.ObjectId;
        const inconsist = await Inconsist.aggregate([
          { $match: { file_id } },
          {
            $group: {
              _id: "$iden",
              totalMemErrors: { $sum: 1 },
              overallErrors: { $sum: "$total_errors" },
            },
          },
          {
            $lookup: {
              from: "households",
              let: { iden: "$_id", file_id: new ObjectId(file_id) },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $and: [
                        { $eq: ["$file_id", "$$file_id"] },
                        { $eq: ["$iden", "$$iden"] },
                      ],
                    },
                  },
                },
              ],
              as: "households",
            },
          },
          { $unwind: "$households" },
          {
            $facet: {
              stage1: [{ $group: { _id: 0, count: { $sum: 1 } } }],
              stage2: [
                {
                  $project: {
                    editDatetime: {
                      $dateToString: {
                        format: "%Y-%m-%d %H:%M:%S",
                        date: "$households.edit_datetime",
                        timezone: "Asia/Bangkok",
                      },
                    },
                    totalMemErrors: 1,
                    overallErrors: 1,
                    _id: 1,
                  },
                },
                { $sort: { _id: 1 } },
                { $skip: (page_no - 1) * per_page },
                { $limit: per_page },
              ],
            },
          },
          { $unwind: "$stage1" },
          {
            $project: {
              count: "$stage1.count",
              result: "$stage2",
            },
          },
        ]);
        return { data: inconsist[0], err: NewCommonError(code.SUCCESS) };
      } else {
        return { data: "success", err: NewCommonError(code.SUCCESS) };
      }
    } else {
      throw Error("FILE_NOT_FOUND");
    }
  } catch (err: any) {
    throw Error(err.message);
  }
};

const consistencyCheck = async (
  member: any,
  h_members: string,
  errorBetMem: IErrorBetMem
) => {
  const checkStep1 = validateStep1(member.fields.step1, errorBetMem.leadAge);
  const checkStep2 = validateStep2(
    member.fields.step2,
    parseInt(member.fields.step1.f6)
  );
  const checkStep3 = validateStep3(
    member.fields.step3,
    parseInt(member.fields.step1.f6)
  );
  const checkStep4 = validateStep4(
    member.fields.step4,
    parseInt(member.fields.step1.f6)
  );
  const checkStep5 = validateStep5(
    member.fields.step5,
    parseInt(member.fields.step1.f6)
  );
  const checkStep6 = validateStep6(
    member.fields.step6,
    parseInt(member.fields.step1.f6)
  );
  const checkStep7 = validateStep7(
    member.fields.step7,
    parseInt(member.fields.step1.f6),
    member.fields.step5.f50,
    member.fields.step6.f86,
    h_members,
    member.fields.step1.f5
  );
  const checkStep8 = validateStep8(
    member.fields.step8,
    parseInt(member.fields.step1.f6),
    member.fields.step4,
    member.fields.step5,
    member.fields.step6
  );
  const checkStep9 = validateStep9(
    member.fields.step9,
    parseInt(member.fields.step1.f6),
    member.fields.step4,
    member.fields.step5,
    member.fields.step6,
    member.fields.step8
  );
  const checkStep10 = validateStep10(
    member.fields.step10,
    parseInt(member.fields.step1.f6),
    member.fields.step9,
    parseInt(member.fields.step3.f15)
  );
  const checkStep11 = validateStep11(
    member.fields.step11,
    parseInt(member.fields.step1.f1),
    errorBetMem.checkH19,
    errorBetMem.checkH11
  );

  let errors: IInconsist = {};
  let total_errors = 0;
  if (checkStep1) {
    errors.step1 = checkStep1;
    total_errors += checkStep1.codes.length;
  }
  if (checkStep2) {
    errors.step2 = checkStep2;
    total_errors += checkStep2.codes.length;
  }
  if (checkStep3) {
    errors.step3 = checkStep3;
    total_errors += checkStep3.codes.length;
  }
  if (checkStep4) {
    errors.step4 = checkStep4;
    total_errors += checkStep4.codes.length;
  }
  if (checkStep5) {
    errors.step5 = checkStep5;
    total_errors += checkStep5.codes.length;
  }
  if (checkStep6) {
    errors.step6 = checkStep6;
    total_errors += checkStep6.codes.length;
  }
  if (checkStep7) {
    errors.step7 = checkStep7;
    total_errors += checkStep7.codes.length;
  }
  if (checkStep8) {
    errors.step8 = checkStep8;
    total_errors += checkStep8.codes.length;
  }
  if (checkStep9) {
    errors.step9 = checkStep9;
    total_errors += checkStep9.codes.length;
  }
  if (checkStep10) {
    errors.step10 = checkStep10;
    total_errors += checkStep10.codes.length;
  }
  if (checkStep11) {
    errors.step11 = checkStep11;
    total_errors += checkStep11.codes.length;
  }

  try {
    if (Object.keys(errors).length > 0) {
      const errorsObj: IMemberError = {
        member_id: member._id,
        iden: member.iden,
        file_id: member.file_id,
        total_errors,
        inconsist: errors,
      };
      //upsert error to mongo and update file, household, member status to error

      await upsertErrorRow(errorsObj);
      return { err: NewCommonError(code.SUCCESS) };
    } else {
      // check if having previous error in db, delete it
      await deleteErrorRow(member._id);
      return { err: NewCommonError(code.SUCCESS) };
    }
  } catch (err) {
    throw Error("ERR_INTERNAL");
  }
};

export {
  aggregateFile,
  upsertErrorRow,
  updateFileStatus,
  deleteErrorRow,
  findAndUpdateFile,
  fetchHouseholdViaStatus,
  consistencyCheck,
};
