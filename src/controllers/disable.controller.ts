import { Request, Response } from "express";
import { dirname } from "path";
import * as disableService from "../services/disable.service";
import { HttpStatusCode } from "../resource/common.code";
import code from "../resource/common.code";
import { NewCommonError } from "../models/dto/error.dto";

const appDir = dirname(require.main.filename);

const importDisable = (req: Request, res: Response) => {
  const file = req.file;

  if (!file) {
    const err = NewCommonError(code.IMPORT_FILE_NOT_VALID);
    return res.status(HttpStatusCode[<number>err.code]).send({ ...err });
  }

  const { err } = disableService.uploadDataToMongo(
    appDir + "/uploads/" + file.filename,
    file.originalname
  );

  res.status(HttpStatusCode[<number>err.code]).send({ ...err });
};

const fetchDisables = async (req: Request, res: Response) => {
  const { data, err } = await disableService.fetchFilesfromMongo();

  res.status(HttpStatusCode[<number>err.code]).send({ data, ...err });
};

const deleteDisable = async (req: Request, res: Response) => {
  const file_id = req.params.id;
  const { err } = await disableService.deleteDatafromMongo(file_id);

  res.status(HttpStatusCode[<number>err.code]).send({ ...err });
};

export { importDisable, fetchDisables, deleteDisable };
