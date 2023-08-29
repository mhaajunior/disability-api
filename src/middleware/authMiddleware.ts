import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import * as crypto from "crypto";
import asyncHandler from "express-async-handler";
import User from "../models/schemas/user.schema";
import { IRequest } from "../models/dto/request.dto";
import { NewCommonError } from "../helpers/commom.helper";
import code, { HttpStatusCode } from "../resource/common.code";

const protect = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded._id, "-password");

        next();
      } catch (error) {
        throw Error("INVALID_TOKEN");
      }
    } else {
      throw Error("NO_TOKEN");
    }
  }
);

const verifyApiKey = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const apiKey = <string>req.headers.apikey;

    if (apiKey) {
      const hash = crypto.createHash("md5").update(apiKey).digest("hex");
      if (hash === process.env.API_HASH) {
        next();
      } else {
        const error = NewCommonError(code.INVALID_API_KEY);
        res.status(HttpStatusCode[<number>error.code]).send({ ...error });
      }
    } else {
      const error = NewCommonError(code.NO_API_KEY);
      res.status(HttpStatusCode[<number>error.code]).send({ ...error });
    }
  }
);

export { protect, verifyApiKey };
