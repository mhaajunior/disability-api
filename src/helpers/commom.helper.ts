import commonCode, { Message } from "../resource/common.code";
import { CommonError } from "../models/dto/error.dto";

export const changeNegativeToEmpty = (data: string) => {
  return data !== "-1" ? data : "";
};

export const changeEmptyToNegative = (data: string) => {
  return data !== "" ? data : "-1";
};

export const isNull = (data: string) => {
  if (data && data !== " ") {
    return data;
  } else {
    return "";
  }
};

export const sum = (arr: number[]) => {
  let total = 0;
  for (let num of arr) {
    total += toNumber(num);
  }
  return total;
};

export const toNumber = (data: number) => {
  return data ? data : 0;
};

export const changeToDash = (data: number) => {
  return data && data !== 0 ? data : "-";
};

export const calcPercentage = (top: number, down: number) => {
  if (down === 0) {
    return 0;
  }
  return (top / down) * 100;
};

export const NewCommonError = (
  code: number = commonCode.SUCCESS,
  message: string = Message[code]
): CommonError => {
  return {
    code: code,
    message: message,
  };
};
