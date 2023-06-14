import commonCode, { Message } from "../../resource/common.code";

export interface CommonError {
  code?: number;
  message?: string;
}

export interface IInconsist {
  step1?: { codes: string[]; fields: string[] };
  step2?: { codes: string[]; fields: string[] };
  step3?: { codes: string[]; fields: string[] };
  step4?: { codes: string[]; fields: string[] };
  step5?: { codes: string[]; fields: string[] };
  step6?: { codes: string[]; fields: string[] };
  step7?: { codes: string[]; fields: string[] };
  step8?: { codes: string[]; fields: string[] };
  step9?: { codes: string[]; fields: string[] };
  step10?: { codes: string[]; fields: string[] };
  step11?: { codes: string[]; fields: string[] };
}

export interface IMemberError {
  member_id: string;
  iden: string;
  file_id: string;
  total_errors: Number;
  inconsist: IInconsist;
}

export const NewCommonError = (
  code: number = commonCode.SUCCESS,
  message: string = Message[code]
): CommonError => {
  return {
    code: code,
    message: message,
  };
};
