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
import { consistErrCode } from "../resource/consistency.error";

const validateStep1 = (o: IStep1) => {
  const err_code: string[] = [];
  const err_field: string[] = [];

  if (o["f1"] === "01" && o["f4"] !== "01") {
    err_code.push("F4-1");
  }
  if (parseInt(o["f1"]) >= 2 && o["f4"] === "01") {
    err_code.push("F4-2");
  }
  if (["1", "4"].includes(o["f2"]) && o["f5"] !== "1") {
    err_code.push("F5-1");
  }
  if (["2", "3", "5"].includes(o["f2"]) && o["f5"] !== "2") {
    err_code.push("F5-2");
  }
  if (parseInt(o["f6"]) >= 120) {
    err_code.push("F6-1");
  }
  if (["1", "2", "3"].includes(o["f2"]) && parseInt(o["f6"]) < 15) {
    err_code.push("F6-2");
  }
  if (["4", "5"].includes(o["f2"]) && parseInt(o["f6"]) > 14) {
    err_code.push("F6-3");
  }
  if (o["f4"] === "01" && parseInt(o["f6"]) < 12) {
    err_code.push("F6-4");
  }
  if (["02", "04", "05"].includes(o["f4"]) && parseInt(o["f6"]) < 13) {
    err_code.push("F6-5");
  }
  if (["07", "08"].includes(o["f4"]) && parseInt(o["f6"]) < 30) {
    err_code.push("F6-6");
  }
  if (o["f4"] === "09" && parseInt(o["f6"]) < 45) {
    err_code.push("F6-7");
  }
  if (parseInt(o["f6"]) < 15 && o["f9"] !== "") {
    err_code.push("F9-1");
  }
  if (parseInt(o["f6"]) >= 15 && o["f9"] === "") {
    err_code.push("F9-2");
  }
  if (parseInt(o["f6"]) >= 15) {
    if (o["f4"] === "02" && o["f9"] !== "2") {
      err_code.push("F9-3");
    }
    if (o["f4"] === "03" && o["f9"] !== "1") {
      err_code.push("F9-4");
    }
    if (
      ["04", "05", "07", "08", "09"].includes(o["f4"]) &&
      !["2", "3", "4", "5"].includes(o["f9"])
    ) {
      err_code.push("F9-5");
    }
  }

  if (err_code.length === 0) {
    return;
  }
  err_code.forEach((value: string) => {
    err_field.push(...consistErrCode[value as keyof typeof consistErrCode]);
  });

  return { codes: err_code, fields: [...new Set(err_field)] };
};

const validateStep2 = (o: IStep2, f6: number) => {
  const err_code: string[] = [];
  const err_field: string[] = [];

  if (f6 >= 5 && f6 <= 30 && o["f10"] === "") {
    err_code.push("PART2-1");
  }
  if (
    (f6 < 5 || f6 > 30) &&
    (o["f10"] !== "" || o["f11"] !== "" || o["f12"] !== "" || o["f13"] !== "")
  ) {
    err_code.push("PART2-2");
  }
  if (f6 >= 5 && o["f14"] === "") {
    err_code.push("PART2-3");
  }
  if (f6 < 5 && o["f14"] !== "") {
    err_code.push("PART2-4");
  }
  if (o["f10"] === "001" && o["f11"] !== "" && o["f12"] === "") {
    err_code.push("F10-1");
  }
  if (
    ((parseInt(o["f10"]) >= 111 && parseInt(o["f10"]) <= 929) ||
      o["f10"] === "980") &&
    (o["f11"] === "" || o["f12"] !== "" || o["f13"] !== "")
  ) {
    err_code.push("F10-2");
  }
  if (
    (o["f10"] === "999" || o["f10"] === "") &&
    (o["f11"] !== "" || o["f12"] !== "" || o["f13"] !== "")
  ) {
    err_code.push("F10-3");
  }
  if (
    [
      "311",
      "312",
      "313",
      "319",
      "321",
      "322",
      "323",
      "329",
      "331",
      "332",
      "333",
      "339",
      "351",
      "352",
      "353",
      "359",
    ].includes(o["f10"]) &&
    f6 < 11
  ) {
    err_code.push("F10-4");
  }
  if (
    [
      "411",
      "412",
      "413",
      "419",
      "421",
      "422",
      "423",
      "429",
      "431",
      "432",
      "433",
      "439",
      "451",
      "452",
      "453",
      "459",
    ].includes(o["f10"]) &&
    f6 < 15
  ) {
    err_code.push("F10-5");
  }
  if (
    ["461", "462", "511", "512", "519", "521", "522", "523", "529"].includes(
      o["f10"]
    ) &&
    f6 < 17
  ) {
    err_code.push("F10-6");
  }
  if (
    [
      "611",
      "612",
      "613",
      "614",
      "615",
      "616",
      "619",
      "631",
      "632",
      "633",
      "634",
      "639",
      "651",
      "652",
      "653",
      "654",
      "659",
      "661",
    ].includes(o["f10"]) &&
    f6 < 18
  ) {
    err_code.push("F10-7");
  }
  if (
    [
      "711",
      "712",
      "719",
      "731",
      "732",
      "739",
      "751",
      "752",
      "759",
      "761",
      "811",
      "812",
      "813",
      "819",
      "831",
      "832",
      "833",
      "839",
      "851",
      "852",
      "853",
      "859",
      "861",
      "871",
      "872",
      "873",
      "874",
      "875",
      "879",
    ].includes(o["f14"]) &&
    f6 < 21
  ) {
    err_code.push("F10-8");
  }
  if (parseInt(o["f12"]) >= 4 && parseInt(o["f12"]) <= 15 && o["f13"] === "") {
    err_code.push("F10-9");
  }
  if (["01", "02", "03", "99", ""].includes(o["f12"]) && o["f13"] !== "") {
    err_code.push("F10-10");
  }
  if (o["f10"] === "211" && o["f14"] !== "110") {
    err_code.push("F14-1");
  }
  if (o["f10"] === "212" && o["f14"] !== "211") {
    err_code.push("F14-2");
  }
  if (o["f10"] === "213" && o["f14"] !== "212") {
    err_code.push("F14-3");
  }
  if (o["f10"] === "214" && o["f14"] !== "213") {
    err_code.push("F14-4");
  }
  if (o["f10"] === "215" && o["f14"] !== "214") {
    err_code.push("F14-5");
  }
  if (
    o["f10"] === "216" &&
    ["1", "2", "3", "4", "5", "7", "9"].includes(o["f11"]) &&
    o["f14"] !== "215"
  ) {
    err_code.push("F14-6");
  }
  if (o["f10"] === "219" && o["f14"] !== "219") {
    err_code.push("F14-7");
  }
  if (o["f10"] === "242" && o["f14"] !== "241") {
    err_code.push("F14-8");
  }
  if (o["f10"] === "243" && o["f14"] !== "242") {
    err_code.push("F14-9");
  }
  if (o["f10"] === "249" && o["f14"] !== "249") {
    err_code.push("F14-10");
  }
  if (o["f10"] === "251" && o["f14"] !== "110") {
    err_code.push("F14-11");
  }
  if (o["f10"] === "252" && o["f14"] !== "251") {
    err_code.push("F14-12");
  }
  if (o["f10"] === "253" && o["f14"] !== "252") {
    err_code.push("F14-13");
  }
  if (o["f10"] === "254" && o["f14"] !== "253") {
    err_code.push("F14-14");
  }
  if (o["f10"] === "255" && o["f14"] !== "254") {
    err_code.push("F14-15");
  }
  if (o["f10"] === "256" && o["f14"] !== "255") {
    err_code.push("F14-16");
  }
  if (o["f10"] === "259" && o["f14"] !== "259") {
    err_code.push("F14-17");
  }
  if (o["f10"] === "311" && o["f14"] !== "210" && o["f14"] !== "250") {
    err_code.push("F14-18");
  }
  if (o["f10"] === "312" && o["f14"] !== "311") {
    err_code.push("F14-19");
  }
  if (
    o["f10"] === "313" &&
    ["1", "2", "3", "4", "5", "7", "9"].includes(o["f11"]) &&
    o["f14"] !== "312"
  ) {
    err_code.push("F14-20");
  }
  if (o["f10"] === "313" && o["f11"] === "6" && o["f14"] !== "210") {
    err_code.push("F14-21");
  }
  if (o["f10"] === "319" && o["f14"] !== "319") {
    err_code.push("F14-22");
  }
  if (o["f10"] === "321" && o["f14"] !== "210" && o["f14"] !== "250") {
    err_code.push("F14-23");
  }
  if (o["f10"] === "322" && o["f14"] !== "321") {
    err_code.push("F14-24");
  }
  if (o["f10"] === "323" && o["f14"] !== "322") {
    err_code.push("F14-25");
  }
  if (o["f10"] === "329" && o["f14"] !== "329") {
    err_code.push("F14-26");
  }
  if (o["f10"] === "331" && o["f14"] !== "210") {
    err_code.push("F14-27");
  }
  if (o["f10"] === "332" && o["f14"] !== "331") {
    err_code.push("F14-28");
  }
  if (o["f10"] === "333" && o["f14"] !== "332") {
    err_code.push("F14-29");
  }
  if (o["f10"] === "339" && o["f14"] !== "339") {
    err_code.push("F14-30");
  }
  if (o["f10"] === "341" && o["f14"] !== "240") {
    err_code.push("F14-31");
  }
  if (o["f10"] === "342" && o["f14"] !== "341") {
    err_code.push("F14-32");
  }
  if (o["f10"] === "349" && o["f14"] !== "349") {
    err_code.push("F14-33");
  }
  if (o["f10"] === "351" && o["f14"] !== "210" && o["f14"] !== "250") {
    err_code.push("F14-34");
  }
  if (o["f10"] === "352" && o["f14"] !== "351") {
    err_code.push("F14-35");
  }
  if (o["f10"] === "353" && o["f14"] !== "352") {
    err_code.push("F14-36");
  }
  if (o["f10"] === "359" && o["f14"] !== "359") {
    err_code.push("F14-37");
  }
  if (
    o["f10"] === "411" &&
    o["f14"] !== "310" &&
    o["f14"] !== "330" &&
    o["f14"] !== "350"
  ) {
    err_code.push("F14-38");
  }
  if (o["f10"] === "412" && o["f14"] !== "411") {
    err_code.push("F14-39");
  }
  if (
    o["f10"] === "413" &&
    ["1", "2", "3", "4", "5", "7", "9"].includes(o["f11"]) &&
    o["f14"] !== "412"
  ) {
    err_code.push("F14-40");
  }
  if (o["f10"] === "413" && o["f11"] === "6" && o["f14"] !== "310") {
    err_code.push("F14-41");
  }
  if (o["f10"] === "419" && o["f14"] !== "419") {
    err_code.push("F14-42");
  }
  if (
    o["f10"] === "421" &&
    o["f14"] !== "310" &&
    o["f14"] !== "330" &&
    o["f14"] !== "350"
  ) {
    err_code.push("F14-43");
  }
  if (o["f10"] === "422" && o["f14"] !== "421") {
    err_code.push("F14-44");
  }
  if (o["f10"] === "423" && o["f14"] !== "422") {
    err_code.push("F14-45");
  }
  if (o["f10"] === "429" && o["f14"] !== "429") {
    err_code.push("F14-46");
  }
  if (o["f10"] === "431" && o["f14"] !== "310" && o["f14"] !== "330") {
    err_code.push("F14-47");
  }
  if (o["f10"] === "432" && o["f14"] !== "431") {
    err_code.push("F14-48");
  }
  if (o["f10"] === "433" && o["f14"] !== "432") {
    err_code.push("F14-49");
  }
  if (o["f10"] === "439" && o["f14"] !== "439") {
    err_code.push("F14-50");
  }
  if (o["f10"] === "441" && o["f14"] !== "340") {
    err_code.push("F14-51");
  }
  if (o["f10"] === "442" && o["f14"] !== "441") {
    err_code.push("F14-52");
  }
  if (o["f10"] === "443" && o["f14"] !== "442") {
    err_code.push("F14-53");
  }
  if (o["f10"] === "449" && o["f14"] !== "449") {
    err_code.push("F14-54");
  }
  if (o["f10"] === "451" && o["f14"] !== "310" && o["f14"] !== "350") {
    err_code.push("F14-55");
  }
  if (o["f10"] === "452" && o["f14"] !== "451") {
    err_code.push("F14-56");
  }
  if (o["f10"] === "453" && o["f14"] !== "452") {
    err_code.push("F14-57");
  }
  if (o["f10"] === "459" && o["f14"] !== "459") {
    err_code.push("F14-58");
  }
  if (
    o["f10"] === "461" &&
    o["f14"] !== "410" &&
    o["f14"] !== "420" &&
    o["f14"] !== "430" &&
    o["f14"] !== "450"
  ) {
    err_code.push("F14-59");
  }
  if (o["f10"] === "462" && o["f14"] !== "461") {
    err_code.push("F14-60");
  }
  if (
    o["f10"] === "511" &&
    o["f14"] !== "410" &&
    o["f14"] !== "420" &&
    o["f14"] !== "430" &&
    o["f14"] !== "450"
  ) {
    err_code.push("F14-61");
  }
  if (o["f10"] === "512" && o["f14"] !== "511") {
    err_code.push("F14-62");
  }
  if (o["f10"] === "519" && o["f14"] !== "519") {
    err_code.push("F14-63");
  }
  if (
    o["f10"] === "521" &&
    o["f14"] !== "410" &&
    o["f14"] !== "420" &&
    o["f14"] !== "430" &&
    o["f14"] !== "450"
  ) {
    err_code.push("F14-64");
  }
  if (o["f10"] === "522" && o["f14"] !== "521") {
    err_code.push("F14-65");
  }
  if (o["f10"] === "523" && o["f14"] !== "522") {
    err_code.push("F14-66");
  }
  if (o["f10"] === "529" && o["f14"] !== "529") {
    err_code.push("F14-67");
  }
  if (
    o["f10"] === "611" &&
    o["f14"] !== "410" &&
    o["f14"] !== "420" &&
    o["f14"] !== "430" &&
    o["f14"] !== "450"
  ) {
    err_code.push("F14-68");
  }
  if (o["f10"] === "612" && o["f14"] !== "611") {
    err_code.push("F14-69");
  }
  if (
    o["f10"] === "613" &&
    o["f14"] !== "612" &&
    o["f14"] !== "510" &&
    o["f14"] !== "520"
  ) {
    err_code.push("F14-70");
  }
  if (o["f10"] === "614" && o["f14"] !== "613") {
    err_code.push("F14-71");
  }
  if (o["f10"] === "615" && o["f14"] !== "614") {
    err_code.push("F14-72");
  }
  if (o["f10"] === "616" && o["f14"] !== "615") {
    err_code.push("F14-73");
  }
  if (o["f10"] === "619" && o["f14"] !== "619") {
    err_code.push("F14-74");
  }
  if (
    o["f10"] === "631" &&
    o["f14"] !== "410" &&
    o["f14"] !== "420" &&
    o["f14"] !== "430"
  ) {
    err_code.push("F14-75");
  }
  if (o["f10"] === "632" && o["f14"] !== "631") {
    err_code.push("F14-76");
  }
  if (o["f10"] === "633" && o["f14"] !== "632") {
    err_code.push("F14-77");
  }
  if (o["f10"] === "634" && o["f14"] !== "633") {
    err_code.push("F14-78");
  }
  if (o["f10"] === "639" && o["f14"] !== "639") {
    err_code.push("F14-79");
  }
  if (o["f10"] === "641" && o["f14"] !== "440") {
    err_code.push("F14-80");
  }
  if (o["f10"] === "642" && o["f14"] !== "641") {
    err_code.push("F14-81");
  }
  if (o["f10"] === "643" && o["f14"] !== "642") {
    err_code.push("F14-82");
  }
  if (o["f10"] === "649" && o["f14"] !== "649") {
    err_code.push("F14-83");
  }
  if (
    o["f10"] === "651" &&
    o["f14"] !== "410" &&
    o["f14"] !== "420" &&
    o["f14"] !== "430"
  ) {
    err_code.push("F14-84");
  }
  if (o["f10"] === "652" && o["f14"] !== "651") {
    err_code.push("F14-85");
  }
  if (o["f10"] === "653" && o["f14"] !== "652") {
    err_code.push("F14-86");
  }
  if (o["f10"] === "654" && o["f14"] !== "653") {
    err_code.push("F14-87");
  }
  if (o["f10"] === "659" && o["f14"] !== "659") {
    err_code.push("F14-88");
  }
  if (
    o["f10"] === "661" &&
    o["f14"] !== "610" &&
    o["f14"] !== "630" &&
    o["f14"] !== "650"
  ) {
    err_code.push("F14-89");
  }
  if (
    o["f10"] === "711" &&
    o["f14"] !== "610" &&
    o["f14"] !== "630" &&
    o["f14"] !== "650" &&
    o["f14"] !== "660"
  ) {
    err_code.push("F14-90");
  }
  if (o["f10"] === "712" && o["f14"] !== "711") {
    err_code.push("F14-91");
  }
  if (o["f10"] === "719" && o["f14"] !== "719") {
    err_code.push("F14-92");
  }
  if (
    o["f10"] === "731" &&
    o["f14"] !== "610" &&
    o["f14"] !== "630" &&
    o["f14"] !== "660"
  ) {
    err_code.push("F14-93");
  }
  if (o["f10"] === "732" && o["f14"] !== "731") {
    err_code.push("F14-94");
  }
  if (o["f10"] === "739" && o["f14"] !== "739") {
    err_code.push("F14-95");
  }
  if (
    o["f10"] === "751" &&
    o["f14"] !== "610" &&
    o["f14"] !== "650" &&
    o["f14"] !== "660"
  ) {
    err_code.push("F14-96");
  }
  if (o["f10"] === "752" && o["f14"] !== "751") {
    err_code.push("F14-97");
  }
  if (o["f10"] === "759" && o["f14"] !== "759") {
    err_code.push("F14-98");
  }
  if (
    o["f10"] === "761" &&
    o["f14"] !== "710" &&
    o["f14"] !== "730" &&
    o["f14"] !== "750"
  ) {
    err_code.push("F14-99");
  }
  if (
    o["f10"] === "811" &&
    o["f14"] !== "710" &&
    o["f14"] !== "730" &&
    o["f14"] !== "750" &&
    o["f14"] !== "760"
  ) {
    err_code.push("F14-100");
  }
  if (o["f10"] === "812" && o["f14"] !== "811") {
    err_code.push("F14-101");
  }
  if (o["f10"] === "813" && o["f14"] !== "812") {
    err_code.push("F14-102");
  }
  if (o["f10"] === "819" && o["f14"] !== "819") {
    err_code.push("F14-103");
  }
  if (o["f10"] === "831" && o["f14"] !== "710" && o["f14"] !== "730") {
    err_code.push("F14-104");
  }
  if (o["f10"] === "832" && o["f14"] !== "831") {
    err_code.push("F14-105");
  }
  if (o["f10"] === "833" && o["f14"] !== "832") {
    err_code.push("F14-106");
  }
  if (o["f10"] === "839" && o["f14"] !== "839") {
    err_code.push("F14-107");
  }
  if (o["f10"] === "851" && o["f14"] !== "710" && o["f14"] !== "750") {
    err_code.push("F14-108");
  }
  if (o["f10"] === "852" && o["f14"] !== "851") {
    err_code.push("F14-109");
  }
  if (o["f10"] === "853" && o["f14"] !== "852") {
    err_code.push("F14-110");
  }
  if (o["f10"] === "859" && o["f14"] !== "859") {
    err_code.push("F14-111");
  }
  if (
    o["f10"] === "861" &&
    o["f14"] !== "810" &&
    o["f14"] !== "830" &&
    o["f14"] !== "850"
  ) {
    err_code.push("F14-112");
  }
  if (o["f10"] === "871" && o["f14"] !== "610") {
    err_code.push("F14-113");
  }
  if (o["f10"] === "872" && o["f14"] !== "871") {
    err_code.push("F14-114");
  }
  if (o["f10"] === "873" && o["f14"] !== "872") {
    err_code.push("F14-115");
  }
  if (o["f10"] === "874" && o["f14"] !== "873") {
    err_code.push("F14-116");
  }
  if (o["f10"] === "875" && o["f14"] !== "874") {
    err_code.push("F14-117");
  }
  if (o["f10"] === "879" && o["f14"] !== "879") {
    err_code.push("F14-118");
  }
  if (o["f12"] === "01" && f6 !== 5 && f6 !== 6 && o["f14"] !== "000") {
    err_code.push("F14-119");
  }
  if (
    o["f12"] === "02" &&
    ![
      "110",
      "210",
      "240",
      "250",
      "310",
      "320",
      "330",
      "340",
      "350",
      "410",
      "420",
      "430",
      "440",
      "450",
      "460",
      "510",
      "520",
      "610",
      "630",
      "640",
      "650",
      "660",
      "710",
      "730",
      "750",
      "760",
      "810",
      "830",
      "850",
      "860",
      "870",
      "911",
      "912",
      "919",
      "921",
      "929",
      "980",
    ].includes(o["f14"])
  ) {
    err_code.push("F14-120");
  }
  if (["210", "250"].includes(o["f14"]) && f6 < 11) {
    err_code.push("F14-121");
  }
  if (["310", "320", "330", "340", "350"].includes(o["f14"]) && f6 < 14) {
    err_code.push("F14-122");
  }
  if (["410", "420", "430", "450", "460"].includes(o["f14"]) && f6 < 17) {
    err_code.push("F14-123");
  }
  if (["510", "520"].includes(o["f14"]) && f6 < 19) {
    err_code.push("F14-124");
  }
  if (["610", "630", "650", "660"].includes(o["f14"]) && f6 < 21) {
    err_code.push("F14-125");
  }
  if (
    ["710", "730", "750", "760", "810", "830", "850", "860", "870"].includes(
      o["f14"]
    ) &&
    f6 < 22
  ) {
    err_code.push("F14-126");
  }

  if (err_code.length === 0) {
    return;
  }
  err_code.forEach((value: string) => {
    err_field.push(...consistErrCode[value as keyof typeof consistErrCode]);
  });

  return { codes: err_code, fields: [...new Set(err_field)] };
};

const validateStep3 = (o: IStep3, f6: number) => {
  const err_code: string[] = [];
  const err_field: string[] = [];

  if (f6 >= 15 && o["f15"] === "") {
    err_code.push("PART3-1");
  }
  if (
    f6 >= 0 &&
    f6 <= 14 &&
    (o["f15"] !== "" ||
      o["f16"] !== "" ||
      o["f17"] !== "" ||
      o["f18"] !== "" ||
      o["f19"] !== "")
  ) {
    err_code.push("PART3-2");
  }
  if (
    parseInt(o["f15"]) >= 110 &&
    (parseInt(o["f15"]) <= 9629 || o["f15"] === "9970")
  ) {
    if (o["f16"] === "" && o["f17"] === "") {
      err_code.push("F15-1");
    }
    if (o["f19"] !== "") {
      err_code.push("F15-2");
    }
  }
  if (o["f15"] === "9980") {
    if (o["f16"] !== "" && o["f17"] !== "" && o["f18"] !== "") {
      err_code.push("F15-3");
    }
    if (
      parseInt(o["f19"]) < 1 ||
      (parseInt(o["f19"]) > 18 && o["f19"] !== "99")
    ) {
      err_code.push("F15-4");
    }
  }
  if (
    (o["f15"] === "9999" || o["f15"] === "") &&
    (o["f16"] !== "" || o["f17"] !== "" || o["f18"] !== "" || o["f19"] !== "")
  ) {
    err_code.push("F15-5");
  }
  if (["1", "2", "4", "7"].includes(o["f17"]) && o["f18"] === "") {
    err_code.push("F17-1");
  }
  if (["3", "9", ""].includes(o["f17"]) && o["f18"] !== "") {
    err_code.push("F17-2");
  }
  if (o["f19"] === "04" && (f6 < 15 || f6 > 22) && (f6 < 50 || f6 > 150)) {
    err_code.push("F19-1");
  }
  if (o["f19"] === "07" && f6 < 50) {
    err_code.push("F19-2");
  }

  if (err_code.length === 0) {
    return;
  }
  err_code.forEach((value: string) => {
    err_field.push(...consistErrCode[value as keyof typeof consistErrCode]);
  });

  return { codes: err_code, fields: [...new Set(err_field)] };
};

const validateStep4 = (o: IStep4, f6: number) => {
  const err_code: string[] = [];
  const err_field: string[] = [];

  if (
    f6 >= 2 &&
    f6 <= 4 &&
    (o["f20"] === "" ||
      o["f23"] === "" ||
      o["f26"] === "" ||
      o["f30"] === "" ||
      o["f31"] === "" ||
      o["f32"] === "" ||
      o["f33"] === "" ||
      o["f34"] === "" ||
      o["f35"] === "" ||
      o["f36"] === "")
  ) {
    err_code.push("PART4-1");
  }
  if (
    (f6 < 2 || f6 > 4) &&
    (o["f20"] !== "" ||
      o["f21"] !== "" ||
      o["f22"] !== "" ||
      o["f23"] !== "" ||
      o["f24"] !== "" ||
      o["f25"] !== "" ||
      o["f26"] !== "" ||
      o["f27"] !== "" ||
      o["f28"] !== "" ||
      o["f29"] !== "" ||
      o["f30"] !== "" ||
      o["f31"] !== "" ||
      o["f32"] !== "" ||
      o["f33"] !== "" ||
      o["f34"] !== "" ||
      o["f35"] !== "" ||
      o["f36"] !== "")
  ) {
    err_code.push("PART4-2");
  }
  if (o["f20"] === "1" && (o["f21"] === "" || o["f22"] !== "")) {
    err_code.push("F20-1");
  }
  if (o["f20"] === "2" && (o["f21"] !== "" || o["f22"] === "")) {
    err_code.push("F20-2");
  }
  if (o["f20"] === "" && (o["f21"] !== "" || o["f22"] !== "")) {
    err_code.push("F20-3");
  }
  if (o["f23"] === "1" && (o["f24"] === "" || o["f25"] !== "")) {
    err_code.push("F23-1");
  }
  if (o["f23"] === "2" && (o["f24"] !== "" || o["f25"] === "")) {
    err_code.push("F23-2");
  }
  if (o["f23"] === "" && (o["f24"] !== "" || o["f25"] !== "")) {
    err_code.push("F23-3");
  }
  if (
    o["f26"] === "1" &&
    (o["f27"] === "" || o["f28"] === "" || o["f29"] !== "")
  ) {
    err_code.push("F26-1");
  }
  if (
    o["f26"] === "2" &&
    (o["f27"] !== "" || o["f28"] !== "" || o["f29"] === "")
  ) {
    err_code.push("F26-2");
  }
  if (
    o["f26"] === "" &&
    (o["f27"] !== "" || o["f28"] !== "" || o["f29"] !== "")
  ) {
    err_code.push("F26-3");
  }
  if (o["f28"] === "3" && o["f27"] !== "3" && o["f27"] !== "4") {
    err_code.push("F28-1");
  }
  if (o["f28"] === "4" && o["f27"] !== "4") {
    err_code.push("F28-2");
  }
  if (o["f34"] === "4" && o["f35"] !== "8") {
    err_code.push("F35-1");
  }

  if (err_code.length === 0) {
    return;
  }
  err_code.forEach((value: string) => {
    err_field.push(...consistErrCode[value as keyof typeof consistErrCode]);
  });

  return { codes: err_code, fields: [...new Set(err_field)] };
};

const validateStep5 = (o: IStep5, f6: number) => {
  const err_code: string[] = [];
  const err_field: string[] = [];

  if (
    f6 >= 5 &&
    f6 <= 17 &&
    (o["f37"] === "" ||
      o["f40"] === "" ||
      o["f43"] === "" ||
      o["f50"] === "" ||
      o["f51"] === "" ||
      o["f52"] === "" ||
      o["f53"] === "" ||
      o["f54"] === "" ||
      o["f55"] === "" ||
      o["f56"] === "" ||
      o["f57"] === "" ||
      o["f58"] === "" ||
      o["f59"] === "" ||
      o["f60"] === "")
  ) {
    err_code.push("PART5-1");
  }
  if (
    (f6 < 5 || f6 > 17) &&
    (o["f37"] !== "" ||
      o["f38"] !== "" ||
      o["f39"] !== "" ||
      o["f40"] !== "" ||
      o["f41"] !== "" ||
      o["f42"] !== "" ||
      o["f43"] !== "" ||
      o["f44"] !== "" ||
      o["f45"] !== "" ||
      o["f46"] !== "" ||
      o["f47"] !== "" ||
      o["f48"] !== "" ||
      o["f49"] !== "" ||
      o["f50"] !== "" ||
      o["f51"] !== "" ||
      o["f52"] !== "" ||
      o["f53"] !== "" ||
      o["f54"] !== "" ||
      o["f55"] !== "" ||
      o["f56"] !== "" ||
      o["f57"] !== "" ||
      o["f58"] !== "" ||
      o["f59"] !== "" ||
      o["f60"] !== "")
  ) {
    err_code.push("PART5-2");
  }
  if (o["f37"] === "1" && (o["f38"] === "" || o["f39"] !== "")) {
    err_code.push("F37-1");
  }
  if (o["f37"] === "2" && (o["f38"] !== "" || o["f39"] === "")) {
    err_code.push("F37-2");
  }
  if (o["f37"] === "" && (o["f38"] !== "" || o["f39"] !== "")) {
    err_code.push("F37-3");
  }
  if (o["f40"] === "1" && (o["f41"] === "" || o["f42"] !== "")) {
    err_code.push("F40-1");
  }
  if (o["f40"] === "2" && (o["f41"] !== "" || o["f42"] === "")) {
    err_code.push("F40-2");
  }
  if (o["f40"] === "" && (o["f41"] !== "" || o["f42"] !== "")) {
    err_code.push("F40-3");
  }
  if (
    o["f43"] === "1" &&
    (o["f44"] === "" || o["f46"] === "" || o["f48"] !== "" || o["f49"] !== "")
  ) {
    err_code.push("F43-1");
  }
  if (
    o["f43"] === "2" &&
    (o["f44"] !== "" ||
      o["f45"] !== "" ||
      o["f46"] !== "" ||
      o["f47"] !== "" ||
      o["f48"] == "")
  ) {
    err_code.push("F43-2");
  }
  if (
    o["f43"] === "" &&
    (o["f44"] !== "" ||
      o["f45"] !== "" ||
      o["f46"] !== "" ||
      o["f47"] !== "" ||
      o["f48"] !== "" ||
      o["f49"] !== "")
  ) {
    err_code.push("F43-3");
  }
  if (o["f44"] === "2" && o["f45"] === "") {
    err_code.push("F43-4");
  }
  if (
    (o["f44"] === "3" || o["f44"] === "4" || o["f44"] === "") &&
    o["f45"] !== ""
  ) {
    err_code.push("F43-5");
  }
  if ((o["f46"] === "1" || o["f46"] === "2") && o["f47"] === "") {
    err_code.push("F43-6");
  }
  if ((o["f46"] === "3" || o["f46"] === "4") && o["f47"] !== "") {
    err_code.push("F43-7");
  }
  if ((o["f48"] === "1" || o["f48"] === "2") && o["f49"] === "") {
    err_code.push("F43-8");
  }
  if ((o["f48"] === "3" || o["f48"] === "4") && o["f49"] !== "") {
    err_code.push("F43-9");
  }
  if (o["f47"] === "1" && o["f46"] !== "1") {
    err_code.push("F47-1");
  }
  if (o["f49"] === "1" && o["f48"] !== "1") {
    err_code.push("F49-1");
  }
  if (
    (o["f51"] === "3" || o["f51"] === "4") &&
    o["f52"] !== "3" &&
    o["f52"] !== "4"
  ) {
    err_code.push("F52-1");
  }

  if (err_code.length === 0) {
    return;
  }
  err_code.forEach((value: string) => {
    err_field.push(...consistErrCode[value as keyof typeof consistErrCode]);
  });

  return { codes: err_code, fields: [...new Set(err_field)] };
};

const validateStep6 = (o: IStep6, f6: number) => {
  const err_code: string[] = [];
  const err_field: string[] = [];

  if (
    f6 >= 18 &&
    (o["f61"] === "" ||
      o["f62"] === "" ||
      o["f63"] === "" ||
      o["f65"] === "" ||
      o["f66"] === "" ||
      o["f67"] === "" ||
      o["f75"] === "" ||
      o["f77"] === "" ||
      o["f80"] === "" ||
      o["f81"] === "" ||
      o["f82"] === "" ||
      o["f86"] === "" ||
      o["f90"] === "" ||
      o["f91"] === "" ||
      o["f92"] === "" ||
      o["f93"] === "" ||
      o["f95"] === "" ||
      o["f96"] === "" ||
      o["f98"] === "")
  ) {
    err_code.push("PART6-1");
  }
  if (
    f6 < 18 &&
    (o["f61"] !== "" ||
      o["f62"] !== "" ||
      o["f63"] !== "" ||
      o["f64"] !== "" ||
      o["f65"] !== "" ||
      o["f66"] !== "" ||
      o["f67"] !== "" ||
      o["f68"] !== "" ||
      o["f69"] !== "" ||
      o["f70"] !== "" ||
      o["f71"] !== "" ||
      o["f72"] !== "" ||
      o["f73"] !== "" ||
      o["f74"] !== "" ||
      o["f75"] !== "" ||
      o["f76"] !== "" ||
      o["f77"] !== "" ||
      o["f78"] !== "" ||
      o["f79"] !== "" ||
      o["f80"] !== "" ||
      o["f81"] !== "" ||
      o["f82"] !== "" ||
      o["f83"] !== "" ||
      o["f84"] !== "" ||
      o["f85"] !== "" ||
      o["f86"] !== "" ||
      o["f87"] !== "" ||
      o["f88"] !== "" ||
      o["f89"] !== "" ||
      o["f90"] !== "" ||
      o["f91"] !== "" ||
      o["f92"] !== "" ||
      o["f93"] !== "" ||
      o["f94"] !== "" ||
      o["f95"] !== "" ||
      o["f96"] !== "" ||
      o["f97"] !== "" ||
      o["f98"] !== "")
  ) {
    err_code.push("PART6-2");
  }
  if (o["f63"] === "1" && o["f64"] === "") {
    err_code.push("F63-1");
  }
  if (
    (o["f63"] === "2" || o["f63"] === "7" || o["f63"] === "9") &&
    o["f64"] !== ""
  ) {
    err_code.push("F63-2");
  }
  if (o["f66"] === "4" && o["f75"] !== "4" && o["f77"] !== "4") {
    err_code.push("F66-1");
  }
  if (
    (o["f66"] === "2" || o["f66"] === "3") &&
    o["f75"] !== "2" &&
    o["f75"] !== "3" &&
    o["f75"] !== "4" &&
    o["f77"] !== "2" &&
    o["f77"] !== "3" &&
    o["f77"] !== "4"
  ) {
    err_code.push("F66-2");
  }
  if (o["f75"] === "1" && o["f77"] === "1" && o["f66"] !== "1") {
    err_code.push("F66-3");
  }
  if (
    (o["f75"] === "2" || o["f75"] === "3") &&
    (o["f77"] === "2" || o["f77"] === "3") &&
    o["f66"] !== "2" &&
    o["f66"] !== "3"
  ) {
    err_code.push("F66-4");
  }
  if (
    (o["f75"] === "4" || o["f77"] === "4") &&
    o["f66"] !== "2" &&
    o["f66"] !== "3" &&
    o["f66"] !== "4"
  ) {
    err_code.push("F66-5");
  }
  if (
    o["f67"] === "1" &&
    (o["f68"] === "" ||
      o["f69"] === "" ||
      o["f70"] === "" ||
      o["f71"] === "" ||
      o["f72"] === "" ||
      o["f73"] === "" ||
      o["f74"] === "")
  ) {
    err_code.push("F67-1");
  }
  if (
    (o["f67"] === "2" ||
      o["f67"] === "7" ||
      o["f67"] === "9" ||
      o["f67"] === "") &&
    (o["f68"] !== "" ||
      o["f69"] !== "" ||
      o["f70"] !== "" ||
      o["f71"] !== "" ||
      o["f72"] !== "" ||
      o["f73"] !== "" ||
      o["f74"] !== "")
  ) {
    err_code.push("F67-2");
  }
  if (
    o["f67"] === "1" &&
    o["f68"] !== "1" &&
    o["f69"] !== "1" &&
    o["f70"] !== "1" &&
    o["f71"] !== "1" &&
    o["f72"] !== "1" &&
    o["f73"] !== "1" &&
    o["f74"] !== "1"
  ) {
    err_code.push("F67-3");
  }
  if (["1", "2", "3", "7", "9"].includes(o["f75"]) && o["f76"] === "") {
    err_code.push("F75-1");
  }
  if (["4", ""].includes(o["f75"]) && o["f76"] !== "") {
    err_code.push("F75-2");
  }
  if (o["f76"] === "1" && o["f75"] !== "1") {
    err_code.push("F76-1");
  }
  if (o["f76"] === "2" && o["f75"] !== "1" && o["f75"] !== "2") {
    err_code.push("F76-2");
  }

  if (err_code.length === 0) {
    return;
  }
  err_code.forEach((value: string) => {
    err_field.push(...consistErrCode[value as keyof typeof consistErrCode]);
  });

  return { codes: err_code, fields: [...new Set(err_field)] };
};

const validateStep7 = (o: IStep7, f6: number) => {
  const err_code: string[] = [];
  const err_field: string[] = [];

  if (err_code.length === 0) {
    return;
  }
  err_code.forEach((value: string) => {
    err_field.push(...consistErrCode[value as keyof typeof consistErrCode]);
  });

  return { codes: err_code, fields: [...new Set(err_field)] };
};

const validateStep8 = (o: IStep8, f6: number) => {
  const err_code: string[] = [];
  const err_field: string[] = [];

  if (err_code.length === 0) {
    return;
  }
  err_code.forEach((value: string) => {
    err_field.push(...consistErrCode[value as keyof typeof consistErrCode]);
  });

  return { codes: err_code, fields: [...new Set(err_field)] };
};

const validateStep9 = (o: IStep9, f6: number) => {
  const err_code: string[] = [];
  const err_field: string[] = [];

  if (err_code.length === 0) {
    return;
  }
  err_code.forEach((value: string) => {
    err_field.push(...consistErrCode[value as keyof typeof consistErrCode]);
  });

  return { codes: err_code, fields: [...new Set(err_field)] };
};

const validateStep10 = (o: IStep10, f6: number) => {
  const err_code: string[] = [];
  const err_field: string[] = [];

  if (err_code.length === 0) {
    return;
  }
  err_code.forEach((value: string) => {
    err_field.push(...consistErrCode[value as keyof typeof consistErrCode]);
  });

  return { codes: err_code, fields: [...new Set(err_field)] };
};

const validateStep11 = (o: IStep11, f6: number) => {
  const err_code: string[] = [];
  const err_field: string[] = [];

  if (err_code.length === 0) {
    return;
  }
  err_code.forEach((value: string) => {
    err_field.push(...consistErrCode[value as keyof typeof consistErrCode]);
  });

  return { codes: err_code, fields: [...new Set(err_field)] };
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
