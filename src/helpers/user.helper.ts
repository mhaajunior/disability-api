import { Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export const generateToken = (res: Response, _id: ObjectId) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  return token;
};
