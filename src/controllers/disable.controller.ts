import { Response } from "express";
import { dirname } from "path";
import asyncHandler from "express-async-handler";
import * as disableService from "../services/disable.service";
import { HttpStatusCode } from "../resource/common.code";
import { IRequest } from "../models/dto/request.dto";

const appDir = dirname(require.main.filename);

const importDisable = asyncHandler(async (req: IRequest, res: Response) => {
  const file = req.file;
  const user_id = req.user._id;

  if (!file || file.mimetype !== "text/csv") {
    throw Error("IMPORT_FILE_NOT_VALID");
  }

  const { err } = await disableService.uploadDataToMongo(
    appDir + "/uploads/" + file.filename,
    file.originalname,
    user_id
  );

  res.status(HttpStatusCode[<number>err.code]).send({ user_id, ...err });
});

const fetchDisables = asyncHandler(async (req: IRequest, res: Response) => {
  const user_id = req.user._id;

  const { data, err } = await disableService.fetchFilesfromMongo(user_id);

  const obj: any = { files: data, user_id };

  res.status(HttpStatusCode[<number>err.code]).send({ data: obj, ...err });
});

const deleteDisable = asyncHandler(async (req: IRequest, res: Response) => {
  const file_id = req.params.id;
  const { err } = await disableService.deleteDatafromMongo(file_id);

  res.status(HttpStatusCode[<number>err.code]).send({ ...err });
});

export { importDisable, fetchDisables, deleteDisable };
