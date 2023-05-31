import { Request, Response } from "express";
import * as consistencyService from "../services/consistency.service";
import { HttpStatusCode } from "../resource/common.code";
import code from "../resource/common.code";

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
          const { err } = await consistencyService.consistencyCheck(member);
          if (err.code !== code.SUCCESS) {
            res.status(HttpStatusCode[<number>err.code]).send({ ...err });
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
