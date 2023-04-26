const ERR_INTERNAL: number = 0;
const SUCCESS: number = 1;
const IMPORT_FILE_NOT_VALID = 1001;
const FILE_NOT_FOUND = 1002;

export const Message = {
  [ERR_INTERNAL]: "internal error",
  [SUCCESS]: "success",
  [IMPORT_FILE_NOT_VALID]: "imported file is not in csv format",
  [FILE_NOT_FOUND]: "selected file not found",
};

export const HttpStatusCode = {
  [ERR_INTERNAL]: 500,
  [SUCCESS]: 200,
  [IMPORT_FILE_NOT_VALID]: 400,
  [FILE_NOT_FOUND]: 400,
};

export default {
  ERR_INTERNAL,
  SUCCESS,
  IMPORT_FILE_NOT_VALID,
  FILE_NOT_FOUND,
};
