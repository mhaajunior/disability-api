export const changeNegativeToEmpty = (data: string) => {
  return data !== "-1" ? data : "";
};

export const changeEmptyToNegative = (data: string) => {
  return data !== "" ? data : "-1";
};
