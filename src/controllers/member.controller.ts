import { Response } from "express";
import asyncHandler from "express-async-handler";
import * as memberService from "../services/member.service";
import * as consistencyService from "../services/consistency.service";
import { HttpStatusCode } from "../resource/common.code";
import { memberField } from "../resource/fieldGroup";
import { checkBetweenMembers } from "../helpers/consistency.helper";
import { IRequest } from "../models/dto/request.dto";

const fetchMembers = asyncHandler(async (req: IRequest, res: Response) => {
  const file_id = <string>req.query.file_id;
  const iden = <string>req.query.iden;

  const { data, err } = await memberService.fetchMembersfromMongo(
    file_id,
    iden
  );

  res.status(HttpStatusCode[<number>err.code]).send({ data, ...err });
});

const fetchMemberById = asyncHandler(async (req: IRequest, res: Response) => {
  const member_id = req.params.id;

  const { data, err } = await memberService.fetchMemberByIdfromMongo(member_id);
  const { inconsist } = data;
  if (inconsist) {
    for (const [key, value] of Object.entries(inconsist)) {
      if (inconsist[key].codes.length > 0) {
        for (const field of inconsist[key].fields) {
          if (!memberField[key as keyof typeof memberField].includes(field)) {
            for (const key2 in memberField) {
              if (
                memberField[key2 as keyof typeof memberField].includes(field)
              ) {
                data.inconsist[key2 as keyof typeof memberField].fields.push(
                  field
                );
              }
            }
          }
        }
      }
    }
  }

  res.status(HttpStatusCode[<number>err.code]).send({ data, ...err });
});

const editMember = asyncHandler(async (req: IRequest, res: Response) => {
  const memberId = req.params.id;
  const memberForm = req.body;

  // delete old errors
  await consistencyService.deleteErrorRow(memberId);

  // update new member values
  const { data } = await memberService.updateMemberToMongo(
    memberId,
    memberForm
  );

  // consistency check
  const { data: membersObj } = await memberService.fetchMembersfromMongo(
    data.member.file_id.toString(),
    data.member.iden
  );

  const errorBetMem = checkBetweenMembers(membersObj.members);

  const { err } = await consistencyService.consistencyCheck(
    data.member,
    data.household.fields.members,
    errorBetMem
  );

  res.status(HttpStatusCode[<number>err.code]).send({ ...err });
});

export { fetchMembers, fetchMemberById, editMember };
