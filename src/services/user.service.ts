import { Response } from "express";
import * as bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/schemas/user.schema";
import code from "../resource/common.code";
import { NewCommonError } from "../helpers/commom.helper";
import { generateToken } from "../helpers/user.helper";

const registerUser = async (res: Response, email: string, password: string) => {
  try {
    if (!email || !password) {
      throw Error("BLANK_EMAIL_OR_PW");
    }
    if (!validator.isEmail(email)) {
      throw Error("INVALID_EMAIL");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("NOT_STRONG_PW");
    }

    const exists = await User.findOne({ email });

    if (exists) {
      throw Error("EMAIL_ALREADY_IN_USE");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user: any = await User.create({ email, password: hash });

    if (!user) {
      throw Error("INVALID_USER_DATA");
    }

    //create a token
    const token = generateToken(res, user._id);

    return { data: token, err: NewCommonError(code.CREATED) };
  } catch (err: any) {
    throw Error(err.message);
  }
};

const authUser = async (res: Response, email: string, password: string) => {
  try {
    if (!email || !password) {
      throw Error("BLANK_EMAIL_OR_PW");
    }

    const user: any = await User.findOne({ email });
    if (!user) {
      throw Error("INVALID_EMAIL");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("INCORRECT_CREDENTIALS");
    }

    //create a token
    const token = generateToken(res, user._id);

    return { data: { email, token }, err: NewCommonError(code.SUCCESS) };
  } catch (err: any) {
    throw Error(err.message);
  }
};

const changeUserPassword = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      throw Error("BLANK_EMAIL_OR_PW");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("NOT_STRONG_PW");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw Error("INVALID_EMAIL");
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      throw Error("SAME_PASSWORD");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await User.updateOne({ email }, { password: hash });

    return { err: NewCommonError(code.SUCCESS) };
  } catch (err: any) {
    throw Error(err.message);
  }
};

export { registerUser, authUser, changeUserPassword };
