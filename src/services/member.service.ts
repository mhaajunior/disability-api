import { NewCommonError } from "../models/dto/error.dto";
import Member from "../models/schemas/member.schema";
import Inconsist from "../models/schemas/inconsist.schema";
import code from "../resource/common.code";
import mongoose from "mongoose";
import { IMember } from "../models/dto/disability.dto";

const fetchMembersfromMongo = async (file_id: string, iden: string) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const inconsists = await Inconsist.find({ file_id, iden });
    const members = await Member.aggregate([
      { $match: { file_id: new ObjectId(file_id), iden } },
      { $unwind: "$fields" },
      {
        $project: {
          _id: 1,
          "fields.step1": 1,
        },
      },
    ]);
    const errArr: string[] = [];
    let data: any = {};

    for (const member of members) {
      const found = inconsists.find(
        (inconsist) => inconsist.member_id === member._id.toString()
      );
      if (found) {
        errArr.push(member._id.toString());
      }
    }
    data.members = members;
    data.errArr = errArr;

    return { data, err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    return { data: err, err: NewCommonError(code.ERR_INTERNAL) };
  }
};

const fetchMemberByIdfromMongo = async (member_id: string) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const inconsists = await Inconsist.find({ member_id });
    const members = await Member.aggregate([
      { $match: { _id: new ObjectId(member_id) } },
      {
        $lookup: {
          from: "files",
          localField: "file_id",
          foreignField: "_id",
          as: "files",
        },
      },
      {
        $unwind: "$files",
      },
      {
        $project: {
          fields: 1,
          iden: 1,
          file_id: 1,
          "files.name": 1,
        },
      },
    ]);

    let data: any = {
      ...members[0],
      inconsist: inconsists.length > 0 ? inconsists[0].inconsist : null,
    };

    return { data, err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    return { data: err, err: NewCommonError(code.ERR_INTERNAL) };
  }
};

const updateMemberToMongo = async (member_id: string, member_form: IMember) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const doc: any = await Member.findOneAndUpdate(
      { _id: new ObjectId(member_id) },
      { fields: member_form },
      { new: true }
    );
    return { data: doc, err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    return { data: err, err: NewCommonError(code.ERR_INTERNAL) };
  }
};

const updateEditDate = async (member_id: string) => {
  try {
    const count = await Inconsist.countDocuments({ member_id });
    if (count > 0) {
      await Inconsist.findOneAndUpdate(
        { member_id },
        { edit_datetime: new Date() }
      );
    }
    return { err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    return { err: NewCommonError(code.ERR_INTERNAL) };
  }
};

export {
  fetchMembersfromMongo,
  fetchMemberByIdfromMongo,
  updateMemberToMongo,
  updateEditDate,
};
