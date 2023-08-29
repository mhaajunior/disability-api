import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../resource/common.code";
import code from "../resource/common.code";
import { NewCommonError } from "../helpers/commom.helper";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("RESOURCE_NOT_FOUND");
  res.status(404);
  next(error);
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode =
    res.statusCode === 200
      ? HttpStatusCode[code[err.message as keyof typeof code]] || 500
      : res.statusCode;
  let error = NewCommonError(
    code[err.message as keyof typeof code] || code.ERR_INTERNAL
  );

  if (err.name === "CastError") {
    statusCode = 404;
    error = NewCommonError(code.RESOURCE_NOT_FOUND);
  }

  res.status(statusCode).json({
    ...error,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export { notFound, errorHandler };
