import { Request, Response } from "express";
const { dirname } = require("path");
const { uploadFileToMongo } = require("../services/disable.service");

const appDir = dirname(require.main?.filename);

exports.importDisable = (req: Request, res: Response) => {
  const data = req.file;

  if (!data) {
    return res.status(422).send({
      status: "error",
      errorMessage: "Attached file is not in csv format",
    });
  }

  uploadFileToMongo(appDir + "/uploads/" + data.filename);
};
