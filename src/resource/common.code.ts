const ERR_INTERNAL: number = 0;
const SUCCESS: number = 1;
const CREATED: number = 2;
const IMPORT_FILE_NOT_VALID = 1001;
const FILE_NOT_FOUND = 1002;
const EMAIL_ALREADY_IN_USE = 1003;
const BLANK_EMAIL_OR_PW = 1004;
const INVALID_EMAIL = 1005;
const NOT_STRONG_PW = 1006;
const INCORRECT_CREDENTIALS = 1007;
const INVALID_USER_DATA = 1008;
const SAME_PASSWORD = 1009;
const INVALID_TOKEN = 1100;
const NO_TOKEN = 1101;
const INVALID_API_KEY = 1102;
const NO_API_KEY = 1103;
const RESOURCE_NOT_FOUND = 1200;

export const Message = {
  [ERR_INTERNAL]: "Internal error",
  [SUCCESS]: "Success",
  [CREATED]: "Created",
  [IMPORT_FILE_NOT_VALID]: "Imported file is not in csv format",
  [FILE_NOT_FOUND]: "Selected file not found",
  [EMAIL_ALREADY_IN_USE]: "อีเมลนี้ได้ทำการลงทะเบียนไปแล้ว",
  [BLANK_EMAIL_OR_PW]: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
  [INVALID_EMAIL]: "อีเมลไม่ถูกต้องหรือยังไม่ได้ทำการลงทะเบียน",
  [NOT_STRONG_PW]: "พาสเวิร์ดของท่านไม่ตรงตามเงื่อนไขที่กำหนด",
  [INCORRECT_CREDENTIALS]: "ข้อมูลที่ท่านกรอกไม่ถูกต้อง",
  [INVALID_USER_DATA]: "ข้อมูลผู้ใช้งานไม่ถูกต้อง",
  [SAME_PASSWORD]: "ท่านได้กรอกรหัสผ่านเดิม",
  [INVALID_TOKEN]: "Not authorized, invalid token",
  [NO_TOKEN]: "Not authorized, no token",
  [INVALID_API_KEY]: "Invalid API key",
  [NO_API_KEY]: "No API key",
  [RESOURCE_NOT_FOUND]: "Resource not found",
};

export const HttpStatusCode = {
  [ERR_INTERNAL]: 500,
  [SUCCESS]: 200,
  [CREATED]: 201,
  [IMPORT_FILE_NOT_VALID]: 400,
  [FILE_NOT_FOUND]: 400,
  [EMAIL_ALREADY_IN_USE]: 400,
  [BLANK_EMAIL_OR_PW]: 400,
  [INVALID_EMAIL]: 400,
  [NOT_STRONG_PW]: 400,
  [INCORRECT_CREDENTIALS]: 400,
  [INVALID_USER_DATA]: 400,
  [SAME_PASSWORD]: 400,
  [INVALID_TOKEN]: 401,
  [NO_TOKEN]: 401,
  [INVALID_API_KEY]: 401,
  [NO_API_KEY]: 401,
  [RESOURCE_NOT_FOUND]: 404,
};

export default {
  ERR_INTERNAL,
  SUCCESS,
  CREATED,
  IMPORT_FILE_NOT_VALID,
  FILE_NOT_FOUND,
  EMAIL_ALREADY_IN_USE,
  BLANK_EMAIL_OR_PW,
  INVALID_EMAIL,
  NOT_STRONG_PW,
  INCORRECT_CREDENTIALS,
  INVALID_USER_DATA,
  SAME_PASSWORD,
  INVALID_TOKEN,
  NO_TOKEN,
  INVALID_API_KEY,
  NO_API_KEY,
  RESOURCE_NOT_FOUND,
};
