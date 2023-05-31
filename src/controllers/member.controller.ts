import { Request, Response } from "express";
import * as memberService from "../services/member.service";
import * as consistencyService from "../services/consistency.service";
import { HttpStatusCode } from "../resource/common.code";
import code from "../resource/common.code";

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
      const { err } = await consistencyService.consistencyCheck(data);
      if (err.code !== code.SUCCESS) {
        res.status(HttpStatusCode[<number>err.code]).send({ ...err });
      } else {
        // update edit_datetime
        const { err } = await memberService.updateEditDate(memberId);
        if (err.code !== code.SUCCESS) {
          res.status(HttpStatusCode[<number>err.code]).send({ ...err });
        }
      }
    }
  }

  res.status(HttpStatusCode[<number>err.code]).send({ ...err });
};

export { fetchMembers, fetchMemberById, editMember };
