import {
  IStep1,
  IStep10,
  IStep11,
  IStep2,
  IStep3,
  IStep4,
  IStep5,
  IStep6,
  IStep7,
  IStep8,
  IStep9,
} from "../models/dto/member.dto";

const validateStep1 = (obj: IStep1) => {
  const err_code: string[] = [];

  if (obj["f1"] === "01" && obj["f4"] !== "01") {
    err_code.push("F4-1");
  }
  if (parseInt(obj["f1"]) >= 2 && obj["f4"] === "01") {
    err_code.push("F4-2");
  }
  if (["1", "4"].includes(obj["f2"]) && obj["f5"] !== "1") {
    err_code.push("F5-1");
  }
  if (["2", "3", "5"].includes(obj["f2"]) && obj["f5"] !== "2") {
    err_code.push("F5-2");
  }
  if (parseInt(obj["f6"]) >= 120) {
    err_code.push("F6-1");
  }
  if (["1", "2", "3"].includes(obj["f2"]) && parseInt(obj["f6"]) < 15) {
    err_code.push("F6-2");
  }
  if (["4", "5"].includes(obj["f2"]) && parseInt(obj["f6"]) > 14) {
    err_code.push("F6-3");
  }
  if (obj["f4"] === "01" && parseInt(obj["f6"]) < 12) {
    err_code.push("F6-4");
  }
  if (["02", "04", "05"].includes(obj["f4"]) && parseInt(obj["f6"]) < 13) {
    err_code.push("F6-5");
  }
  if (["07", "08"].includes(obj["f4"]) && parseInt(obj["f6"]) < 30) {
    err_code.push("F6-6");
  }
  if (obj["f4"] === "09" && parseInt(obj["f6"]) < 45) {
    err_code.push("F6-7");
  }
  if (parseInt(obj["f6"]) < 15 && obj["f9"] !== "") {
    err_code.push("F9-1");
  }
  if (parseInt(obj["f6"]) >= 15 && obj["f9"] === "") {
    err_code.push("F9-2");
  }
  if (parseInt(obj["f6"]) >= 15) {
    if (obj["f4"] === "02" && obj["f9"] !== "2") {
      err_code.push("F9-3");
    }
    if (obj["f4"] === "03" && obj["f9"] !== "1") {
      err_code.push("F9-4");
    }
    if (
      ["04", "05", "07", "08", "09"].includes(obj["f4"]) &&
      !["2", "3", "4", "5"].includes(obj["f9"])
    ) {
      err_code.push("F9-5");
    }
  }

  return err_code;
};

const validateStep2 = (obj: IStep2) => {
  const err_code: string[] = [];

  return err_code;
};

const validateStep3 = (obj: IStep3) => {
  const err_code: string[] = [];
  return err_code;
};

const validateStep4 = (obj: IStep4) => {
  const err_code: string[] = [];
  return err_code;
};

const validateStep5 = (obj: IStep5) => {
  const err_code: string[] = [];
  return err_code;
};

const validateStep6 = (obj: IStep6) => {
  const err_code: string[] = [];
  return err_code;
};

const validateStep7 = (obj: IStep7) => {
  const err_code: string[] = [];
  return err_code;
};

const validateStep8 = (obj: IStep8) => {
  const err_code: string[] = [];
  return err_code;
};

const validateStep9 = (obj: IStep9) => {
  const err_code: string[] = [];
  return err_code;
};

const validateStep10 = (obj: IStep10) => {
  const err_code: string[] = [];
  return err_code;
};

const validateStep11 = (obj: IStep11) => {
  const err_code: string[] = [];
  return err_code;
};

export {
  validateStep1,
  validateStep2,
  validateStep3,
  validateStep4,
  validateStep5,
  validateStep6,
  validateStep7,
  validateStep8,
  validateStep9,
  validateStep10,
  validateStep11,
};
