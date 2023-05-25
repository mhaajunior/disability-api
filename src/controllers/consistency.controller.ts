import { Request, Response } from "express";
import * as consistencyService from "../services/consistency.service";
import { HttpStatusCode } from "../resource/common.code";
import code from "../resource/common.code";
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
import { Inconsist, MemberError } from "../models/dto/error.dto";

const consistencyCheck = async (req: Request, res: Response) => {
  const file_id = <string>req.query.id;
  const { data, err } = await consistencyService.aggregateFile(file_id);

  if (err.code === code.SUCCESS) {
    for (const household of data.households) {
      //start loop household
      if (
        !["12", "13", "21", "22", "23", "24"].includes(household.fields.enum)
      ) {
        //start loop member
        for (const member of household.members) {
          const checkStep1 = validateStep1(member.fields.step1);
          const checkStep2 = validateStep2(
            member.fields.step2,
            parseInt(member.fields.step1.f6)
          );
          const checkStep3 = validateStep3(
            member.fields.step3,
            parseInt(member.fields.step1.f6)
          );
          const checkStep4 = validateStep4(member.fields.step4);
          const checkStep5 = validateStep5(member.fields.step5);
          const checkStep6 = validateStep6(member.fields.step6);
          const checkStep7 = validateStep7(member.fields.step7);
          const checkStep8 = validateStep8(member.fields.step8);
          const checkStep9 = validateStep9(member.fields.step9);
          const checkStep10 = validateStep10(member.fields.step10);
          const checkStep11 = validateStep11(member.fields.step11);

          let errors: Inconsist = {};
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

          if (Object.keys(errors).length > 0) {
            const errorsObj: MemberError = {
              member_id: member._id,
              iden: member.iden,
              file_id: file_id,
              total_errors,
              inconsist: errors,
            };
            //upsert error to mongo and update file, household, member status to error
            const { err } = await consistencyService.upsertErrorRow(errorsObj);
            if (err.code !== code.SUCCESS) {
              res.status(HttpStatusCode[<number>err.code]).send({ ...err });
            }
          } else {
            // if has previous error in db, delete it
            const { err } = await consistencyService.deleteErrorRow(member._id);
            if (err.code !== code.SUCCESS) {
              res.status(HttpStatusCode[<number>err.code]).send({ ...err });
            }
          }
        }
        //end loop member
      }
    }
    //end loop household
    const { err } = await consistencyService.findAndUpdateFile(file_id);

    res.status(HttpStatusCode[<number>err.code]).send({ ...err });
  } else {
    res.status(HttpStatusCode[<number>err.code]).send({ ...err });
  }
};

const fetchErrorHousehold = async (req: Request, res: Response) => {
  const file_id = <string>req.query.id;

  const { data, err } = await consistencyService.fetchHouseholdViaStatus(
    file_id
  );

  res.status(HttpStatusCode[<number>err.code]).send({ data, ...err });
};

export { consistencyCheck, fetchErrorHousehold };
