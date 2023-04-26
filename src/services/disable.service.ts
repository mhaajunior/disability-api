import * as fs from "fs";
import { parse } from "@fast-csv/parse";
import File from "../models/schemas/file.schema";
import Household from "../models/schemas/household.schema";
import Member from "../models/schemas/member.schema";
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
import { NewCommonError } from "../models/dto/error.dto";
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
import { isNull } from "../helpers/commom.helper";

const uploadDataToMongo = (filePath: string, fileName: string) => {
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
        });

        await file.save();
        const iden_arr: string[] = [];
        for (const row of csvData) {
          let iden: string = "";
          let obj: IDisability = {
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
              householdObj[key as keyof typeof householdObj] = isNull(
                row[key as keyof typeof obj]
              );
            } else if (step1.includes(key)) {
              step1Obj[key as keyof typeof step1Obj] = isNull(
                row[key as keyof typeof obj]
              );
            } else if (step2.includes(key)) {
              step2Obj[key as keyof typeof step2Obj] = isNull(
                row[key as keyof typeof obj]
              );
            } else if (step3.includes(key)) {
              step3Obj[key as keyof typeof step3Obj] = isNull(
                row[key as keyof typeof obj]
              );
            } else if (step4.includes(key)) {
              step4Obj[key as keyof typeof step4Obj] = isNull(
                row[key as keyof typeof obj]
              );
            } else if (step5.includes(key)) {
              step5Obj[key as keyof typeof step5Obj] = isNull(
                row[key as keyof typeof obj]
              );
            } else if (step6.includes(key)) {
              step6Obj[key as keyof typeof step6Obj] = isNull(
                row[key as keyof typeof obj]
              );
            } else if (step7.includes(key)) {
              step7Obj[key as keyof typeof step7Obj] = isNull(
                row[key as keyof typeof obj]
              );
            } else if (step8.includes(key)) {
              step8Obj[key as keyof typeof step8Obj] = isNull(
                row[key as keyof typeof obj]
              );
            } else if (step9.includes(key)) {
              step9Obj[key as keyof typeof step9Obj] = isNull(
                row[key as keyof typeof obj]
              );
            } else if (step10.includes(key)) {
              step10Obj[key as keyof typeof step10Obj] = isNull(
                row[key as keyof typeof obj]
              );
            } else if (step11.includes(key)) {
              step11Obj[key as keyof typeof step11Obj] = isNull(
                row[key as keyof typeof obj]
              );
            } else {
              memberObj[key as keyof typeof memberObj] = isNull(
                row[key as keyof typeof obj]
              );
            }
          }

          for (const key in householdObj) {
            iden += householdObj[key as keyof typeof householdObj];
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
            status: "pending",
          });

          await member.save();
          const found = iden_arr.find((elm) => elm === iden);
          if (!found) {
            iden_arr.push(iden);
            const household = new Household({
              fields: householdObj,
              iden,
              status: "pending",
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
  return { err: NewCommonError(code.SUCCESS) };
};

const fetchFilesfromMongo = async () => {
  try {
    const res = await File.find({}).sort("-import_date");
    return { data: res, err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    return { data: err, err: NewCommonError(code.ERR_INTERNAL) };
  }
};

const deleteDatafromMongo = async (fileId: string) => {
  try {
    await File.findByIdAndRemove(fileId);
    await Household.deleteMany({ file_id: fileId });
    await Member.deleteMany({ file_id: fileId });
    return { err: NewCommonError(code.SUCCESS) };
  } catch (err) {
    return { err: NewCommonError(code.ERR_INTERNAL) };
  }
};

export { uploadDataToMongo, fetchFilesfromMongo, deleteDatafromMongo };
