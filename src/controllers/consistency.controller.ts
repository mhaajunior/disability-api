import { Request, Response } from "express";
import * as consistencyService from "../services/consistency.service";
import { HttpStatusCode } from "../resource/common.code";
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

const consistencyCheck = async (req: Request, res: Response) => {
  const file_id = req.query.id;
  const { data, err } = await consistencyService.aggregateFile(
    file_id as string
  );

  if (err.code !== 200) {
    return res.status(HttpStatusCode[<number>err.code]).send({ ...err });
  }

  for (const household of data.households) {
    if (["12", "13", "21", "22", "23", "24"].includes(household.fields.enum)) {
    } else {
      for (const member of household.members) {
        const errorSteps = [];
        const checkStep1 = validateStep1(member.fields.step1);
        const checkStep2 = validateStep2(member.fields.step2);
        const checkStep3 = validateStep3(member.fields.step3);
        const checkStep4 = validateStep4(member.fields.step4);
        const checkStep5 = validateStep5(member.fields.step5);
        const checkStep6 = validateStep6(member.fields.step6);
        const checkStep7 = validateStep7(member.fields.step7);
        const checkStep8 = validateStep8(member.fields.step8);
        const checkStep9 = validateStep9(member.fields.step9);
        const checkStep10 = validateStep10(member.fields.step10);
        const checkStep11 = validateStep11(member.fields.step11);

        if (checkStep1.length !== 0) errorSteps.push("step1");
        if (checkStep2.length !== 0) errorSteps.push("step2");
        if (checkStep3.length !== 0) errorSteps.push("step3");
        if (checkStep4.length !== 0) errorSteps.push("step4");
        if (checkStep5.length !== 0) errorSteps.push("step5");
        if (checkStep6.length !== 0) errorSteps.push("step6");
        if (checkStep7.length !== 0) errorSteps.push("step7");
        if (checkStep8.length !== 0) errorSteps.push("step8");
        if (checkStep9.length !== 0) errorSteps.push("step9");
        if (checkStep10.length !== 0) errorSteps.push("step10");
        if (checkStep11.length !== 0) errorSteps.push("step11");

        const errorsObj = {
          id: member._id,
          iden: member.iden,
          errors: {
            step1: checkStep1,
            step2: checkStep2,
            step3: checkStep3,
            step4: checkStep4,
            step5: checkStep5,
            step6: checkStep6,
            step7: checkStep7,
            step8: checkStep8,
            step9: checkStep9,
            step10: checkStep10,
            step11: checkStep11,
          },
          error_steps: errorSteps,
        };
        //save to mongo
      }
    }
  }
  res.status(HttpStatusCode[<number>err.code]).send({ ...err });
};

export { consistencyCheck };
