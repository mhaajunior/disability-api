import { Response } from "express";
import asyncHandler from "express-async-handler";
import * as consistencyService from "../services/consistency.service";
import { HttpStatusCode } from "../resource/common.code";
import { checkBetweenMembers } from "../helpers/consistency.helper";
import { IRequest } from "../models/dto/request.dto";

const consistencyCheck = asyncHandler(async (req: IRequest, res: Response) => {
  const file_id = <string>req.query.id;
  const { data } = await consistencyService.aggregateFile(file_id);

  for (const household of data.households) {
    //start loop household
    if (!["12", "13", "21", "22", "23", "24"].includes(household.fields.enum)) {
      //start loop member
      //check between members
      const errorBetMem = checkBetweenMembers(household.members);

      //validate 11 steps
      for (const member of household.members) {
        await consistencyService.consistencyCheck(
          member,
          household.fields.members,
          errorBetMem
        );
      }
      //end loop member
    }
  }
  //end loop household
  const { err } = await consistencyService.findAndUpdateFile(file_id);

  res.status(HttpStatusCode[<number>err.code]).send({ ...err });
});

const fetchErrorHousehold = asyncHandler(
  async (req: IRequest, res: Response) => {
    const file_id = <string>req.query.id;
    const page_no = <string>req.query.pageNo;
    const per_page = <string>req.query.perPage;

    const { data, err } = await consistencyService.fetchHouseholdViaStatus(
      file_id,
      parseInt(page_no),
      parseInt(per_page)
    );

    res.status(HttpStatusCode[<number>err.code]).send({ data, ...err });
  }
);

export { consistencyCheck, fetchErrorHousehold };
