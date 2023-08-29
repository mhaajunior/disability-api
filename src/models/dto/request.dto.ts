import { Request } from "express";
import { ObjectId } from "mongoose";

export interface IRequest extends Request {
  user?: {
    _id: ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
