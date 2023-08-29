import * as fs from "fs";
import { parse } from "@fast-csv/parse";
import File from "../models/schemas/file.schema";
import Household from "../models/schemas/household.schema";
import Member from "../models/schemas/member.schema";
import Inconsist from "../models/schemas/inconsist.schema";
import code from "../resource/common.code";
import {
  household,
  step1,
  step10,
  step11,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
  step8,
  step9,
} from "../resource/fieldGroup";
import { NewCommonError, isNull } from "../helpers/commom.helper";
import { IHousehold, IDisability, IMember } from "../models/dto/disability.dto";
import {
  IStep1,
  IStep10,
  IStep11,
  IStep2,
  IStep3,
  IStep4,
  IStep5,
  IStep6,
  IStep7,
  IStep8,
  IStep9,
} from "../models/dto/member.dto";
import { ObjectId } from "mongoose";

const uploadDataToMongo = async (
  filePath: string,
  fileName: string,
  user_id: ObjectId
) => {
  let stream = fs.createReadStream(filePath);
  let csvData: IDisability[] = [];

  const csvStream = parse({ headers: true })
    .on("error", (error) => console.error(error))
    .on("data", (row) => csvData.push(row))
    .on("end", async (rowCount: number) => {
      try {
        //Save to mongo
        const file = new File({
          name: fileName.split(".")[0],
          rows: rowCount,
          status: "pending",
          user_id,
        });

        await file.save();
        const iden_arr: string[] = [];
        for (const row of csvData) {
          let iden: string = "";
          let householdObj: IHousehold = {
            reg: "",
            cwt: "",
            amp: "",
            tmb: "",
            area: "",
            ea: "",
            vil: "",
            psu_no: "",
            ea_set: "",
            month: "",
            yr: "",
            hh_no: "",
            list_gr: "",
            listing: "",
            enum: "",
          };
          let step1Obj: IStep1 = {};
          let step2Obj: IStep2 = {};
          let step3Obj: IStep3 = {};
          let step4Obj: IStep4 = {};
          let step5Obj: IStep5 = {};
          let step6Obj: IStep6 = {};
          let step7Obj: IStep7 = {};
          let step8Obj: IStep8 = {};
          let step9Obj: IStep9 = {};
          let step10Obj: IStep10 = {};
          let step11Obj: IStep11 = {};
          let memberObj: IMember = {};

          for (const key in row) {
            if (household.includes(key)) {
              householdObj[key as keyof IHousehold] = isNull(
                row[key as keyof IDisability]
              );
            } else if (step1.includes(key)) {
              step1Obj[key as keyof IStep1] = isNull(
                row[key as keyof IDisability]
              );
            } else if (step2.includes(key)) {
              step2Obj[key as keyof IStep2] = isNull(
                row[key as keyof IDisability]
              );
            } else if (step3.includes(key)) {
              step3Obj[key as keyof IStep3] = isNull(
                row[key as keyof IDisability]
              );
            } else if (step4.includes(key)) {
              step4Obj[key as keyof IStep4] = isNull(
                row[key as keyof IDisability]
              );
            } else if (step5.includes(key)) {
              step5Obj[key as keyof IStep5] = isNull(
                row[key as keyof IDisability]
              );
            } else if (step6.includes(key)) {
              step6Obj[key as keyof IStep6] = isNull(
                row[key as keyof IDisability]
              );
            } else if (step7.includes(key)) {
              step7Obj[key as keyof IStep7] = isNull(
                row[key as keyof IDisability]
              );
            } else if (step8.includes(key)) {
              step8Obj[key as keyof IStep8] = isNull(
                row[key as keyof IDisability]
              );
            } else if (step9.includes(key)) {
              step9Obj[key as keyof IStep9] = isNull(
                row[key as keyof IDisability]
              );
            } else if (step10.includes(key)) {
              step10Obj[key as keyof IStep10] = isNull(
                row[key as keyof IDisability]
              );
            } else if (step11.includes(key)) {
              step11Obj[key as keyof IStep11] = isNull(
                row[key as keyof IDisability]
              );
            } else {
              memberObj[key as keyof IMember] = isNull(
                row[key as keyof IDisability]
              );
            }
          }

          for (const key in householdObj) {
            iden += householdObj[key as keyof IHousehold];
          }

          const member = new Member({
            fields: {
              step1: step1Obj,
              step2: step2Obj,
              step3: step3Obj,
              step4: step4Obj,
              step5: step5Obj,
              step6: step6Obj,
              step7: step7Obj,
              step8: step8Obj,
              step9: step9Obj,
              step10: step10Obj,
              step11: step11Obj,
              ...memberObj,
            },
            iden,
            file_id: file,
          });

          await member.save();
          const found = iden_arr.find((elm) => elm === iden);
          if (!found) {
            iden_arr.push(iden);
            const household = new Household({
              fields: householdObj,
              iden,
              file_id: file,
            });

            await household.save();
          }
        }

        // delete file after saving to database
        fs.unlinkSync(filePath);
      } catch (err) {
        return { err: NewCommonError(code.ERR_INTERNAL) };
      }
    });

  stream.pipe(csvStream);
  return { err: NewCommonError(code.CREATED) };
};

const fetchFilesfromMongo = async (user_id: ObjectId) => {
  try {
    const res = await File.find({ user_id }).sort("-import_date");
    return { data: res, err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    throw Error("ERR_INTERNAL");
  }
};

const deleteDatafromMongo = async (fileId: string) => {
  try {
    //PENDING DO: move to cron
    await File.findByIdAndRemove(fileId);
    await Household.deleteMany({ file_id: fileId });
    await Member.deleteMany({ file_id: fileId });
    await Inconsist.deleteMany({ file_id: fileId });

    return { err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    throw Error("ERR_INTERNAL");
  }
};

export { uploadDataToMongo, fetchFilesfromMongo, deleteDatafromMongo };
