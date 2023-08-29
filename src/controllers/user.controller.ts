import { Response } from "express";
import asyncHandler from "express-async-handler";
import * as userService from "../services/user.service";
import code, { HttpStatusCode } from "../resource/common.code";
import { NewCommonError } from "../helpers/commom.helper";
import { IRequest } from "../models/dto/request.dto";

const authUser = asyncHandler(async (req: IRequest, res: Response) => {
  const { email, password } = req.body;

  const { data, err } = await userService.authUser(res, email, password);

  res.status(HttpStatusCode[<number>err.code]).send({ data, ...err });
});

const registerUser = asyncHandler(async (req: IRequest, res: Response) => {
  const { email, password } = req.body;

  const { data, err } = await userService.registerUser(res, email, password);

  res.status(HttpStatusCode[<number>err.code]).send({ data, ...err });
});

const logoutUser = asyncHandler(async (req: IRequest, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  const err = NewCommonError(code.SUCCESS);
  res.status(HttpStatusCode[<number>err.code]).send({ ...err });
});

const getUserProfile = asyncHandler(async (req: IRequest, res: Response) => {
  const user = {
    _id: req.user._id,
    email: req.user.email,
  };

  const err = NewCommonError(code.SUCCESS);
  res.status(HttpStatusCode[<number>err.code]).send({ user, ...err });
});

const changePassword = asyncHandler(async (req: IRequest, res: Response) => {
  const { email, password } = req.body;

  const { err } = await userService.changeUserPassword(email, password);

  res.status(HttpStatusCode[<number>err.code]).send({ ...err });
});

export { authUser, registerUser, logoutUser, getUserProfile, changePassword };
