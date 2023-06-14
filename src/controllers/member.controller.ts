import { Request, Response } from "express";
import * as memberService from "../services/member.service";
import * as consistencyService from "../services/consistency.service";
import { HttpStatusCode } from "../resource/common.code";
import code from "../resource/common.code";
import { memberField } from "../resource/fieldGroup";

const fetchMembers = async (req: Request, res: Response) => {
  const file_id = <string>req.query.file_id;
  const iden = <string>req.query.iden;

  const { data, err } = await memberService.fetchMembersfromMongo(
    file_id,
    iden
  );

  res.status(HttpStatusCode[<number>err.code]).send({ data, ...err });
};

const fetchMemberById = async (req: Request, res: Response) => {
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
};

const editMember = async (req: Request, res: Response) => {
  const memberId = req.params.id;
  const memberForm = req.body;

  // delete old errors
  const { err } = await consistencyService.deleteErrorRow(memberId);
  if (err.code !== code.SUCCESS) {
    res.status(HttpStatusCode[<number>err.code]).send({ ...err });
  } else {
    // update new member values
    const { data, err } = await memberService.updateMemberToMongo(
      memberId,
      memberForm
    );
    if (err.code !== code.SUCCESS) {
      res.status(HttpStatusCode[<number>err.code]).send({ ...err });
    } else {
      // consistency check
      const { data: membersObj, err } =
        await memberService.fetchMembersfromMongo(
          data.member.file_id.toString(),
          data.member.iden
        );
      if (err.code !== code.SUCCESS) {
        res.status(HttpStatusCode[<number>err.code]).send({ ...err });
      } else {
        const errorBetMem = consistencyService.checkBetweenMembers(
          membersObj.members
        );

        const { err } = await consistencyService.consistencyCheck(
          data.member,
          data.household.fields.members,
          errorBetMem
        );
        if (err.code !== code.SUCCESS) {
          res.status(HttpStatusCode[<number>err.code]).send({ ...err });
        }
      }
    }
  }

  res.status(HttpStatusCode[<number>err.code]).send({ ...err });
};

export { fetchMembers, fetchMemberById, editMember };
