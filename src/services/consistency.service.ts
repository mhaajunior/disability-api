import File from "../models/schemas/file.schema";
import Inconsist from "../models/schemas/inconsist.schema";
import code from "../resource/common.code";
import { MemberError, NewCommonError } from "../models/dto/error.dto";
import mongoose from "mongoose";

const aggregateFile = async (file_id: string) => {
  try {
    const file = await File.find({ _id: file_id });
    if (!file) {
      return { data: null, err: NewCommonError(code.FILE_NOT_FOUND) };
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
  } catch (err) {
    return { data: err, err: NewCommonError(code.ERR_INTERNAL) };
  }
};

const upsertErrorRow = async (obj: MemberError) => {
  try {
    await Inconsist.findOneAndUpdate(
      { file_id: obj.file_id, member_id: obj.member_id, iden: obj.iden },
      { $set: { inconsist: obj.inconsist, total_errors: obj.total_errors } },
      {
        new: true,
        upsert: true, // Make this update into an upsert
      }
    );
    return { err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    return { err: NewCommonError(code.ERR_INTERNAL) };
  }
};

const updateFileStatus = async (param: string, status: string) => {
  try {
    await File.findOneAndUpdate({ _id: param }, { $set: { status } });
    return { err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    return { err: NewCommonError(code.ERR_INTERNAL) };
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
    return { err: NewCommonError(code.ERR_INTERNAL) };
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
    return { err: NewCommonError(code.ERR_INTERNAL) };
  }
};

const fetchHouseholdViaStatus = async (file_id: string) => {
  try {
    const res = await File.find({ _id: file_id });
    if (res) {
      if (res[0].status === "pending") {
        return { data: "pending", err: NewCommonError(code.SUCCESS) };
      } else if (res[0].status === "error") {
        const inconsist = await Inconsist.aggregate([
          { $match: { file_id: file_id } },
          {
            $group: {
              _id: "$iden",
              totalMemErrors: { $sum: 1 },
              overallErrors: { $sum: "$total_errors" },
            },
          },
          { $sort: { _id: 1 } },
        ]);
        return { data: inconsist, err: NewCommonError(code.SUCCESS) };
      } else {
        return { data: "success", err: NewCommonError(code.SUCCESS) };
      }
    } else {
      return { data: null, err: NewCommonError(code.FILE_NOT_FOUND) };
    }
  } catch (err) {
    return { data: null, err: NewCommonError(code.ERR_INTERNAL) };
  }
};

export {
  aggregateFile,
  upsertErrorRow,
  updateFileStatus,
  deleteErrorRow,
  findAndUpdateFile,
  fetchHouseholdViaStatus,
};
