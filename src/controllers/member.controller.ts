import { Request, Response } from "express";
import * as memberService from "../services/member.service";
import { HttpStatusCode } from "../resource/common.code";

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

export { fetchMembers, fetchMemberById };
