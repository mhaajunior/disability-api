import { Response } from "express";
import asyncHandler from "express-async-handler";
import { IRequest } from "../models/dto/request.dto";
import * as path from "path";
import * as Excel from "exceljs";
import {
  NewCommonError,
  calcPercentage,
  changeToDash,
  sum,
  toNumber,
} from "../helpers/commom.helper";
import code, { HttpStatusCode } from "../resource/common.code";

const printReport = asyncHandler(async (req: IRequest, res: Response) => {
  const body = req.body;
  const obj: any = {};
  let isWeight: boolean;

  for (const item of body) {
    if (item.count) {
      obj[item.id] = item.count;
      isWeight = false;
    } else if (item.wgt) {
      obj[item.id] = item.wgt;
      isWeight = true;
    }
  }

  const wb = new Excel.Workbook();

  const filePath = path.resolve(
    __dirname,
    "../resource/files/accom_template.xlsx"
  );

  wb.xlsx.readFile(filePath).then(async function () {
    let sh = wb.getWorksheet("Sheet1");

    sh.eachRow((row) => {
      row.eachCell((cell) => {
        if (
          [
            "A1",
            "A2",
            "A12",
            "A19",
            "A26",
            "A33",
            "A40",
            "A47",
            "A54",
            "C12",
            "C19",
            "C26",
            "C33",
            "C40",
            "C47",
            "C54",
          ].includes(cell.address)
        ) {
          // make cell font bold
          cell.font = {
            name: "TH SarabunPSK",
            size: 15,
            bold: true,
          };
        } else {
          cell.font = { name: "TH SarabunPSK", size: 15 };
        }
      });
    });

    //calculate total
    //reg = 1
    let d19 = sum([
      obj["1_1_1"],
      obj["1_1_2"],
      obj["1_1_3"],
      obj["1_1_4"],
      obj["1_1_5"],
      obj["1_1_6"],
    ]);
    let f19 = sum([
      obj["2_1_1"],
      obj["2_1_2"],
      obj["2_1_3"],
      obj["2_1_4"],
      obj["2_1_5"],
      obj["2_1_6"],
    ]);
    let h19 = sum([
      obj["3_1_1"],
      obj["3_1_2"],
      obj["3_1_3"],
      obj["3_1_4"],
      obj["3_1_5"],
      obj["3_1_6"],
    ]);
    let j19 = sum([
      obj["4_1_1"],
      obj["4_1_2"],
      obj["4_1_3"],
      obj["4_1_4"],
      obj["4_1_5"],
      obj["4_1_6"],
    ]);
    let l19 = sum([
      obj["5_1_1"],
      obj["5_1_2"],
      obj["5_1_3"],
      obj["5_1_4"],
      obj["5_1_5"],
      obj["5_1_6"],
    ]);
    let n19 = sum([
      obj["6_1_1"],
      obj["6_1_2"],
      obj["6_1_3"],
      obj["6_1_4"],
      obj["6_1_5"],
      obj["6_1_6"],
    ]);
    let p19 = sum([
      obj["7_1_1"],
      obj["7_1_2"],
      obj["7_1_3"],
      obj["7_1_4"],
      obj["7_1_5"],
      obj["7_1_6"],
    ]);
    let r19 = sum([
      obj["8_1_1"],
      obj["8_1_2"],
      obj["8_1_3"],
      obj["8_1_4"],
      obj["8_1_5"],
      obj["8_1_6"],
    ]);
    let t19 = sum([
      obj["9_1_1"],
      obj["9_1_2"],
      obj["9_1_3"],
      obj["9_1_4"],
      obj["9_1_5"],
      obj["9_1_6"],
    ]);
    let v19 = sum([
      obj["10_1_1"],
      obj["10_1_2"],
      obj["10_1_3"],
      obj["10_1_4"],
      obj["10_1_5"],
      obj["10_1_6"],
    ]);
    let b19 = sum([d19, f19, h19, j19, l19, n19, p19, r19, t19, v19]);

    //reg = 6 ปริมณฑล
    let d26 = sum([
      obj["1_6_1"],
      obj["1_6_2"],
      obj["1_6_3"],
      obj["1_6_4"],
      obj["1_6_5"],
      obj["1_6_6"],
    ]);
    let f26 = sum([
      obj["2_6_1"],
      obj["2_6_2"],
      obj["2_6_3"],
      obj["2_6_4"],
      obj["2_6_5"],
      obj["2_6_6"],
    ]);
    let h26 = sum([
      obj["3_6_1"],
      obj["3_6_2"],
      obj["3_6_3"],
      obj["3_6_4"],
      obj["3_6_5"],
      obj["3_6_6"],
    ]);
    let j26 = sum([
      obj["4_6_1"],
      obj["4_6_2"],
      obj["4_6_3"],
      obj["4_6_4"],
      obj["4_6_5"],
      obj["4_6_6"],
    ]);
    let l26 = sum([
      obj["5_6_1"],
      obj["5_6_2"],
      obj["5_6_3"],
      obj["5_6_4"],
      obj["5_6_5"],
      obj["5_6_6"],
    ]);
    let n26 = sum([
      obj["6_6_1"],
      obj["6_6_2"],
      obj["6_6_3"],
      obj["6_6_4"],
      obj["6_6_5"],
      obj["6_6_6"],
    ]);
    let p26 = sum([
      obj["7_6_1"],
      obj["7_6_2"],
      obj["7_6_3"],
      obj["7_6_4"],
      obj["7_6_5"],
      obj["7_6_6"],
    ]);
    let r26 = sum([
      obj["8_6_1"],
      obj["8_6_2"],
      obj["8_6_3"],
      obj["8_6_4"],
      obj["8_6_5"],
      obj["8_6_6"],
    ]);
    let t26 = sum([
      obj["9_6_1"],
      obj["9_6_2"],
      obj["9_6_3"],
      obj["9_6_4"],
      obj["9_6_5"],
      obj["9_6_6"],
    ]);
    let v26 = sum([
      obj["10_6_1"],
      obj["10_6_2"],
      obj["10_6_3"],
      obj["10_6_4"],
      obj["10_6_5"],
      obj["10_6_6"],
    ]);
    let b26 = sum([d26, f26, h26, j26, l26, n26, p26, r26, t26, v26]);

    //reg = 7 ภาคกลาง
    let d33 = sum([
      obj["1_7_1"],
      obj["1_7_2"],
      obj["1_7_3"],
      obj["1_7_4"],
      obj["1_7_5"],
      obj["1_7_6"],
    ]);
    let f33 = sum([
      obj["2_7_1"],
      obj["2_7_2"],
      obj["2_7_3"],
      obj["2_7_4"],
      obj["2_7_5"],
      obj["2_7_6"],
    ]);
    let h33 = sum([
      obj["3_7_1"],
      obj["3_7_2"],
      obj["3_7_3"],
      obj["3_7_4"],
      obj["3_7_5"],
      obj["3_7_6"],
    ]);
    let j33 = sum([
      obj["4_7_1"],
      obj["4_7_2"],
      obj["4_7_3"],
      obj["4_7_4"],
      obj["4_7_5"],
      obj["4_7_6"],
    ]);
    let l33 = sum([
      obj["5_7_1"],
      obj["5_7_2"],
      obj["5_7_3"],
      obj["5_7_4"],
      obj["5_7_5"],
      obj["5_7_6"],
    ]);
    let n33 = sum([
      obj["6_7_1"],
      obj["6_7_2"],
      obj["6_7_3"],
      obj["6_7_4"],
      obj["6_7_5"],
      obj["6_7_6"],
    ]);
    let p33 = sum([
      obj["7_7_1"],
      obj["7_7_2"],
      obj["7_7_3"],
      obj["7_7_4"],
      obj["7_7_5"],
      obj["7_7_6"],
    ]);
    let r33 = sum([
      obj["8_7_1"],
      obj["8_7_2"],
      obj["8_7_3"],
      obj["8_7_4"],
      obj["8_7_5"],
      obj["8_7_6"],
    ]);
    let t33 = sum([
      obj["9_7_1"],
      obj["9_7_2"],
      obj["9_7_3"],
      obj["9_7_4"],
      obj["9_7_5"],
      obj["9_7_6"],
    ]);
    let v33 = sum([
      obj["10_7_1"],
      obj["10_7_2"],
      obj["10_7_3"],
      obj["10_7_4"],
      obj["10_7_5"],
      obj["10_7_6"],
    ]);
    let b33 = sum([d33, f33, h33, j33, l33, n33, p33, r33, t33, v33]);

    //reg = 3
    let d40 = sum([
      obj["1_3_1"],
      obj["1_3_2"],
      obj["1_3_3"],
      obj["1_3_4"],
      obj["1_3_5"],
      obj["1_3_6"],
    ]);
    let f40 = sum([
      obj["2_3_1"],
      obj["2_3_2"],
      obj["2_3_3"],
      obj["2_3_4"],
      obj["2_3_5"],
      obj["2_3_6"],
    ]);
    let h40 = sum([
      obj["3_3_1"],
      obj["3_3_2"],
      obj["3_3_3"],
      obj["3_3_4"],
      obj["3_3_5"],
      obj["3_3_6"],
    ]);
    let j40 = sum([
      obj["4_3_1"],
      obj["4_3_2"],
      obj["4_3_3"],
      obj["4_3_4"],
      obj["4_3_5"],
      obj["4_3_6"],
    ]);
    let l40 = sum([
      obj["5_3_1"],
      obj["5_3_2"],
      obj["5_3_3"],
      obj["5_3_4"],
      obj["5_3_5"],
      obj["5_3_6"],
    ]);
    let n40 = sum([
      obj["6_3_1"],
      obj["6_3_2"],
      obj["6_3_3"],
      obj["6_3_4"],
      obj["6_3_5"],
      obj["6_3_6"],
    ]);
    let p40 = sum([
      obj["7_3_1"],
      obj["7_3_2"],
      obj["7_3_3"],
      obj["7_3_4"],
      obj["7_3_5"],
      obj["7_3_6"],
    ]);
    let r40 = sum([
      obj["8_3_1"],
      obj["8_3_2"],
      obj["8_3_3"],
      obj["8_3_4"],
      obj["8_3_5"],
      obj["8_3_6"],
    ]);
    let t40 = sum([
      obj["9_3_1"],
      obj["9_3_2"],
      obj["9_3_3"],
      obj["9_3_4"],
      obj["9_3_5"],
      obj["9_3_6"],
    ]);
    let v40 = sum([
      obj["10_3_1"],
      obj["10_3_2"],
      obj["10_3_3"],
      obj["10_3_4"],
      obj["10_3_5"],
      obj["10_3_6"],
    ]);
    let b40 = sum([d40, f40, h40, j40, l40, n40, p40, r40, t40, v40]);

    //reg = 4
    let d47 = sum([
      obj["1_4_1"],
      obj["1_4_2"],
      obj["1_4_3"],
      obj["1_4_4"],
      obj["1_4_5"],
      obj["1_4_6"],
    ]);
    let f47 = sum([
      obj["2_4_1"],
      obj["2_4_2"],
      obj["2_4_3"],
      obj["2_4_4"],
      obj["2_4_5"],
      obj["2_4_6"],
    ]);
    let h47 = sum([
      obj["3_4_1"],
      obj["3_4_2"],
      obj["3_4_3"],
      obj["3_4_4"],
      obj["3_4_5"],
      obj["3_4_6"],
    ]);
    let j47 = sum([
      obj["4_4_1"],
      obj["4_4_2"],
      obj["4_4_3"],
      obj["4_4_4"],
      obj["4_4_5"],
      obj["4_4_6"],
    ]);
    let l47 = sum([
      obj["5_4_1"],
      obj["5_4_2"],
      obj["5_4_3"],
      obj["5_4_4"],
      obj["5_4_5"],
      obj["5_4_6"],
    ]);
    let n47 = sum([
      obj["6_4_1"],
      obj["6_4_2"],
      obj["6_4_3"],
      obj["6_4_4"],
      obj["6_4_5"],
      obj["6_4_6"],
    ]);
    let p47 = sum([
      obj["7_4_1"],
      obj["7_4_2"],
      obj["7_4_3"],
      obj["7_4_4"],
      obj["7_4_5"],
      obj["7_4_6"],
    ]);
    let r47 = sum([
      obj["8_4_1"],
      obj["8_4_2"],
      obj["8_4_3"],
      obj["8_4_4"],
      obj["8_4_5"],
      obj["8_4_6"],
    ]);
    let t47 = sum([
      obj["9_4_1"],
      obj["9_4_2"],
      obj["9_4_3"],
      obj["9_4_4"],
      obj["9_4_5"],
      obj["9_4_6"],
    ]);
    let v47 = sum([
      obj["10_4_1"],
      obj["10_4_2"],
      obj["10_4_3"],
      obj["10_4_4"],
      obj["10_4_5"],
      obj["10_4_6"],
    ]);
    let b47 = sum([d47, f47, h47, j47, l47, n47, p47, r47, t47, v47]);

    //reg = 5
    let d54 = sum([
      obj["1_5_1"],
      obj["1_5_2"],
      obj["1_5_3"],
      obj["1_5_4"],
      obj["1_5_5"],
      obj["1_5_6"],
    ]);
    let f54 = sum([
      obj["2_5_1"],
      obj["2_5_2"],
      obj["2_5_3"],
      obj["2_5_4"],
      obj["2_5_5"],
      obj["2_5_6"],
    ]);
    let h54 = sum([
      obj["3_5_1"],
      obj["3_5_2"],
      obj["3_5_3"],
      obj["3_5_4"],
      obj["3_5_5"],
      obj["3_5_6"],
    ]);
    let j54 = sum([
      obj["4_5_1"],
      obj["4_5_2"],
      obj["4_5_3"],
      obj["4_5_4"],
      obj["4_5_5"],
      obj["4_5_6"],
    ]);
    let l54 = sum([
      obj["5_5_1"],
      obj["5_5_2"],
      obj["5_5_3"],
      obj["5_5_4"],
      obj["5_5_5"],
      obj["5_5_6"],
    ]);
    let n54 = sum([
      obj["6_5_1"],
      obj["6_5_2"],
      obj["6_5_3"],
      obj["6_5_4"],
      obj["6_5_5"],
      obj["6_5_6"],
    ]);
    let p54 = sum([
      obj["7_5_1"],
      obj["7_5_2"],
      obj["7_5_3"],
      obj["7_5_4"],
      obj["7_5_5"],
      obj["7_5_6"],
    ]);
    let r54 = sum([
      obj["8_5_1"],
      obj["8_5_2"],
      obj["8_5_3"],
      obj["8_5_4"],
      obj["8_5_5"],
      obj["8_5_6"],
    ]);
    let t54 = sum([
      obj["9_5_1"],
      obj["9_5_2"],
      obj["9_5_3"],
      obj["9_5_4"],
      obj["9_5_5"],
      obj["9_5_6"],
    ]);
    let v54 = sum([
      obj["10_5_1"],
      obj["10_5_2"],
      obj["10_5_3"],
      obj["10_5_4"],
      obj["10_5_5"],
      obj["10_5_6"],
    ]);
    let b54 = sum([d54, f54, h54, j54, l54, n54, p54, r54, t54, v54]);

    let b20 = sum([
      obj["1_1_1"],
      obj["2_1_1"],
      obj["3_1_1"],
      obj["4_1_1"],
      obj["5_1_1"],
      obj["6_1_1"],
      obj["7_1_1"],
      obj["8_1_1"],
      obj["9_1_1"],
      obj["10_1_1"],
    ]);
    let b21 = sum([
      obj["1_1_2"],
      obj["2_1_2"],
      obj["3_1_2"],
      obj["4_1_2"],
      obj["5_1_2"],
      obj["6_1_2"],
      obj["7_1_2"],
      obj["8_1_2"],
      obj["9_1_2"],
      obj["10_1_2"],
    ]);
    let b22 = sum([
      obj["1_1_3"],
      obj["2_1_3"],
      obj["3_1_3"],
      obj["4_1_3"],
      obj["5_1_3"],
      obj["6_1_3"],
      obj["7_1_3"],
      obj["8_1_3"],
      obj["9_1_3"],
      obj["10_1_3"],
    ]);
    let b23 = sum([
      obj["1_1_4"],
      obj["2_1_4"],
      obj["3_1_4"],
      obj["4_1_4"],
      obj["5_1_4"],
      obj["6_1_4"],
      obj["7_1_4"],
      obj["8_1_4"],
      obj["9_1_4"],
      obj["10_1_4"],
    ]);
    let b24 = sum([
      obj["1_1_5"],
      obj["2_1_5"],
      obj["3_1_5"],
      obj["4_1_5"],
      obj["5_1_5"],
      obj["6_1_5"],
      obj["7_1_5"],
      obj["8_1_5"],
      obj["9_1_5"],
      obj["10_1_5"],
    ]);
    let b25 = sum([
      obj["1_1_6"],
      obj["2_1_6"],
      obj["3_1_6"],
      obj["4_1_6"],
      obj["5_1_6"],
      obj["6_1_6"],
      obj["7_1_6"],
      obj["8_1_6"],
      obj["9_1_6"],
      obj["10_1_6"],
    ]);
    let b27 = sum([
      obj["1_6_1"],
      obj["2_6_1"],
      obj["3_6_1"],
      obj["4_6_1"],
      obj["5_6_1"],
      obj["6_6_1"],
      obj["7_6_1"],
      obj["8_6_1"],
      obj["9_6_1"],
      obj["10_6_1"],
    ]);
    let b28 = sum([
      obj["1_6_2"],
      obj["2_6_2"],
      obj["3_6_2"],
      obj["4_6_2"],
      obj["5_6_2"],
      obj["6_6_2"],
      obj["7_6_2"],
      obj["8_6_2"],
      obj["9_6_2"],
      obj["10_6_2"],
    ]);
    let b29 = sum([
      obj["1_6_3"],
      obj["2_6_3"],
      obj["3_6_3"],
      obj["4_6_3"],
      obj["5_6_3"],
      obj["6_6_3"],
      obj["7_6_3"],
      obj["8_6_3"],
      obj["9_6_3"],
      obj["10_6_3"],
    ]);
    let b30 = sum([
      obj["1_6_4"],
      obj["2_6_4"],
      obj["3_6_4"],
      obj["4_6_4"],
      obj["5_6_4"],
      obj["6_6_4"],
      obj["7_6_4"],
      obj["8_6_4"],
      obj["9_6_4"],
      obj["10_6_4"],
    ]);
    let b31 = sum([
      obj["1_6_5"],
      obj["2_6_5"],
      obj["3_6_5"],
      obj["4_6_5"],
      obj["5_6_5"],
      obj["6_6_5"],
      obj["7_6_5"],
      obj["8_6_5"],
      obj["9_6_5"],
      obj["10_6_5"],
    ]);
    let b32 = sum([
      obj["1_6_6"],
      obj["2_6_6"],
      obj["3_6_6"],
      obj["4_6_6"],
      obj["5_6_6"],
      obj["6_6_6"],
      obj["7_6_6"],
      obj["8_6_6"],
      obj["9_6_6"],
      obj["10_6_6"],
    ]);
    let b34 = sum([
      obj["1_7_1"],
      obj["2_7_1"],
      obj["3_7_1"],
      obj["4_7_1"],
      obj["5_7_1"],
      obj["6_7_1"],
      obj["7_7_1"],
      obj["8_7_1"],
      obj["9_7_1"],
      obj["10_7_1"],
    ]);
    let b35 = sum([
      obj["1_7_2"],
      obj["2_7_2"],
      obj["3_7_2"],
      obj["4_7_2"],
      obj["5_7_2"],
      obj["6_7_2"],
      obj["7_7_2"],
      obj["8_7_2"],
      obj["9_7_2"],
      obj["10_7_2"],
    ]);
    let b36 = sum([
      obj["1_7_3"],
      obj["2_7_3"],
      obj["3_7_3"],
      obj["4_7_3"],
      obj["5_7_3"],
      obj["6_7_3"],
      obj["7_7_3"],
      obj["8_7_3"],
      obj["9_7_3"],
      obj["10_7_3"],
    ]);
    let b37 = sum([
      obj["1_7_4"],
      obj["2_7_4"],
      obj["3_7_4"],
      obj["4_7_4"],
      obj["5_7_4"],
      obj["6_7_4"],
      obj["7_7_4"],
      obj["8_7_4"],
      obj["9_7_4"],
      obj["10_7_4"],
    ]);
    let b38 = sum([
      obj["1_7_5"],
      obj["2_7_5"],
      obj["3_7_5"],
      obj["4_7_5"],
      obj["5_7_5"],
      obj["6_7_5"],
      obj["7_7_5"],
      obj["8_7_5"],
      obj["9_7_5"],
      obj["10_7_5"],
    ]);
    let b39 = sum([
      obj["1_7_6"],
      obj["2_7_6"],
      obj["3_7_6"],
      obj["4_7_6"],
      obj["5_7_6"],
      obj["6_7_6"],
      obj["7_7_6"],
      obj["8_7_6"],
      obj["9_7_6"],
      obj["10_7_6"],
    ]);
    let b41 = sum([
      obj["1_3_1"],
      obj["2_3_1"],
      obj["3_3_1"],
      obj["4_3_1"],
      obj["5_3_1"],
      obj["6_3_1"],
      obj["7_3_1"],
      obj["8_3_1"],
      obj["9_3_1"],
      obj["10_3_1"],
    ]);
    let b42 = sum([
      obj["1_3_2"],
      obj["2_3_2"],
      obj["3_3_2"],
      obj["4_3_2"],
      obj["5_3_2"],
      obj["6_3_2"],
      obj["7_3_2"],
      obj["8_3_2"],
      obj["9_3_2"],
      obj["10_3_2"],
    ]);
    let b43 = sum([
      obj["1_3_3"],
      obj["2_3_3"],
      obj["3_3_3"],
      obj["4_3_3"],
      obj["5_3_3"],
      obj["6_3_3"],
      obj["7_3_3"],
      obj["8_3_3"],
      obj["9_3_3"],
      obj["10_3_3"],
    ]);
    let b44 = sum([
      obj["1_3_4"],
      obj["2_3_4"],
      obj["3_3_4"],
      obj["4_3_4"],
      obj["5_3_4"],
      obj["6_3_4"],
      obj["7_3_4"],
      obj["8_3_4"],
      obj["9_3_4"],
      obj["10_3_4"],
    ]);
    let b45 = sum([
      obj["1_3_5"],
      obj["2_3_5"],
      obj["3_3_5"],
      obj["4_3_5"],
      obj["5_3_5"],
      obj["6_3_5"],
      obj["7_3_5"],
      obj["8_3_5"],
      obj["9_3_5"],
      obj["10_3_5"],
    ]);
    let b46 = sum([
      obj["1_3_6"],
      obj["2_3_6"],
      obj["3_3_6"],
      obj["4_3_6"],
      obj["5_3_6"],
      obj["6_3_6"],
      obj["7_3_6"],
      obj["8_3_6"],
      obj["9_3_6"],
      obj["10_3_6"],
    ]);
    let b48 = sum([
      obj["1_4_1"],
      obj["2_4_1"],
      obj["3_4_1"],
      obj["4_4_1"],
      obj["5_4_1"],
      obj["6_4_1"],
      obj["7_4_1"],
      obj["8_4_1"],
      obj["9_4_1"],
      obj["10_4_1"],
    ]);
    let b49 = sum([
      obj["1_4_2"],
      obj["2_4_2"],
      obj["3_4_2"],
      obj["4_4_2"],
      obj["5_4_2"],
      obj["6_4_2"],
      obj["7_4_2"],
      obj["8_4_2"],
      obj["9_4_2"],
      obj["10_4_2"],
    ]);
    let b50 = sum([
      obj["1_4_3"],
      obj["2_4_3"],
      obj["3_4_3"],
      obj["4_4_3"],
      obj["5_4_3"],
      obj["6_4_3"],
      obj["7_4_3"],
      obj["8_4_3"],
      obj["9_4_3"],
      obj["10_4_3"],
    ]);
    let b51 = sum([
      obj["1_4_4"],
      obj["2_4_4"],
      obj["3_4_4"],
      obj["4_4_4"],
      obj["5_4_4"],
      obj["6_4_4"],
      obj["7_4_4"],
      obj["8_4_4"],
      obj["9_4_4"],
      obj["10_4_4"],
    ]);
    let b52 = sum([
      obj["1_4_5"],
      obj["2_4_5"],
      obj["3_4_5"],
      obj["4_4_5"],
      obj["5_4_5"],
      obj["6_4_5"],
      obj["7_4_5"],
      obj["8_4_5"],
      obj["9_4_5"],
      obj["10_4_5"],
    ]);
    let b53 = sum([
      obj["1_4_6"],
      obj["2_4_6"],
      obj["3_4_6"],
      obj["4_4_6"],
      obj["5_4_6"],
      obj["6_4_6"],
      obj["7_4_6"],
      obj["8_4_6"],
      obj["9_4_6"],
      obj["10_4_6"],
    ]);
    let b55 = sum([
      obj["1_5_1"],
      obj["2_5_1"],
      obj["3_5_1"],
      obj["4_5_1"],
      obj["5_5_1"],
      obj["6_5_1"],
      obj["7_5_1"],
      obj["8_5_1"],
      obj["9_5_1"],
      obj["10_5_1"],
    ]);
    let b56 = sum([
      obj["1_5_2"],
      obj["2_5_2"],
      obj["3_5_2"],
      obj["4_5_2"],
      obj["5_5_2"],
      obj["6_5_2"],
      obj["7_5_2"],
      obj["8_5_2"],
      obj["9_5_2"],
      obj["10_5_2"],
    ]);
    let b57 = sum([
      obj["1_5_3"],
      obj["2_5_3"],
      obj["3_5_3"],
      obj["4_5_3"],
      obj["5_5_3"],
      obj["6_5_3"],
      obj["7_5_3"],
      obj["8_5_3"],
      obj["9_5_3"],
      obj["10_5_3"],
    ]);
    let b58 = sum([
      obj["1_5_4"],
      obj["2_5_4"],
      obj["3_5_4"],
      obj["4_5_4"],
      obj["5_5_4"],
      obj["6_5_4"],
      obj["7_5_4"],
      obj["8_5_4"],
      obj["9_5_4"],
      obj["10_5_4"],
    ]);
    let b59 = sum([
      obj["1_5_5"],
      obj["2_5_5"],
      obj["3_5_5"],
      obj["4_5_5"],
      obj["5_5_5"],
      obj["6_5_5"],
      obj["7_5_5"],
      obj["8_5_5"],
      obj["9_5_5"],
      obj["10_5_5"],
    ]);
    let b60 = sum([
      obj["1_5_6"],
      obj["2_5_6"],
      obj["3_5_6"],
      obj["4_5_6"],
      obj["5_5_6"],
      obj["6_5_6"],
      obj["7_5_6"],
      obj["8_5_6"],
      obj["9_5_6"],
      obj["10_5_6"],
    ]);
    let b12 = sum([b19, b26, b33, b40, b47, b54]);
    let b13 = sum([b20, b27, b34, b41, b48, b55]);
    let b14 = sum([b21, b28, b35, b42, b49, b56]);
    let b15 = sum([b22, b29, b36, b43, b50, b57]);
    let b16 = sum([b23, b30, b37, b44, b51, b58]);
    let b17 = sum([b24, b31, b38, b45, b52, b59]);
    let b18 = sum([b25, b32, b39, b46, b53, b60]);
    let d12 = sum([d19, d26, d33, d40, d47, d54]);
    let d13 = sum([
      obj["1_1_1"],
      obj["1_6_1"],
      obj["1_7_1"],
      obj["1_3_1"],
      obj["1_4_1"],
      obj["1_5_1"],
    ]);
    let d14 = sum([
      obj["1_1_2"],
      obj["1_6_2"],
      obj["1_7_2"],
      obj["1_3_2"],
      obj["1_4_2"],
      obj["1_5_2"],
    ]);
    let d15 = sum([
      obj["1_1_3"],
      obj["1_6_3"],
      obj["1_7_3"],
      obj["1_3_3"],
      obj["1_4_3"],
      obj["1_5_3"],
    ]);
    let d16 = sum([
      obj["1_1_4"],
      obj["1_6_4"],
      obj["1_7_4"],
      obj["1_3_4"],
      obj["1_4_4"],
      obj["1_5_4"],
    ]);
    let d17 = sum([
      obj["1_1_5"],
      obj["1_6_5"],
      obj["1_7_5"],
      obj["1_3_5"],
      obj["1_4_5"],
      obj["1_5_5"],
    ]);
    let d18 = sum([
      obj["1_1_6"],
      obj["1_6_6"],
      obj["1_7_6"],
      obj["1_3_6"],
      obj["1_4_6"],
      obj["1_5_6"],
    ]);
    let f12 = sum([f19, f26, f33, f40, f47, f54]);
    let f13 = sum([
      obj["2_1_1"],
      obj["2_6_1"],
      obj["2_7_1"],
      obj["2_3_1"],
      obj["2_4_1"],
      obj["2_5_1"],
    ]);
    let f14 = sum([
      obj["2_1_2"],
      obj["2_6_2"],
      obj["2_7_2"],
      obj["2_3_2"],
      obj["2_4_2"],
      obj["2_5_2"],
    ]);
    let f15 = sum([
      obj["2_1_3"],
      obj["2_6_3"],
      obj["2_7_3"],
      obj["2_3_3"],
      obj["2_4_3"],
      obj["2_5_3"],
    ]);
    let f16 = sum([
      obj["2_1_4"],
      obj["2_6_4"],
      obj["2_7_4"],
      obj["2_3_4"],
      obj["2_4_4"],
      obj["2_5_4"],
    ]);
    let f17 = sum([
      obj["2_1_5"],
      obj["2_6_5"],
      obj["2_7_5"],
      obj["2_3_5"],
      obj["2_4_5"],
      obj["2_5_5"],
    ]);
    let f18 = sum([
      obj["2_1_6"],
      obj["2_6_6"],
      obj["2_7_6"],
      obj["2_3_6"],
      obj["2_4_6"],
      obj["2_5_6"],
    ]);
    let h12 = sum([h19, h26, h33, h40, h47, h54]);
    let h13 = sum([
      obj["3_1_1"],
      obj["3_6_1"],
      obj["3_7_1"],
      obj["3_3_1"],
      obj["3_4_1"],
      obj["3_5_1"],
    ]);
    let h14 = sum([
      obj["3_1_2"],
      obj["3_6_2"],
      obj["3_7_2"],
      obj["3_3_2"],
      obj["3_4_2"],
      obj["3_5_2"],
    ]);
    let h15 = sum([
      obj["3_1_3"],
      obj["3_6_3"],
      obj["3_7_3"],
      obj["3_3_3"],
      obj["3_4_3"],
      obj["3_5_3"],
    ]);
    let h16 = sum([
      obj["3_1_4"],
      obj["3_6_4"],
      obj["3_7_4"],
      obj["3_3_4"],
      obj["3_4_4"],
      obj["3_5_4"],
    ]);
    let h17 = sum([
      obj["3_1_5"],
      obj["3_6_5"],
      obj["3_7_5"],
      obj["3_3_5"],
      obj["3_4_5"],
      obj["3_5_5"],
    ]);
    let h18 = sum([
      obj["3_1_6"],
      obj["3_6_6"],
      obj["3_7_6"],
      obj["3_3_6"],
      obj["3_4_6"],
      obj["3_5_6"],
    ]);
    let j12 = sum([j19, j26, j33, j40, j47, j54]);
    let j13 = sum([
      obj["4_1_1"],
      obj["4_6_1"],
      obj["4_7_1"],
      obj["4_3_1"],
      obj["4_4_1"],
      obj["4_5_1"],
    ]);
    let j14 = sum([
      obj["4_1_2"],
      obj["4_6_2"],
      obj["4_7_2"],
      obj["4_3_2"],
      obj["4_4_2"],
      obj["4_5_2"],
    ]);
    let j15 = sum([
      obj["4_1_3"],
      obj["4_6_3"],
      obj["4_7_3"],
      obj["4_3_3"],
      obj["4_4_3"],
      obj["4_5_3"],
    ]);
    let j16 = sum([
      obj["4_1_4"],
      obj["4_6_4"],
      obj["4_7_4"],
      obj["4_3_4"],
      obj["4_4_4"],
      obj["4_5_4"],
    ]);
    let j17 = sum([
      obj["4_1_5"],
      obj["4_6_5"],
      obj["4_7_5"],
      obj["4_3_5"],
      obj["4_4_5"],
      obj["4_5_5"],
    ]);
    let j18 = sum([
      obj["4_1_6"],
      obj["4_6_6"],
      obj["4_7_6"],
      obj["4_3_6"],
      obj["4_4_6"],
      obj["4_5_6"],
    ]);
    let l12 = sum([l19, l26, l33, l40, l47, l54]);
    let l13 = sum([
      obj["5_1_1"],
      obj["5_6_1"],
      obj["5_7_1"],
      obj["5_3_1"],
      obj["5_4_1"],
      obj["5_5_1"],
    ]);
    let l14 = sum([
      obj["5_1_2"],
      obj["5_6_2"],
      obj["5_7_2"],
      obj["5_3_2"],
      obj["5_4_2"],
      obj["5_5_2"],
    ]);
    let l15 = sum([
      obj["5_1_3"],
      obj["5_6_3"],
      obj["5_7_3"],
      obj["5_3_3"],
      obj["5_4_3"],
      obj["5_5_3"],
    ]);
    let l16 = sum([
      obj["5_1_4"],
      obj["5_6_4"],
      obj["5_7_4"],
      obj["5_3_4"],
      obj["5_4_4"],
      obj["5_5_4"],
    ]);
    let l17 = sum([
      obj["5_1_5"],
      obj["5_6_5"],
      obj["5_7_5"],
      obj["5_3_5"],
      obj["5_4_5"],
      obj["5_5_5"],
    ]);
    let l18 = sum([
      obj["5_1_6"],
      obj["5_6_6"],
      obj["5_7_6"],
      obj["5_3_6"],
      obj["5_4_6"],
      obj["5_5_6"],
    ]);
    let n12 = sum([n19, n26, n33, n40, n47, n54]);
    let n13 = sum([
      obj["6_1_1"],
      obj["6_6_1"],
      obj["6_7_1"],
      obj["6_3_1"],
      obj["6_4_1"],
      obj["6_5_1"],
    ]);
    let n14 = sum([
      obj["6_1_2"],
      obj["6_6_2"],
      obj["6_7_2"],
      obj["6_3_2"],
      obj["6_4_2"],
      obj["6_5_2"],
    ]);
    let n15 = sum([
      obj["6_1_3"],
      obj["6_6_3"],
      obj["6_7_3"],
      obj["6_3_3"],
      obj["6_4_3"],
      obj["6_5_3"],
    ]);
    let n16 = sum([
      obj["6_1_4"],
      obj["6_6_4"],
      obj["6_7_4"],
      obj["6_3_4"],
      obj["6_4_4"],
      obj["6_5_4"],
    ]);
    let n17 = sum([
      obj["6_1_5"],
      obj["6_6_5"],
      obj["6_7_5"],
      obj["6_3_5"],
      obj["6_4_5"],
      obj["6_5_5"],
    ]);
    let n18 = sum([
      obj["6_1_6"],
      obj["6_6_6"],
      obj["6_7_6"],
      obj["6_3_6"],
      obj["6_4_6"],
      obj["6_5_6"],
    ]);
    let p12 = sum([p19, p26, p33, p40, p47, p54]);
    let p13 = sum([
      obj["7_1_1"],
      obj["7_6_1"],
      obj["7_7_1"],
      obj["7_3_1"],
      obj["7_4_1"],
      obj["7_5_1"],
    ]);
    let p14 = sum([
      obj["7_1_2"],
      obj["7_6_2"],
      obj["7_7_2"],
      obj["7_3_2"],
      obj["7_4_2"],
      obj["7_5_2"],
    ]);
    let p15 = sum([
      obj["7_1_3"],
      obj["7_6_3"],
      obj["7_7_3"],
      obj["7_3_3"],
      obj["7_4_3"],
      obj["7_5_3"],
    ]);
    let p16 = sum([
      obj["7_1_4"],
      obj["7_6_4"],
      obj["7_7_4"],
      obj["7_3_4"],
      obj["7_4_4"],
      obj["7_5_4"],
    ]);
    let p17 = sum([
      obj["7_1_5"],
      obj["7_6_5"],
      obj["7_7_5"],
      obj["7_3_5"],
      obj["7_4_5"],
      obj["7_5_5"],
    ]);
    let p18 = sum([
      obj["7_1_6"],
      obj["7_6_6"],
      obj["7_7_6"],
      obj["7_3_6"],
      obj["7_4_6"],
      obj["7_5_6"],
    ]);
    let r12 = sum([r19, r26, r33, r40, r47, r54]);
    let r13 = sum([
      obj["8_1_1"],
      obj["8_6_1"],
      obj["8_7_1"],
      obj["8_3_1"],
      obj["8_4_1"],
      obj["8_5_1"],
    ]);
    let r14 = sum([
      obj["8_1_2"],
      obj["8_6_2"],
      obj["8_7_2"],
      obj["8_3_2"],
      obj["8_4_2"],
      obj["8_5_2"],
    ]);
    let r15 = sum([
      obj["8_1_3"],
      obj["8_6_3"],
      obj["8_7_3"],
      obj["8_3_3"],
      obj["8_4_3"],
      obj["8_5_3"],
    ]);
    let r16 = sum([
      obj["8_1_4"],
      obj["8_6_4"],
      obj["8_7_4"],
      obj["8_3_4"],
      obj["8_4_4"],
      obj["8_5_4"],
    ]);
    let r17 = sum([
      obj["8_1_5"],
      obj["8_6_5"],
      obj["8_7_5"],
      obj["8_3_5"],
      obj["8_4_5"],
      obj["8_5_5"],
    ]);
    let r18 = sum([
      obj["8_1_6"],
      obj["8_6_6"],
      obj["8_7_6"],
      obj["8_3_6"],
      obj["8_4_6"],
      obj["8_5_6"],
    ]);
    let t12 = sum([t19, t26, t33, t40, t47, t54]);
    let t13 = sum([
      obj["9_1_1"],
      obj["9_6_1"],
      obj["9_7_1"],
      obj["9_3_1"],
      obj["9_4_1"],
      obj["9_5_1"],
    ]);
    let t14 = sum([
      obj["9_1_2"],
      obj["9_6_2"],
      obj["9_7_2"],
      obj["9_3_2"],
      obj["9_4_2"],
      obj["9_5_2"],
    ]);
    let t15 = sum([
      obj["9_1_3"],
      obj["9_6_3"],
      obj["9_7_3"],
      obj["9_3_3"],
      obj["9_4_3"],
      obj["9_5_3"],
    ]);
    let t16 = sum([
      obj["9_1_4"],
      obj["9_6_4"],
      obj["9_7_4"],
      obj["9_3_4"],
      obj["9_4_4"],
      obj["9_5_4"],
    ]);
    let t17 = sum([
      obj["9_1_5"],
      obj["9_6_5"],
      obj["9_7_5"],
      obj["9_3_5"],
      obj["9_4_5"],
      obj["9_5_5"],
    ]);
    let t18 = sum([
      obj["9_1_6"],
      obj["9_6_6"],
      obj["9_7_6"],
      obj["9_3_6"],
      obj["9_4_6"],
      obj["9_5_6"],
    ]);
    let v12 = sum([v19, v26, v33, v40, v47, v54]);
    let v13 = sum([
      obj["10_1_1"],
      obj["10_6_1"],
      obj["10_7_1"],
      obj["10_3_1"],
      obj["10_4_1"],
      obj["10_5_1"],
    ]);
    let v14 = sum([
      obj["10_1_2"],
      obj["10_6_2"],
      obj["10_7_2"],
      obj["10_3_2"],
      obj["10_4_2"],
      obj["10_5_2"],
    ]);
    let v15 = sum([
      obj["10_1_3"],
      obj["10_6_3"],
      obj["10_7_3"],
      obj["10_3_3"],
      obj["10_4_3"],
      obj["10_5_3"],
    ]);
    let v16 = sum([
      obj["10_1_4"],
      obj["10_6_4"],
      obj["10_7_4"],
      obj["10_3_4"],
      obj["10_4_4"],
      obj["10_5_4"],
    ]);
    let v17 = sum([
      obj["10_1_5"],
      obj["10_6_5"],
      obj["10_7_5"],
      obj["10_3_5"],
      obj["10_4_5"],
      obj["10_5_5"],
    ]);
    let v18 = sum([
      obj["10_1_6"],
      obj["10_6_6"],
      obj["10_7_6"],
      obj["10_3_6"],
      obj["10_4_6"],
      obj["10_5_6"],
    ]);

    // a01 = total
    sh.getCell("B12").value = changeToDash(b12);
    sh.getCell("B13").value = changeToDash(b13);
    sh.getCell("B14").value = changeToDash(b14);
    sh.getCell("B15").value = changeToDash(b15);
    sh.getCell("B16").value = changeToDash(b16);
    sh.getCell("B17").value = changeToDash(b17);
    sh.getCell("B18").value = changeToDash(b18);
    sh.getCell("B19").value = changeToDash(b19);
    sh.getCell("B20").value = changeToDash(b20);
    sh.getCell("B21").value = changeToDash(b21);
    sh.getCell("B22").value = changeToDash(b22);
    sh.getCell("B23").value = changeToDash(b23);
    sh.getCell("B24").value = changeToDash(b24);
    sh.getCell("B25").value = changeToDash(b25);
    sh.getCell("B26").value = changeToDash(b26);
    sh.getCell("B27").value = changeToDash(b27);
    sh.getCell("B28").value = changeToDash(b28);
    sh.getCell("B29").value = changeToDash(b29);
    sh.getCell("B30").value = changeToDash(b30);
    sh.getCell("B31").value = changeToDash(b31);
    sh.getCell("B32").value = changeToDash(b32);
    sh.getCell("B33").value = changeToDash(b33);
    sh.getCell("B34").value = changeToDash(b34);
    sh.getCell("B35").value = changeToDash(b35);
    sh.getCell("B36").value = changeToDash(b36);
    sh.getCell("B37").value = changeToDash(b37);
    sh.getCell("B38").value = changeToDash(b38);
    sh.getCell("B39").value = changeToDash(b39);
    sh.getCell("B40").value = changeToDash(b40);
    sh.getCell("B41").value = changeToDash(b41);
    sh.getCell("B42").value = changeToDash(b42);
    sh.getCell("B43").value = changeToDash(b43);
    sh.getCell("B44").value = changeToDash(b44);
    sh.getCell("B45").value = changeToDash(b45);
    sh.getCell("B46").value = changeToDash(b46);
    sh.getCell("B47").value = changeToDash(b47);
    sh.getCell("B48").value = changeToDash(b48);
    sh.getCell("B49").value = changeToDash(b49);
    sh.getCell("B50").value = changeToDash(b50);
    sh.getCell("B51").value = changeToDash(b51);
    sh.getCell("B52").value = changeToDash(b52);
    sh.getCell("B53").value = changeToDash(b53);
    sh.getCell("B54").value = changeToDash(b54);
    sh.getCell("B55").value = changeToDash(b55);
    sh.getCell("B56").value = changeToDash(b56);
    sh.getCell("B57").value = changeToDash(b57);
    sh.getCell("B58").value = changeToDash(b58);
    sh.getCell("B59").value = changeToDash(b59);
    sh.getCell("B60").value = changeToDash(b60);

    //a01 = 1
    sh.getCell("D12").value = changeToDash(d12);
    sh.getCell("D13").value = changeToDash(d13);
    sh.getCell("D14").value = changeToDash(d14);
    sh.getCell("D15").value = changeToDash(d15);
    sh.getCell("D16").value = changeToDash(d16);
    sh.getCell("D17").value = changeToDash(d17);
    sh.getCell("D18").value = changeToDash(d18);
    sh.getCell("D19").value = changeToDash(d19);
    sh.getCell("D20").value = changeToDash(obj["1_1_1"]);
    sh.getCell("D21").value = changeToDash(obj["1_1_2"]);
    sh.getCell("D22").value = changeToDash(obj["1_1_3"]);
    sh.getCell("D23").value = changeToDash(obj["1_1_4"]);
    sh.getCell("D24").value = changeToDash(obj["1_1_5"]);
    sh.getCell("D25").value = changeToDash(obj["1_1_6"]);
    sh.getCell("D26").value = changeToDash(d26);
    sh.getCell("D27").value = changeToDash(obj["1_6_1"]);
    sh.getCell("D28").value = changeToDash(obj["1_6_2"]);
    sh.getCell("D29").value = changeToDash(obj["1_6_3"]);
    sh.getCell("D30").value = changeToDash(obj["1_6_4"]);
    sh.getCell("D31").value = changeToDash(obj["1_6_5"]);
    sh.getCell("D32").value = changeToDash(obj["1_6_6"]);
    sh.getCell("D33").value = changeToDash(d33);
    sh.getCell("D34").value = changeToDash(obj["1_7_1"]);
    sh.getCell("D35").value = changeToDash(obj["1_7_2"]);
    sh.getCell("D36").value = changeToDash(obj["1_7_3"]);
    sh.getCell("D37").value = changeToDash(obj["1_7_4"]);
    sh.getCell("D38").value = changeToDash(obj["1_7_5"]);
    sh.getCell("D39").value = changeToDash(obj["1_7_6"]);
    sh.getCell("D40").value = changeToDash(d40);
    sh.getCell("D41").value = changeToDash(obj["1_3_1"]);
    sh.getCell("D42").value = changeToDash(obj["1_3_2"]);
    sh.getCell("D43").value = changeToDash(obj["1_3_3"]);
    sh.getCell("D44").value = changeToDash(obj["1_3_4"]);
    sh.getCell("D45").value = changeToDash(obj["1_3_5"]);
    sh.getCell("D46").value = changeToDash(obj["1_3_6"]);
    sh.getCell("D47").value = changeToDash(d47);
    sh.getCell("D48").value = changeToDash(obj["1_4_1"]);
    sh.getCell("D49").value = changeToDash(obj["1_4_2"]);
    sh.getCell("D50").value = changeToDash(obj["1_4_3"]);
    sh.getCell("D51").value = changeToDash(obj["1_4_4"]);
    sh.getCell("D52").value = changeToDash(obj["1_4_5"]);
    sh.getCell("D53").value = changeToDash(obj["1_4_6"]);
    sh.getCell("D54").value = changeToDash(d54);
    sh.getCell("D55").value = changeToDash(obj["1_5_1"]);
    sh.getCell("D56").value = changeToDash(obj["1_5_2"]);
    sh.getCell("D57").value = changeToDash(obj["1_5_3"]);
    sh.getCell("D58").value = changeToDash(obj["1_5_4"]);
    sh.getCell("D59").value = changeToDash(obj["1_5_5"]);
    sh.getCell("D60").value = changeToDash(obj["1_5_6"]);

    //a01 = 2
    sh.getCell("F12").value = changeToDash(f12);
    sh.getCell("F13").value = changeToDash(f13);
    sh.getCell("F14").value = changeToDash(f14);
    sh.getCell("F15").value = changeToDash(f15);
    sh.getCell("F16").value = changeToDash(f16);
    sh.getCell("F17").value = changeToDash(f17);
    sh.getCell("F18").value = changeToDash(f18);
    sh.getCell("F19").value = changeToDash(f19);
    sh.getCell("F20").value = changeToDash(obj["2_1_1"]);
    sh.getCell("F21").value = changeToDash(obj["2_1_2"]);
    sh.getCell("F22").value = changeToDash(obj["2_1_3"]);
    sh.getCell("F23").value = changeToDash(obj["2_1_4"]);
    sh.getCell("F24").value = changeToDash(obj["2_1_5"]);
    sh.getCell("F25").value = changeToDash(obj["2_1_6"]);
    sh.getCell("F26").value = changeToDash(f26);
    sh.getCell("F27").value = changeToDash(obj["2_6_1"]);
    sh.getCell("F28").value = changeToDash(obj["2_6_2"]);
    sh.getCell("F29").value = changeToDash(obj["2_6_3"]);
    sh.getCell("F30").value = changeToDash(obj["2_6_4"]);
    sh.getCell("F31").value = changeToDash(obj["2_6_5"]);
    sh.getCell("F32").value = changeToDash(obj["2_6_6"]);
    sh.getCell("F33").value = changeToDash(f33);
    sh.getCell("F34").value = changeToDash(obj["2_7_1"]);
    sh.getCell("F35").value = changeToDash(obj["2_7_2"]);
    sh.getCell("F36").value = changeToDash(obj["2_7_3"]);
    sh.getCell("F37").value = changeToDash(obj["2_7_4"]);
    sh.getCell("F38").value = changeToDash(obj["2_7_5"]);
    sh.getCell("F39").value = changeToDash(obj["2_7_6"]);
    sh.getCell("F40").value = changeToDash(f40);
    sh.getCell("F41").value = changeToDash(obj["2_3_1"]);
    sh.getCell("F42").value = changeToDash(obj["2_3_2"]);
    sh.getCell("F43").value = changeToDash(obj["2_3_3"]);
    sh.getCell("F44").value = changeToDash(obj["2_3_4"]);
    sh.getCell("F45").value = changeToDash(obj["2_3_5"]);
    sh.getCell("F46").value = changeToDash(obj["2_3_6"]);
    sh.getCell("F47").value = changeToDash(f47);
    sh.getCell("F48").value = changeToDash(obj["2_4_1"]);
    sh.getCell("F49").value = changeToDash(obj["2_4_2"]);
    sh.getCell("F50").value = changeToDash(obj["2_4_3"]);
    sh.getCell("F51").value = changeToDash(obj["2_4_4"]);
    sh.getCell("F52").value = changeToDash(obj["2_4_5"]);
    sh.getCell("F53").value = changeToDash(obj["2_4_6"]);
    sh.getCell("F54").value = changeToDash(f54);
    sh.getCell("F55").value = changeToDash(obj["2_5_1"]);
    sh.getCell("F56").value = changeToDash(obj["2_5_2"]);
    sh.getCell("F57").value = changeToDash(obj["2_5_3"]);
    sh.getCell("F58").value = changeToDash(obj["2_5_4"]);
    sh.getCell("F59").value = changeToDash(obj["2_5_5"]);
    sh.getCell("F60").value = changeToDash(obj["2_5_6"]);

    //a01 = 3
    sh.getCell("H12").value = changeToDash(h12);
    sh.getCell("H13").value = changeToDash(h13);
    sh.getCell("H14").value = changeToDash(h14);
    sh.getCell("H15").value = changeToDash(h15);
    sh.getCell("H16").value = changeToDash(h16);
    sh.getCell("H17").value = changeToDash(h17);
    sh.getCell("H18").value = changeToDash(h18);
    sh.getCell("H19").value = changeToDash(h19);
    sh.getCell("H20").value = changeToDash(obj["3_1_1"]);
    sh.getCell("H21").value = changeToDash(obj["3_1_2"]);
    sh.getCell("H22").value = changeToDash(obj["3_1_3"]);
    sh.getCell("H23").value = changeToDash(obj["3_1_4"]);
    sh.getCell("H24").value = changeToDash(obj["3_1_5"]);
    sh.getCell("H25").value = changeToDash(obj["3_1_6"]);
    sh.getCell("H26").value = changeToDash(h26);
    sh.getCell("H27").value = changeToDash(obj["3_6_1"]);
    sh.getCell("H28").value = changeToDash(obj["3_6_2"]);
    sh.getCell("H29").value = changeToDash(obj["3_6_3"]);
    sh.getCell("H30").value = changeToDash(obj["3_6_4"]);
    sh.getCell("H31").value = changeToDash(obj["3_6_5"]);
    sh.getCell("H32").value = changeToDash(obj["3_6_6"]);
    sh.getCell("H33").value = changeToDash(h33);
    sh.getCell("H34").value = changeToDash(obj["3_7_1"]);
    sh.getCell("H35").value = changeToDash(obj["3_7_2"]);
    sh.getCell("H36").value = changeToDash(obj["3_7_3"]);
    sh.getCell("H37").value = changeToDash(obj["3_7_4"]);
    sh.getCell("H38").value = changeToDash(obj["3_7_5"]);
    sh.getCell("H39").value = changeToDash(obj["3_7_6"]);
    sh.getCell("H40").value = changeToDash(h40);
    sh.getCell("H41").value = changeToDash(obj["3_3_1"]);
    sh.getCell("H42").value = changeToDash(obj["3_3_2"]);
    sh.getCell("H43").value = changeToDash(obj["3_3_3"]);
    sh.getCell("H44").value = changeToDash(obj["3_3_4"]);
    sh.getCell("H45").value = changeToDash(obj["3_3_5"]);
    sh.getCell("H46").value = changeToDash(obj["3_3_6"]);
    sh.getCell("H47").value = changeToDash(h47);
    sh.getCell("H48").value = changeToDash(obj["3_4_1"]);
    sh.getCell("H49").value = changeToDash(obj["3_4_2"]);
    sh.getCell("H50").value = changeToDash(obj["3_4_3"]);
    sh.getCell("H51").value = changeToDash(obj["3_4_4"]);
    sh.getCell("H52").value = changeToDash(obj["3_4_5"]);
    sh.getCell("H53").value = changeToDash(obj["3_4_6"]);
    sh.getCell("H54").value = changeToDash(h54);
    sh.getCell("H55").value = changeToDash(obj["3_5_1"]);
    sh.getCell("H56").value = changeToDash(obj["3_5_2"]);
    sh.getCell("H57").value = changeToDash(obj["3_5_3"]);
    sh.getCell("H58").value = changeToDash(obj["3_5_4"]);
    sh.getCell("H59").value = changeToDash(obj["3_5_5"]);
    sh.getCell("H60").value = changeToDash(obj["3_5_6"]);

    //a01 = 4
    sh.getCell("J12").value = changeToDash(j12);
    sh.getCell("J13").value = changeToDash(j13);
    sh.getCell("J14").value = changeToDash(j14);
    sh.getCell("J15").value = changeToDash(j15);
    sh.getCell("J16").value = changeToDash(j16);
    sh.getCell("J17").value = changeToDash(j17);
    sh.getCell("J18").value = changeToDash(j18);
    sh.getCell("J19").value = changeToDash(j19);
    sh.getCell("J20").value = changeToDash(obj["4_1_1"]);
    sh.getCell("J21").value = changeToDash(obj["4_1_2"]);
    sh.getCell("J22").value = changeToDash(obj["4_1_3"]);
    sh.getCell("J23").value = changeToDash(obj["4_1_4"]);
    sh.getCell("J24").value = changeToDash(obj["4_1_5"]);
    sh.getCell("J25").value = changeToDash(obj["4_1_6"]);
    sh.getCell("J26").value = changeToDash(j26);
    sh.getCell("J27").value = changeToDash(obj["4_6_1"]);
    sh.getCell("J28").value = changeToDash(obj["4_6_2"]);
    sh.getCell("J29").value = changeToDash(obj["4_6_3"]);
    sh.getCell("J30").value = changeToDash(obj["4_6_4"]);
    sh.getCell("J31").value = changeToDash(obj["4_6_5"]);
    sh.getCell("J32").value = changeToDash(obj["4_6_6"]);
    sh.getCell("J33").value = changeToDash(j33);
    sh.getCell("J34").value = changeToDash(obj["4_7_1"]);
    sh.getCell("J35").value = changeToDash(obj["4_7_2"]);
    sh.getCell("J36").value = changeToDash(obj["4_7_3"]);
    sh.getCell("J37").value = changeToDash(obj["4_7_4"]);
    sh.getCell("J38").value = changeToDash(obj["4_7_5"]);
    sh.getCell("J39").value = changeToDash(obj["4_7_6"]);
    sh.getCell("J40").value = changeToDash(j40);
    sh.getCell("J41").value = changeToDash(obj["4_3_1"]);
    sh.getCell("J42").value = changeToDash(obj["4_3_2"]);
    sh.getCell("J43").value = changeToDash(obj["4_3_3"]);
    sh.getCell("J44").value = changeToDash(obj["4_3_4"]);
    sh.getCell("J45").value = changeToDash(obj["4_3_5"]);
    sh.getCell("J46").value = changeToDash(obj["4_3_6"]);
    sh.getCell("J47").value = changeToDash(j47);
    sh.getCell("J48").value = changeToDash(obj["4_4_1"]);
    sh.getCell("J49").value = changeToDash(obj["4_4_2"]);
    sh.getCell("J50").value = changeToDash(obj["4_4_3"]);
    sh.getCell("J51").value = changeToDash(obj["4_4_4"]);
    sh.getCell("J52").value = changeToDash(obj["4_4_5"]);
    sh.getCell("J53").value = changeToDash(obj["4_4_6"]);
    sh.getCell("J54").value = changeToDash(j54);
    sh.getCell("J55").value = changeToDash(obj["4_5_1"]);
    sh.getCell("J56").value = changeToDash(obj["4_5_2"]);
    sh.getCell("J57").value = changeToDash(obj["4_5_3"]);
    sh.getCell("J58").value = changeToDash(obj["4_5_4"]);
    sh.getCell("J59").value = changeToDash(obj["4_5_5"]);
    sh.getCell("J60").value = changeToDash(obj["4_5_6"]);

    //a01 = 5
    sh.getCell("L12").value = changeToDash(l12);
    sh.getCell("L13").value = changeToDash(l13);
    sh.getCell("L14").value = changeToDash(l14);
    sh.getCell("L15").value = changeToDash(l15);
    sh.getCell("L16").value = changeToDash(l16);
    sh.getCell("L17").value = changeToDash(l17);
    sh.getCell("L18").value = changeToDash(l18);
    sh.getCell("L19").value = changeToDash(l19);
    sh.getCell("L20").value = changeToDash(obj["5_1_1"]);
    sh.getCell("L21").value = changeToDash(obj["5_1_2"]);
    sh.getCell("L22").value = changeToDash(obj["5_1_3"]);
    sh.getCell("L23").value = changeToDash(obj["5_1_4"]);
    sh.getCell("L24").value = changeToDash(obj["5_1_5"]);
    sh.getCell("L25").value = changeToDash(obj["5_1_6"]);
    sh.getCell("L26").value = changeToDash(l26);
    sh.getCell("L27").value = changeToDash(obj["5_6_1"]);
    sh.getCell("L28").value = changeToDash(obj["5_6_2"]);
    sh.getCell("L29").value = changeToDash(obj["5_6_3"]);
    sh.getCell("L30").value = changeToDash(obj["5_6_4"]);
    sh.getCell("L31").value = changeToDash(obj["5_6_5"]);
    sh.getCell("L32").value = changeToDash(obj["5_6_6"]);
    sh.getCell("L33").value = changeToDash(l33);
    sh.getCell("L34").value = changeToDash(obj["5_7_1"]);
    sh.getCell("L35").value = changeToDash(obj["5_7_2"]);
    sh.getCell("L36").value = changeToDash(obj["5_7_3"]);
    sh.getCell("L37").value = changeToDash(obj["5_7_4"]);
    sh.getCell("L38").value = changeToDash(obj["5_7_5"]);
    sh.getCell("L39").value = changeToDash(obj["5_7_6"]);
    sh.getCell("L40").value = changeToDash(l40);
    sh.getCell("L41").value = changeToDash(obj["5_3_1"]);
    sh.getCell("L42").value = changeToDash(obj["5_3_2"]);
    sh.getCell("L43").value = changeToDash(obj["5_3_3"]);
    sh.getCell("L44").value = changeToDash(obj["5_3_4"]);
    sh.getCell("L45").value = changeToDash(obj["5_3_5"]);
    sh.getCell("L46").value = changeToDash(obj["5_3_6"]);
    sh.getCell("L47").value = changeToDash(l47);
    sh.getCell("L48").value = changeToDash(obj["5_4_1"]);
    sh.getCell("L49").value = changeToDash(obj["5_4_2"]);
    sh.getCell("L50").value = changeToDash(obj["5_4_3"]);
    sh.getCell("L51").value = changeToDash(obj["5_4_4"]);
    sh.getCell("L52").value = changeToDash(obj["5_4_5"]);
    sh.getCell("L53").value = changeToDash(obj["5_4_6"]);
    sh.getCell("L54").value = changeToDash(l54);
    sh.getCell("L55").value = changeToDash(obj["5_5_1"]);
    sh.getCell("L56").value = changeToDash(obj["5_5_2"]);
    sh.getCell("L57").value = changeToDash(obj["5_5_3"]);
    sh.getCell("L58").value = changeToDash(obj["5_5_4"]);
    sh.getCell("L59").value = changeToDash(obj["5_5_5"]);
    sh.getCell("L60").value = changeToDash(obj["5_5_6"]);

    //a01 = 6
    sh.getCell("N12").value = changeToDash(n12);
    sh.getCell("N13").value = changeToDash(n13);
    sh.getCell("N14").value = changeToDash(n14);
    sh.getCell("N15").value = changeToDash(n15);
    sh.getCell("N16").value = changeToDash(n16);
    sh.getCell("N17").value = changeToDash(n17);
    sh.getCell("N18").value = changeToDash(n18);
    sh.getCell("N19").value = changeToDash(n19);
    sh.getCell("N20").value = changeToDash(obj["6_1_1"]);
    sh.getCell("N21").value = changeToDash(obj["6_1_2"]);
    sh.getCell("N22").value = changeToDash(obj["6_1_3"]);
    sh.getCell("N23").value = changeToDash(obj["6_1_4"]);
    sh.getCell("N24").value = changeToDash(obj["6_1_5"]);
    sh.getCell("N25").value = changeToDash(obj["6_1_6"]);
    sh.getCell("N26").value = changeToDash(n26);
    sh.getCell("N27").value = changeToDash(obj["6_6_1"]);
    sh.getCell("N28").value = changeToDash(obj["6_6_2"]);
    sh.getCell("N29").value = changeToDash(obj["6_6_3"]);
    sh.getCell("N30").value = changeToDash(obj["6_6_4"]);
    sh.getCell("N31").value = changeToDash(obj["6_6_5"]);
    sh.getCell("N32").value = changeToDash(obj["6_6_6"]);
    sh.getCell("N33").value = changeToDash(n33);
    sh.getCell("N34").value = changeToDash(obj["6_7_1"]);
    sh.getCell("N35").value = changeToDash(obj["6_7_2"]);
    sh.getCell("N36").value = changeToDash(obj["6_7_3"]);
    sh.getCell("N37").value = changeToDash(obj["6_7_4"]);
    sh.getCell("N38").value = changeToDash(obj["6_7_5"]);
    sh.getCell("N39").value = changeToDash(obj["6_7_6"]);
    sh.getCell("N40").value = changeToDash(n40);
    sh.getCell("N41").value = changeToDash(obj["6_3_1"]);
    sh.getCell("N42").value = changeToDash(obj["6_3_2"]);
    sh.getCell("N43").value = changeToDash(obj["6_3_3"]);
    sh.getCell("N44").value = changeToDash(obj["6_3_4"]);
    sh.getCell("N45").value = changeToDash(obj["6_3_5"]);
    sh.getCell("N46").value = changeToDash(obj["6_3_6"]);
    sh.getCell("N47").value = changeToDash(n47);
    sh.getCell("N48").value = changeToDash(obj["6_4_1"]);
    sh.getCell("N49").value = changeToDash(obj["6_4_2"]);
    sh.getCell("N50").value = changeToDash(obj["6_4_3"]);
    sh.getCell("N51").value = changeToDash(obj["6_4_4"]);
    sh.getCell("N52").value = changeToDash(obj["6_4_5"]);
    sh.getCell("N53").value = changeToDash(obj["6_4_6"]);
    sh.getCell("N54").value = changeToDash(n54);
    sh.getCell("N55").value = changeToDash(obj["6_5_1"]);
    sh.getCell("N56").value = changeToDash(obj["6_5_2"]);
    sh.getCell("N57").value = changeToDash(obj["6_5_3"]);
    sh.getCell("N58").value = changeToDash(obj["6_5_4"]);
    sh.getCell("N59").value = changeToDash(obj["6_5_5"]);
    sh.getCell("N60").value = changeToDash(obj["6_5_6"]);

    //a01 = 7
    sh.getCell("P12").value = changeToDash(p12);
    sh.getCell("P13").value = changeToDash(p13);
    sh.getCell("P14").value = changeToDash(p14);
    sh.getCell("P15").value = changeToDash(p15);
    sh.getCell("P16").value = changeToDash(p16);
    sh.getCell("P17").value = changeToDash(p17);
    sh.getCell("P18").value = changeToDash(p18);
    sh.getCell("P19").value = changeToDash(p19);
    sh.getCell("P20").value = changeToDash(obj["7_1_1"]);
    sh.getCell("P21").value = changeToDash(obj["7_1_2"]);
    sh.getCell("P22").value = changeToDash(obj["7_1_3"]);
    sh.getCell("P23").value = changeToDash(obj["7_1_4"]);
    sh.getCell("P24").value = changeToDash(obj["7_1_5"]);
    sh.getCell("P25").value = changeToDash(obj["7_1_6"]);
    sh.getCell("P26").value = changeToDash(p26);
    sh.getCell("P27").value = changeToDash(obj["7_6_1"]);
    sh.getCell("P28").value = changeToDash(obj["7_6_2"]);
    sh.getCell("P29").value = changeToDash(obj["7_6_3"]);
    sh.getCell("P30").value = changeToDash(obj["7_6_4"]);
    sh.getCell("P31").value = changeToDash(obj["7_6_5"]);
    sh.getCell("P32").value = changeToDash(obj["7_6_6"]);
    sh.getCell("P33").value = changeToDash(p33);
    sh.getCell("P34").value = changeToDash(obj["7_7_1"]);
    sh.getCell("P35").value = changeToDash(obj["7_7_2"]);
    sh.getCell("P36").value = changeToDash(obj["7_7_3"]);
    sh.getCell("P37").value = changeToDash(obj["7_7_4"]);
    sh.getCell("P38").value = changeToDash(obj["7_7_5"]);
    sh.getCell("P39").value = changeToDash(obj["7_7_6"]);
    sh.getCell("P40").value = changeToDash(p40);
    sh.getCell("P41").value = changeToDash(obj["7_3_1"]);
    sh.getCell("P42").value = changeToDash(obj["7_3_2"]);
    sh.getCell("P43").value = changeToDash(obj["7_3_3"]);
    sh.getCell("P44").value = changeToDash(obj["7_3_4"]);
    sh.getCell("P45").value = changeToDash(obj["7_3_5"]);
    sh.getCell("P46").value = changeToDash(obj["7_3_6"]);
    sh.getCell("P47").value = changeToDash(p47);
    sh.getCell("P48").value = changeToDash(obj["7_4_1"]);
    sh.getCell("P49").value = changeToDash(obj["7_4_2"]);
    sh.getCell("P50").value = changeToDash(obj["7_4_3"]);
    sh.getCell("P51").value = changeToDash(obj["7_4_4"]);
    sh.getCell("P52").value = changeToDash(obj["7_4_5"]);
    sh.getCell("P53").value = changeToDash(obj["7_4_6"]);
    sh.getCell("P54").value = changeToDash(p54);
    sh.getCell("P55").value = changeToDash(obj["7_5_1"]);
    sh.getCell("P56").value = changeToDash(obj["7_5_2"]);
    sh.getCell("P57").value = changeToDash(obj["7_5_3"]);
    sh.getCell("P58").value = changeToDash(obj["7_5_4"]);
    sh.getCell("P59").value = changeToDash(obj["7_5_5"]);
    sh.getCell("P60").value = changeToDash(obj["7_5_6"]);

    //a01 = 8
    sh.getCell("R12").value = changeToDash(r12);
    sh.getCell("R13").value = changeToDash(r13);
    sh.getCell("R14").value = changeToDash(r14);
    sh.getCell("R15").value = changeToDash(r15);
    sh.getCell("R16").value = changeToDash(r16);
    sh.getCell("R17").value = changeToDash(r17);
    sh.getCell("R18").value = changeToDash(r18);
    sh.getCell("R19").value = changeToDash(r19);
    sh.getCell("R20").value = changeToDash(obj["8_1_1"]);
    sh.getCell("R21").value = changeToDash(obj["8_1_2"]);
    sh.getCell("R22").value = changeToDash(obj["8_1_3"]);
    sh.getCell("R23").value = changeToDash(obj["8_1_4"]);
    sh.getCell("R24").value = changeToDash(obj["8_1_5"]);
    sh.getCell("R25").value = changeToDash(obj["8_1_6"]);
    sh.getCell("R26").value = changeToDash(r26);
    sh.getCell("R27").value = changeToDash(obj["8_6_1"]);
    sh.getCell("R28").value = changeToDash(obj["8_6_2"]);
    sh.getCell("R29").value = changeToDash(obj["8_6_3"]);
    sh.getCell("R30").value = changeToDash(obj["8_6_4"]);
    sh.getCell("R31").value = changeToDash(obj["8_6_5"]);
    sh.getCell("R32").value = changeToDash(obj["8_6_6"]);
    sh.getCell("R33").value = changeToDash(r33);
    sh.getCell("R34").value = changeToDash(obj["8_7_1"]);
    sh.getCell("R35").value = changeToDash(obj["8_7_2"]);
    sh.getCell("R36").value = changeToDash(obj["8_7_3"]);
    sh.getCell("R37").value = changeToDash(obj["8_7_4"]);
    sh.getCell("R38").value = changeToDash(obj["8_7_5"]);
    sh.getCell("R39").value = changeToDash(obj["8_7_6"]);
    sh.getCell("R40").value = changeToDash(r40);
    sh.getCell("R41").value = changeToDash(obj["8_3_1"]);
    sh.getCell("R42").value = changeToDash(obj["8_3_2"]);
    sh.getCell("R43").value = changeToDash(obj["8_3_3"]);
    sh.getCell("R44").value = changeToDash(obj["8_3_4"]);
    sh.getCell("R45").value = changeToDash(obj["8_3_5"]);
    sh.getCell("R46").value = changeToDash(obj["8_3_6"]);
    sh.getCell("R47").value = changeToDash(r47);
    sh.getCell("R48").value = changeToDash(obj["8_4_1"]);
    sh.getCell("R49").value = changeToDash(obj["8_4_2"]);
    sh.getCell("R50").value = changeToDash(obj["8_4_3"]);
    sh.getCell("R51").value = changeToDash(obj["8_4_4"]);
    sh.getCell("R52").value = changeToDash(obj["8_4_5"]);
    sh.getCell("R53").value = changeToDash(obj["8_4_6"]);
    sh.getCell("R54").value = changeToDash(r54);
    sh.getCell("R55").value = changeToDash(obj["8_5_1"]);
    sh.getCell("R56").value = changeToDash(obj["8_5_2"]);
    sh.getCell("R57").value = changeToDash(obj["8_5_3"]);
    sh.getCell("R58").value = changeToDash(obj["8_5_4"]);
    sh.getCell("R59").value = changeToDash(obj["8_5_5"]);
    sh.getCell("R60").value = changeToDash(obj["8_5_6"]);

    //a01 = 9
    sh.getCell("T12").value = changeToDash(t12);
    sh.getCell("T13").value = changeToDash(t13);
    sh.getCell("T14").value = changeToDash(t14);
    sh.getCell("T15").value = changeToDash(t15);
    sh.getCell("T16").value = changeToDash(t16);
    sh.getCell("T17").value = changeToDash(t17);
    sh.getCell("T18").value = changeToDash(t18);
    sh.getCell("T19").value = changeToDash(t19);
    sh.getCell("T20").value = changeToDash(obj["9_1_1"]);
    sh.getCell("T21").value = changeToDash(obj["9_1_2"]);
    sh.getCell("T22").value = changeToDash(obj["9_1_3"]);
    sh.getCell("T23").value = changeToDash(obj["9_1_4"]);
    sh.getCell("T24").value = changeToDash(obj["9_1_5"]);
    sh.getCell("T25").value = changeToDash(obj["9_1_6"]);
    sh.getCell("T26").value = changeToDash(t26);
    sh.getCell("T27").value = changeToDash(obj["9_6_1"]);
    sh.getCell("T28").value = changeToDash(obj["9_6_2"]);
    sh.getCell("T29").value = changeToDash(obj["9_6_3"]);
    sh.getCell("T30").value = changeToDash(obj["9_6_4"]);
    sh.getCell("T31").value = changeToDash(obj["9_6_5"]);
    sh.getCell("T32").value = changeToDash(obj["9_6_6"]);
    sh.getCell("T33").value = changeToDash(t33);
    sh.getCell("T34").value = changeToDash(obj["9_7_1"]);
    sh.getCell("T35").value = changeToDash(obj["9_7_2"]);
    sh.getCell("T36").value = changeToDash(obj["9_7_3"]);
    sh.getCell("T37").value = changeToDash(obj["9_7_4"]);
    sh.getCell("T38").value = changeToDash(obj["9_7_5"]);
    sh.getCell("T39").value = changeToDash(obj["9_7_6"]);
    sh.getCell("T40").value = changeToDash(t40);
    sh.getCell("T41").value = changeToDash(obj["9_3_1"]);
    sh.getCell("T42").value = changeToDash(obj["9_3_2"]);
    sh.getCell("T43").value = changeToDash(obj["9_3_3"]);
    sh.getCell("T44").value = changeToDash(obj["9_3_4"]);
    sh.getCell("T45").value = changeToDash(obj["9_3_5"]);
    sh.getCell("T46").value = changeToDash(obj["9_3_6"]);
    sh.getCell("T47").value = changeToDash(t47);
    sh.getCell("T48").value = changeToDash(obj["9_4_1"]);
    sh.getCell("T49").value = changeToDash(obj["9_4_2"]);
    sh.getCell("T50").value = changeToDash(obj["9_4_3"]);
    sh.getCell("T51").value = changeToDash(obj["9_4_4"]);
    sh.getCell("T52").value = changeToDash(obj["9_4_5"]);
    sh.getCell("T53").value = changeToDash(obj["9_4_6"]);
    sh.getCell("T54").value = changeToDash(t54);
    sh.getCell("T55").value = changeToDash(obj["9_5_1"]);
    sh.getCell("T56").value = changeToDash(obj["9_5_2"]);
    sh.getCell("T57").value = changeToDash(obj["9_5_3"]);
    sh.getCell("T58").value = changeToDash(obj["9_5_4"]);
    sh.getCell("T59").value = changeToDash(obj["9_5_5"]);
    sh.getCell("T60").value = changeToDash(obj["9_5_6"]);

    //a01 = 10
    sh.getCell("V12").value = changeToDash(v12);
    sh.getCell("V13").value = changeToDash(v13);
    sh.getCell("V14").value = changeToDash(v14);
    sh.getCell("V15").value = changeToDash(v15);
    sh.getCell("V16").value = changeToDash(v16);
    sh.getCell("V17").value = changeToDash(v17);
    sh.getCell("V18").value = changeToDash(v18);
    sh.getCell("V19").value = changeToDash(v19);
    sh.getCell("V20").value = changeToDash(obj["10_1_1"]);
    sh.getCell("V21").value = changeToDash(obj["10_1_2"]);
    sh.getCell("V22").value = changeToDash(obj["10_1_3"]);
    sh.getCell("V23").value = changeToDash(obj["10_1_4"]);
    sh.getCell("V24").value = changeToDash(obj["10_1_5"]);
    sh.getCell("V25").value = changeToDash(obj["10_1_6"]);
    sh.getCell("V26").value = changeToDash(v26);
    sh.getCell("V27").value = changeToDash(obj["10_6_1"]);
    sh.getCell("V28").value = changeToDash(obj["10_6_2"]);
    sh.getCell("V29").value = changeToDash(obj["10_6_3"]);
    sh.getCell("V30").value = changeToDash(obj["10_6_4"]);
    sh.getCell("V31").value = changeToDash(obj["10_6_5"]);
    sh.getCell("V32").value = changeToDash(obj["10_6_6"]);
    sh.getCell("V33").value = changeToDash(v33);
    sh.getCell("V34").value = changeToDash(obj["10_7_1"]);
    sh.getCell("V35").value = changeToDash(obj["10_7_2"]);
    sh.getCell("V36").value = changeToDash(obj["10_7_3"]);
    sh.getCell("V37").value = changeToDash(obj["10_7_4"]);
    sh.getCell("V38").value = changeToDash(obj["10_7_5"]);
    sh.getCell("V39").value = changeToDash(obj["10_7_6"]);
    sh.getCell("V40").value = changeToDash(v40);
    sh.getCell("V41").value = changeToDash(obj["10_3_1"]);
    sh.getCell("V42").value = changeToDash(obj["10_3_2"]);
    sh.getCell("V43").value = changeToDash(obj["10_3_3"]);
    sh.getCell("V44").value = changeToDash(obj["10_3_4"]);
    sh.getCell("V45").value = changeToDash(obj["10_3_5"]);
    sh.getCell("V46").value = changeToDash(obj["10_3_6"]);
    sh.getCell("V47").value = changeToDash(v47);
    sh.getCell("V48").value = changeToDash(obj["10_4_1"]);
    sh.getCell("V49").value = changeToDash(obj["10_4_2"]);
    sh.getCell("V50").value = changeToDash(obj["10_4_3"]);
    sh.getCell("V51").value = changeToDash(obj["10_4_4"]);
    sh.getCell("V52").value = changeToDash(obj["10_4_5"]);
    sh.getCell("V53").value = changeToDash(obj["10_4_6"]);
    sh.getCell("V54").value = changeToDash(v54);
    sh.getCell("V55").value = changeToDash(obj["10_5_1"]);
    sh.getCell("V56").value = changeToDash(obj["10_5_2"]);
    sh.getCell("V57").value = changeToDash(obj["10_5_3"]);
    sh.getCell("V58").value = changeToDash(obj["10_5_4"]);
    sh.getCell("V59").value = changeToDash(obj["10_5_5"]);
    sh.getCell("V60").value = changeToDash(obj["10_5_6"]);

    // calculate percent
    // a01 =1
    sh.getCell("E12").value = changeToDash(
      calcPercentage(toNumber(d12), toNumber(b12))
    );
    sh.getCell("E13").value = changeToDash(
      calcPercentage(toNumber(d13), toNumber(b13))
    );
    sh.getCell("E14").value = changeToDash(
      calcPercentage(toNumber(d14), toNumber(b14))
    );
    sh.getCell("E15").value = changeToDash(
      calcPercentage(toNumber(d15), toNumber(b15))
    );
    sh.getCell("E16").value = changeToDash(
      calcPercentage(toNumber(d16), toNumber(b16))
    );
    sh.getCell("E17").value = changeToDash(
      calcPercentage(toNumber(d17), toNumber(b17))
    );
    sh.getCell("E18").value = changeToDash(
      calcPercentage(toNumber(d18), toNumber(b18))
    );
    sh.getCell("E19").value = changeToDash(
      calcPercentage(toNumber(d19), toNumber(b19))
    );
    sh.getCell("E20").value = changeToDash(
      calcPercentage(toNumber(obj["1_1_1"]), toNumber(b20))
    );
    sh.getCell("E21").value = changeToDash(
      calcPercentage(toNumber(obj["1_1_2"]), toNumber(b21))
    );
    sh.getCell("E22").value = changeToDash(
      calcPercentage(toNumber(obj["1_1_3"]), toNumber(b22))
    );
    sh.getCell("E23").value = changeToDash(
      calcPercentage(toNumber(obj["1_1_4"]), toNumber(b23))
    );
    sh.getCell("E24").value = changeToDash(
      calcPercentage(toNumber(obj["1_1_5"]), toNumber(b24))
    );
    sh.getCell("E25").value = changeToDash(
      calcPercentage(toNumber(obj["1_1_6"]), toNumber(b25))
    );
    sh.getCell("E26").value = changeToDash(
      calcPercentage(toNumber(d26), toNumber(b26))
    );
    sh.getCell("E27").value = changeToDash(
      calcPercentage(toNumber(obj["1_6_1"]), toNumber(b27))
    );
    sh.getCell("E28").value = changeToDash(
      calcPercentage(toNumber(obj["1_6_2"]), toNumber(b28))
    );
    sh.getCell("E29").value = changeToDash(
      calcPercentage(toNumber(obj["1_6_3"]), toNumber(b29))
    );
    sh.getCell("E30").value = changeToDash(
      calcPercentage(toNumber(obj["1_6_4"]), toNumber(b30))
    );
    sh.getCell("E31").value = changeToDash(
      calcPercentage(toNumber(obj["1_6_5"]), toNumber(b31))
    );
    sh.getCell("E32").value = changeToDash(
      calcPercentage(toNumber(obj["1_6_6"]), toNumber(b32))
    );
    sh.getCell("E33").value = changeToDash(
      calcPercentage(toNumber(d33), toNumber(b33))
    );
    sh.getCell("E34").value = changeToDash(
      calcPercentage(toNumber(obj["1_7_1"]), toNumber(b34))
    );
    sh.getCell("E35").value = changeToDash(
      calcPercentage(toNumber(obj["1_7_2"]), toNumber(b35))
    );
    sh.getCell("E36").value = changeToDash(
      calcPercentage(toNumber(obj["1_7_3"]), toNumber(b36))
    );
    sh.getCell("E37").value = changeToDash(
      calcPercentage(toNumber(obj["1_7_4"]), toNumber(b37))
    );
    sh.getCell("E38").value = changeToDash(
      calcPercentage(toNumber(obj["1_7_5"]), toNumber(b38))
    );
    sh.getCell("E39").value = changeToDash(
      calcPercentage(toNumber(obj["1_7_6"]), toNumber(b39))
    );
    sh.getCell("E40").value = changeToDash(
      calcPercentage(toNumber(d40), toNumber(b40))
    );
    sh.getCell("E41").value = changeToDash(
      calcPercentage(toNumber(obj["1_3_1"]), toNumber(b41))
    );
    sh.getCell("E42").value = changeToDash(
      calcPercentage(toNumber(obj["1_3_2"]), toNumber(b42))
    );
    sh.getCell("E43").value = changeToDash(
      calcPercentage(toNumber(obj["1_3_3"]), toNumber(b43))
    );
    sh.getCell("E44").value = changeToDash(
      calcPercentage(toNumber(obj["1_3_4"]), toNumber(b44))
    );
    sh.getCell("E45").value = changeToDash(
      calcPercentage(toNumber(obj["1_3_5"]), toNumber(b45))
    );
    sh.getCell("E46").value = changeToDash(
      calcPercentage(toNumber(obj["1_3_6"]), toNumber(b46))
    );
    sh.getCell("E47").value = changeToDash(
      calcPercentage(toNumber(d47), toNumber(b47))
    );
    sh.getCell("E48").value = changeToDash(
      calcPercentage(toNumber(obj["1_4_1"]), toNumber(b48))
    );
    sh.getCell("E49").value = changeToDash(
      calcPercentage(toNumber(obj["1_4_2"]), toNumber(b49))
    );
    sh.getCell("E50").value = changeToDash(
      calcPercentage(toNumber(obj["1_4_3"]), toNumber(b50))
    );
    sh.getCell("E51").value = changeToDash(
      calcPercentage(toNumber(obj["1_4_4"]), toNumber(b51))
    );
    sh.getCell("E52").value = changeToDash(
      calcPercentage(toNumber(obj["1_4_5"]), toNumber(b52))
    );
    sh.getCell("E53").value = changeToDash(
      calcPercentage(toNumber(obj["1_4_6"]), toNumber(b53))
    );
    sh.getCell("E54").value = changeToDash(
      calcPercentage(toNumber(d54), toNumber(b54))
    );
    sh.getCell("E55").value = changeToDash(
      calcPercentage(toNumber(obj["1_5_1"]), toNumber(b55))
    );
    sh.getCell("E56").value = changeToDash(
      calcPercentage(toNumber(obj["1_5_2"]), toNumber(b56))
    );
    sh.getCell("E57").value = changeToDash(
      calcPercentage(toNumber(obj["1_5_3"]), toNumber(b57))
    );
    sh.getCell("E58").value = changeToDash(
      calcPercentage(toNumber(obj["1_5_4"]), toNumber(b58))
    );
    sh.getCell("E59").value = changeToDash(
      calcPercentage(toNumber(obj["1_5_5"]), toNumber(b59))
    );
    sh.getCell("E60").value = changeToDash(
      calcPercentage(toNumber(obj["1_5_6"]), toNumber(b60))
    );
    // a01 = 2
    sh.getCell("G12").value = changeToDash(
      calcPercentage(toNumber(f12), toNumber(b12))
    );
    sh.getCell("G13").value = changeToDash(
      calcPercentage(toNumber(f13), toNumber(b13))
    );
    sh.getCell("G14").value = changeToDash(
      calcPercentage(toNumber(f14), toNumber(b14))
    );
    sh.getCell("G15").value = changeToDash(
      calcPercentage(toNumber(f15), toNumber(b15))
    );
    sh.getCell("G16").value = changeToDash(
      calcPercentage(toNumber(f16), toNumber(b16))
    );
    sh.getCell("G17").value = changeToDash(
      calcPercentage(toNumber(f17), toNumber(b17))
    );
    sh.getCell("G18").value = changeToDash(
      calcPercentage(toNumber(f18), toNumber(b18))
    );
    sh.getCell("G19").value = changeToDash(
      calcPercentage(toNumber(f19), toNumber(b19))
    );
    sh.getCell("G20").value = changeToDash(
      calcPercentage(toNumber(obj["2_1_1"]), toNumber(b20))
    );
    sh.getCell("G21").value = changeToDash(
      calcPercentage(toNumber(obj["2_1_2"]), toNumber(b21))
    );
    sh.getCell("G22").value = changeToDash(
      calcPercentage(toNumber(obj["2_1_3"]), toNumber(b22))
    );
    sh.getCell("G23").value = changeToDash(
      calcPercentage(toNumber(obj["2_1_4"]), toNumber(b23))
    );
    sh.getCell("G24").value = changeToDash(
      calcPercentage(toNumber(obj["2_1_5"]), toNumber(b24))
    );
    sh.getCell("G25").value = changeToDash(
      calcPercentage(toNumber(obj["2_1_6"]), toNumber(b25))
    );
    sh.getCell("G26").value = changeToDash(
      calcPercentage(toNumber(f26), toNumber(b26))
    );
    sh.getCell("G27").value = changeToDash(
      calcPercentage(toNumber(obj["2_6_1"]), toNumber(b27))
    );
    sh.getCell("G28").value = changeToDash(
      calcPercentage(toNumber(obj["2_6_2"]), toNumber(b28))
    );
    sh.getCell("G29").value = changeToDash(
      calcPercentage(toNumber(obj["2_6_3"]), toNumber(b29))
    );
    sh.getCell("G30").value = changeToDash(
      calcPercentage(toNumber(obj["2_6_4"]), toNumber(b30))
    );
    sh.getCell("G31").value = changeToDash(
      calcPercentage(toNumber(obj["2_6_5"]), toNumber(b31))
    );
    sh.getCell("G32").value = changeToDash(
      calcPercentage(toNumber(obj["2_6_6"]), toNumber(b32))
    );
    sh.getCell("G33").value = changeToDash(
      calcPercentage(toNumber(f33), toNumber(b33))
    );
    sh.getCell("G34").value = changeToDash(
      calcPercentage(toNumber(obj["2_7_1"]), toNumber(b34))
    );
    sh.getCell("G35").value = changeToDash(
      calcPercentage(toNumber(obj["2_7_2"]), toNumber(b35))
    );
    sh.getCell("G36").value = changeToDash(
      calcPercentage(toNumber(obj["2_7_3"]), toNumber(b36))
    );
    sh.getCell("G37").value = changeToDash(
      calcPercentage(toNumber(obj["2_7_4"]), toNumber(b37))
    );
    sh.getCell("G38").value = changeToDash(
      calcPercentage(toNumber(obj["2_7_5"]), toNumber(b38))
    );
    sh.getCell("G39").value = changeToDash(
      calcPercentage(toNumber(obj["2_7_6"]), toNumber(b39))
    );
    sh.getCell("G40").value = changeToDash(
      calcPercentage(toNumber(f40), toNumber(b40))
    );
    sh.getCell("G41").value = changeToDash(
      calcPercentage(toNumber(obj["2_3_1"]), toNumber(b41))
    );
    sh.getCell("G42").value = changeToDash(
      calcPercentage(toNumber(obj["2_3_2"]), toNumber(b42))
    );
    sh.getCell("G43").value = changeToDash(
      calcPercentage(toNumber(obj["2_3_3"]), toNumber(b43))
    );
    sh.getCell("G44").value = changeToDash(
      calcPercentage(toNumber(obj["2_3_4"]), toNumber(b44))
    );
    sh.getCell("G45").value = changeToDash(
      calcPercentage(toNumber(obj["2_3_5"]), toNumber(b45))
    );
    sh.getCell("G46").value = changeToDash(
      calcPercentage(toNumber(obj["2_3_6"]), toNumber(b46))
    );
    sh.getCell("G47").value = changeToDash(
      calcPercentage(toNumber(f47), toNumber(b47))
    );
    sh.getCell("G48").value = changeToDash(
      calcPercentage(toNumber(obj["2_4_1"]), toNumber(b48))
    );
    sh.getCell("G49").value = changeToDash(
      calcPercentage(toNumber(obj["2_4_2"]), toNumber(b49))
    );
    sh.getCell("G50").value = changeToDash(
      calcPercentage(toNumber(obj["2_4_3"]), toNumber(b50))
    );
    sh.getCell("G51").value = changeToDash(
      calcPercentage(toNumber(obj["2_4_4"]), toNumber(b51))
    );
    sh.getCell("G52").value = changeToDash(
      calcPercentage(toNumber(obj["2_4_5"]), toNumber(b52))
    );
    sh.getCell("G53").value = changeToDash(
      calcPercentage(toNumber(obj["2_4_6"]), toNumber(b53))
    );
    sh.getCell("G54").value = changeToDash(
      calcPercentage(toNumber(f54), toNumber(b54))
    );
    sh.getCell("G55").value = changeToDash(
      calcPercentage(toNumber(obj["2_5_1"]), toNumber(b55))
    );
    sh.getCell("G56").value = changeToDash(
      calcPercentage(toNumber(obj["2_5_2"]), toNumber(b56))
    );
    sh.getCell("G57").value = changeToDash(
      calcPercentage(toNumber(obj["2_5_3"]), toNumber(b57))
    );
    sh.getCell("G58").value = changeToDash(
      calcPercentage(toNumber(obj["2_5_4"]), toNumber(b58))
    );
    sh.getCell("G59").value = changeToDash(
      calcPercentage(toNumber(obj["2_5_5"]), toNumber(b59))
    );
    sh.getCell("G60").value = changeToDash(
      calcPercentage(toNumber(obj["2_5_6"]), toNumber(b60))
    );
    // a01 = 3
    sh.getCell("I12").value = changeToDash(
      calcPercentage(toNumber(h12), toNumber(b12))
    );
    sh.getCell("I13").value = changeToDash(
      calcPercentage(toNumber(h13), toNumber(b13))
    );
    sh.getCell("I14").value = changeToDash(
      calcPercentage(toNumber(h14), toNumber(b14))
    );
    sh.getCell("I15").value = changeToDash(
      calcPercentage(toNumber(h15), toNumber(b15))
    );
    sh.getCell("I16").value = changeToDash(
      calcPercentage(toNumber(h16), toNumber(b16))
    );
    sh.getCell("I17").value = changeToDash(
      calcPercentage(toNumber(h17), toNumber(b17))
    );
    sh.getCell("I18").value = changeToDash(
      calcPercentage(toNumber(h18), toNumber(b18))
    );
    sh.getCell("I19").value = changeToDash(
      calcPercentage(toNumber(h19), toNumber(b19))
    );
    sh.getCell("I20").value = changeToDash(
      calcPercentage(toNumber(obj["3_1_1"]), toNumber(b20))
    );
    sh.getCell("I21").value = changeToDash(
      calcPercentage(toNumber(obj["3_1_2"]), toNumber(b21))
    );
    sh.getCell("I22").value = changeToDash(
      calcPercentage(toNumber(obj["3_1_3"]), toNumber(b22))
    );
    sh.getCell("I23").value = changeToDash(
      calcPercentage(toNumber(obj["3_1_4"]), toNumber(b23))
    );
    sh.getCell("I24").value = changeToDash(
      calcPercentage(toNumber(obj["3_1_5"]), toNumber(b24))
    );
    sh.getCell("I25").value = changeToDash(
      calcPercentage(toNumber(obj["3_1_6"]), toNumber(b25))
    );
    sh.getCell("I26").value = changeToDash(
      calcPercentage(toNumber(h26), toNumber(b26))
    );
    sh.getCell("I27").value = changeToDash(
      calcPercentage(toNumber(obj["3_6_1"]), toNumber(b27))
    );
    sh.getCell("I28").value = changeToDash(
      calcPercentage(toNumber(obj["3_6_2"]), toNumber(b28))
    );
    sh.getCell("I29").value = changeToDash(
      calcPercentage(toNumber(obj["3_6_3"]), toNumber(b29))
    );
    sh.getCell("I30").value = changeToDash(
      calcPercentage(toNumber(obj["3_6_4"]), toNumber(b30))
    );
    sh.getCell("I31").value = changeToDash(
      calcPercentage(toNumber(obj["3_6_5"]), toNumber(b31))
    );
    sh.getCell("I32").value = changeToDash(
      calcPercentage(toNumber(obj["3_6_6"]), toNumber(b32))
    );
    sh.getCell("I33").value = changeToDash(
      calcPercentage(toNumber(h33), toNumber(b33))
    );
    sh.getCell("I34").value = changeToDash(
      calcPercentage(toNumber(obj["3_7_1"]), toNumber(b34))
    );
    sh.getCell("I35").value = changeToDash(
      calcPercentage(toNumber(obj["3_7_2"]), toNumber(b35))
    );
    sh.getCell("I36").value = changeToDash(
      calcPercentage(toNumber(obj["3_7_3"]), toNumber(b36))
    );
    sh.getCell("I37").value = changeToDash(
      calcPercentage(toNumber(obj["3_7_4"]), toNumber(b37))
    );
    sh.getCell("I38").value = changeToDash(
      calcPercentage(toNumber(obj["3_7_5"]), toNumber(b38))
    );
    sh.getCell("I39").value = changeToDash(
      calcPercentage(toNumber(obj["3_7_6"]), toNumber(b39))
    );
    sh.getCell("I40").value = changeToDash(
      calcPercentage(toNumber(h40), toNumber(b40))
    );
    sh.getCell("I41").value = changeToDash(
      calcPercentage(toNumber(obj["3_3_1"]), toNumber(b41))
    );
    sh.getCell("I42").value = changeToDash(
      calcPercentage(toNumber(obj["3_3_2"]), toNumber(b42))
    );
    sh.getCell("I43").value = changeToDash(
      calcPercentage(toNumber(obj["3_3_3"]), toNumber(b43))
    );
    sh.getCell("I44").value = changeToDash(
      calcPercentage(toNumber(obj["3_3_4"]), toNumber(b44))
    );
    sh.getCell("I45").value = changeToDash(
      calcPercentage(toNumber(obj["3_3_5"]), toNumber(b45))
    );
    sh.getCell("I46").value = changeToDash(
      calcPercentage(toNumber(obj["3_3_6"]), toNumber(b46))
    );
    sh.getCell("I47").value = changeToDash(
      calcPercentage(toNumber(h47), toNumber(b47))
    );
    sh.getCell("I48").value = changeToDash(
      calcPercentage(toNumber(obj["3_4_1"]), toNumber(b48))
    );
    sh.getCell("I49").value = changeToDash(
      calcPercentage(toNumber(obj["3_4_2"]), toNumber(b49))
    );
    sh.getCell("I50").value = changeToDash(
      calcPercentage(toNumber(obj["3_4_3"]), toNumber(b50))
    );
    sh.getCell("I51").value = changeToDash(
      calcPercentage(toNumber(obj["3_4_4"]), toNumber(b51))
    );
    sh.getCell("I52").value = changeToDash(
      calcPercentage(toNumber(obj["3_4_5"]), toNumber(b52))
    );
    sh.getCell("I53").value = changeToDash(
      calcPercentage(toNumber(obj["3_4_6"]), toNumber(b53))
    );
    sh.getCell("I54").value = changeToDash(
      calcPercentage(toNumber(h54), toNumber(b54))
    );
    sh.getCell("I55").value = changeToDash(
      calcPercentage(toNumber(obj["3_5_1"]), toNumber(b55))
    );
    sh.getCell("I56").value = changeToDash(
      calcPercentage(toNumber(obj["3_5_2"]), toNumber(b56))
    );
    sh.getCell("I57").value = changeToDash(
      calcPercentage(toNumber(obj["3_5_3"]), toNumber(b57))
    );
    sh.getCell("I58").value = changeToDash(
      calcPercentage(toNumber(obj["3_5_4"]), toNumber(b58))
    );
    sh.getCell("I59").value = changeToDash(
      calcPercentage(toNumber(obj["3_5_5"]), toNumber(b59))
    );
    sh.getCell("I60").value = changeToDash(
      calcPercentage(toNumber(obj["3_5_6"]), toNumber(b60))
    );
    // a01 = 4
    sh.getCell("K12").value = changeToDash(
      calcPercentage(toNumber(j12), toNumber(b12))
    );
    sh.getCell("K13").value = changeToDash(
      calcPercentage(toNumber(j13), toNumber(b13))
    );
    sh.getCell("K14").value = changeToDash(
      calcPercentage(toNumber(j14), toNumber(b14))
    );
    sh.getCell("K15").value = changeToDash(
      calcPercentage(toNumber(j15), toNumber(b15))
    );
    sh.getCell("K16").value = changeToDash(
      calcPercentage(toNumber(j16), toNumber(b16))
    );
    sh.getCell("K17").value = changeToDash(
      calcPercentage(toNumber(j17), toNumber(b17))
    );
    sh.getCell("K18").value = changeToDash(
      calcPercentage(toNumber(j18), toNumber(b18))
    );
    sh.getCell("K19").value = changeToDash(
      calcPercentage(toNumber(j19), toNumber(b19))
    );
    sh.getCell("K20").value = changeToDash(
      calcPercentage(toNumber(obj["4_1_1"]), toNumber(b20))
    );
    sh.getCell("K21").value = changeToDash(
      calcPercentage(toNumber(obj["4_1_2"]), toNumber(b21))
    );
    sh.getCell("K22").value = changeToDash(
      calcPercentage(toNumber(obj["4_1_3"]), toNumber(b22))
    );
    sh.getCell("K23").value = changeToDash(
      calcPercentage(toNumber(obj["4_1_4"]), toNumber(b23))
    );
    sh.getCell("K24").value = changeToDash(
      calcPercentage(toNumber(obj["4_1_5"]), toNumber(b24))
    );
    sh.getCell("K25").value = changeToDash(
      calcPercentage(toNumber(obj["4_1_6"]), toNumber(b25))
    );
    sh.getCell("K26").value = changeToDash(
      calcPercentage(toNumber(j26), toNumber(b26))
    );
    sh.getCell("K27").value = changeToDash(
      calcPercentage(toNumber(obj["4_6_1"]), toNumber(b27))
    );
    sh.getCell("K28").value = changeToDash(
      calcPercentage(toNumber(obj["4_6_2"]), toNumber(b28))
    );
    sh.getCell("K29").value = changeToDash(
      calcPercentage(toNumber(obj["4_6_3"]), toNumber(b29))
    );
    sh.getCell("K30").value = changeToDash(
      calcPercentage(toNumber(obj["4_6_4"]), toNumber(b30))
    );
    sh.getCell("K31").value = changeToDash(
      calcPercentage(toNumber(obj["4_6_5"]), toNumber(b31))
    );
    sh.getCell("K32").value = changeToDash(
      calcPercentage(toNumber(obj["4_6_6"]), toNumber(b32))
    );
    sh.getCell("K33").value = changeToDash(
      calcPercentage(toNumber(j33), toNumber(b33))
    );
    sh.getCell("K34").value = changeToDash(
      calcPercentage(toNumber(obj["4_7_1"]), toNumber(b34))
    );
    sh.getCell("K35").value = changeToDash(
      calcPercentage(toNumber(obj["4_7_2"]), toNumber(b35))
    );
    sh.getCell("K36").value = changeToDash(
      calcPercentage(toNumber(obj["4_7_3"]), toNumber(b36))
    );
    sh.getCell("K37").value = changeToDash(
      calcPercentage(toNumber(obj["4_7_4"]), toNumber(b37))
    );
    sh.getCell("K38").value = changeToDash(
      calcPercentage(toNumber(obj["4_7_5"]), toNumber(b38))
    );
    sh.getCell("K39").value = changeToDash(
      calcPercentage(toNumber(obj["4_7_6"]), toNumber(b39))
    );
    sh.getCell("K40").value = changeToDash(
      calcPercentage(toNumber(j40), toNumber(b40))
    );
    sh.getCell("K41").value = changeToDash(
      calcPercentage(toNumber(obj["4_3_1"]), toNumber(b41))
    );
    sh.getCell("K42").value = changeToDash(
      calcPercentage(toNumber(obj["4_3_2"]), toNumber(b42))
    );
    sh.getCell("K43").value = changeToDash(
      calcPercentage(toNumber(obj["4_3_3"]), toNumber(b43))
    );
    sh.getCell("K44").value = changeToDash(
      calcPercentage(toNumber(obj["4_3_4"]), toNumber(b44))
    );
    sh.getCell("K45").value = changeToDash(
      calcPercentage(toNumber(obj["4_3_5"]), toNumber(b45))
    );
    sh.getCell("K46").value = changeToDash(
      calcPercentage(toNumber(obj["4_3_6"]), toNumber(b46))
    );
    sh.getCell("K47").value = changeToDash(
      calcPercentage(toNumber(j47), toNumber(b47))
    );
    sh.getCell("K48").value = changeToDash(
      calcPercentage(toNumber(obj["4_4_1"]), toNumber(b48))
    );
    sh.getCell("K49").value = changeToDash(
      calcPercentage(toNumber(obj["4_4_2"]), toNumber(b49))
    );
    sh.getCell("K50").value = changeToDash(
      calcPercentage(toNumber(obj["4_4_3"]), toNumber(b50))
    );
    sh.getCell("K51").value = changeToDash(
      calcPercentage(toNumber(obj["4_4_4"]), toNumber(b51))
    );
    sh.getCell("K52").value = changeToDash(
      calcPercentage(toNumber(obj["4_4_5"]), toNumber(b52))
    );
    sh.getCell("K53").value = changeToDash(
      calcPercentage(toNumber(obj["4_4_6"]), toNumber(b53))
    );
    sh.getCell("K54").value = changeToDash(
      calcPercentage(toNumber(j54), toNumber(b54))
    );
    sh.getCell("K55").value = changeToDash(
      calcPercentage(toNumber(obj["4_5_1"]), toNumber(b55))
    );
    sh.getCell("K56").value = changeToDash(
      calcPercentage(toNumber(obj["4_5_2"]), toNumber(b56))
    );
    sh.getCell("K57").value = changeToDash(
      calcPercentage(toNumber(obj["4_5_3"]), toNumber(b57))
    );
    sh.getCell("K58").value = changeToDash(
      calcPercentage(toNumber(obj["4_5_4"]), toNumber(b58))
    );
    sh.getCell("K59").value = changeToDash(
      calcPercentage(toNumber(obj["4_5_5"]), toNumber(b59))
    );
    sh.getCell("K60").value = changeToDash(
      calcPercentage(toNumber(obj["4_5_6"]), toNumber(b60))
    );
    // a01 = 5
    sh.getCell("M12").value = changeToDash(
      calcPercentage(toNumber(l12), toNumber(b12))
    );
    sh.getCell("M13").value = changeToDash(
      calcPercentage(toNumber(l13), toNumber(b13))
    );
    sh.getCell("M14").value = changeToDash(
      calcPercentage(toNumber(l14), toNumber(b14))
    );
    sh.getCell("M15").value = changeToDash(
      calcPercentage(toNumber(l15), toNumber(b15))
    );
    sh.getCell("M16").value = changeToDash(
      calcPercentage(toNumber(l16), toNumber(b16))
    );
    sh.getCell("M17").value = changeToDash(
      calcPercentage(toNumber(l17), toNumber(b17))
    );
    sh.getCell("M18").value = changeToDash(
      calcPercentage(toNumber(l18), toNumber(b18))
    );
    sh.getCell("M19").value = changeToDash(
      calcPercentage(toNumber(l19), toNumber(b19))
    );
    sh.getCell("M20").value = changeToDash(
      calcPercentage(toNumber(obj["5_1_1"]), toNumber(b20))
    );
    sh.getCell("M21").value = changeToDash(
      calcPercentage(toNumber(obj["5_1_2"]), toNumber(b21))
    );
    sh.getCell("M22").value = changeToDash(
      calcPercentage(toNumber(obj["5_1_3"]), toNumber(b22))
    );
    sh.getCell("M23").value = changeToDash(
      calcPercentage(toNumber(obj["5_1_4"]), toNumber(b23))
    );
    sh.getCell("M24").value = changeToDash(
      calcPercentage(toNumber(obj["5_1_5"]), toNumber(b24))
    );
    sh.getCell("M25").value = changeToDash(
      calcPercentage(toNumber(obj["5_1_6"]), toNumber(b25))
    );
    sh.getCell("M26").value = changeToDash(
      calcPercentage(toNumber(l26), toNumber(b26))
    );
    sh.getCell("M27").value = changeToDash(
      calcPercentage(toNumber(obj["5_6_1"]), toNumber(b27))
    );
    sh.getCell("M28").value = changeToDash(
      calcPercentage(toNumber(obj["5_6_2"]), toNumber(b28))
    );
    sh.getCell("M29").value = changeToDash(
      calcPercentage(toNumber(obj["5_6_3"]), toNumber(b29))
    );
    sh.getCell("M30").value = changeToDash(
      calcPercentage(toNumber(obj["5_6_4"]), toNumber(b30))
    );
    sh.getCell("M31").value = changeToDash(
      calcPercentage(toNumber(obj["5_6_5"]), toNumber(b31))
    );
    sh.getCell("M32").value = changeToDash(
      calcPercentage(toNumber(obj["5_6_6"]), toNumber(b32))
    );
    sh.getCell("M33").value = changeToDash(
      calcPercentage(toNumber(l33), toNumber(b33))
    );
    sh.getCell("M34").value = changeToDash(
      calcPercentage(toNumber(obj["5_7_1"]), toNumber(b34))
    );
    sh.getCell("M35").value = changeToDash(
      calcPercentage(toNumber(obj["5_7_2"]), toNumber(b35))
    );
    sh.getCell("M36").value = changeToDash(
      calcPercentage(toNumber(obj["5_7_3"]), toNumber(b36))
    );
    sh.getCell("M37").value = changeToDash(
      calcPercentage(toNumber(obj["5_7_4"]), toNumber(b37))
    );
    sh.getCell("M38").value = changeToDash(
      calcPercentage(toNumber(obj["5_7_5"]), toNumber(b38))
    );
    sh.getCell("M39").value = changeToDash(
      calcPercentage(toNumber(obj["5_7_6"]), toNumber(b39))
    );
    sh.getCell("M40").value = changeToDash(
      calcPercentage(toNumber(l40), toNumber(b40))
    );
    sh.getCell("M41").value = changeToDash(
      calcPercentage(toNumber(obj["5_3_1"]), toNumber(b41))
    );
    sh.getCell("M42").value = changeToDash(
      calcPercentage(toNumber(obj["5_3_2"]), toNumber(b42))
    );
    sh.getCell("M43").value = changeToDash(
      calcPercentage(toNumber(obj["5_3_3"]), toNumber(b43))
    );
    sh.getCell("M44").value = changeToDash(
      calcPercentage(toNumber(obj["5_3_4"]), toNumber(b44))
    );
    sh.getCell("M45").value = changeToDash(
      calcPercentage(toNumber(obj["5_3_5"]), toNumber(b45))
    );
    sh.getCell("M46").value = changeToDash(
      calcPercentage(toNumber(obj["5_3_6"]), toNumber(b46))
    );
    sh.getCell("M47").value = changeToDash(
      calcPercentage(toNumber(l47), toNumber(b47))
    );
    sh.getCell("M48").value = changeToDash(
      calcPercentage(toNumber(obj["5_4_1"]), toNumber(b48))
    );
    sh.getCell("M49").value = changeToDash(
      calcPercentage(toNumber(obj["5_4_2"]), toNumber(b49))
    );
    sh.getCell("M50").value = changeToDash(
      calcPercentage(toNumber(obj["5_4_3"]), toNumber(b50))
    );
    sh.getCell("M51").value = changeToDash(
      calcPercentage(toNumber(obj["5_4_4"]), toNumber(b51))
    );
    sh.getCell("M52").value = changeToDash(
      calcPercentage(toNumber(obj["5_4_5"]), toNumber(b52))
    );
    sh.getCell("M53").value = changeToDash(
      calcPercentage(toNumber(obj["5_4_6"]), toNumber(b53))
    );
    sh.getCell("M54").value = changeToDash(
      calcPercentage(toNumber(l54), toNumber(b54))
    );
    sh.getCell("M55").value = changeToDash(
      calcPercentage(toNumber(obj["5_5_1"]), toNumber(b55))
    );
    sh.getCell("M56").value = changeToDash(
      calcPercentage(toNumber(obj["5_5_2"]), toNumber(b56))
    );
    sh.getCell("M57").value = changeToDash(
      calcPercentage(toNumber(obj["5_5_3"]), toNumber(b57))
    );
    sh.getCell("M58").value = changeToDash(
      calcPercentage(toNumber(obj["5_5_4"]), toNumber(b58))
    );
    sh.getCell("M59").value = changeToDash(
      calcPercentage(toNumber(obj["5_5_5"]), toNumber(b59))
    );
    sh.getCell("M60").value = changeToDash(
      calcPercentage(toNumber(obj["5_5_6"]), toNumber(b60))
    );
    // a01 = 6
    sh.getCell("O12").value = changeToDash(
      calcPercentage(toNumber(n12), toNumber(b12))
    );
    sh.getCell("O13").value = changeToDash(
      calcPercentage(toNumber(n13), toNumber(b13))
    );
    sh.getCell("O14").value = changeToDash(
      calcPercentage(toNumber(n14), toNumber(b14))
    );
    sh.getCell("O15").value = changeToDash(
      calcPercentage(toNumber(n15), toNumber(b15))
    );
    sh.getCell("O16").value = changeToDash(
      calcPercentage(toNumber(n16), toNumber(b16))
    );
    sh.getCell("O17").value = changeToDash(
      calcPercentage(toNumber(n17), toNumber(b17))
    );
    sh.getCell("O18").value = changeToDash(
      calcPercentage(toNumber(n18), toNumber(b18))
    );
    sh.getCell("O19").value = changeToDash(
      calcPercentage(toNumber(n19), toNumber(b19))
    );
    sh.getCell("O20").value = changeToDash(
      calcPercentage(toNumber(obj["6_1_1"]), toNumber(b20))
    );
    sh.getCell("O21").value = changeToDash(
      calcPercentage(toNumber(obj["6_1_2"]), toNumber(b21))
    );
    sh.getCell("O22").value = changeToDash(
      calcPercentage(toNumber(obj["6_1_3"]), toNumber(b22))
    );
    sh.getCell("O23").value = changeToDash(
      calcPercentage(toNumber(obj["6_1_4"]), toNumber(b23))
    );
    sh.getCell("O24").value = changeToDash(
      calcPercentage(toNumber(obj["6_1_5"]), toNumber(b24))
    );
    sh.getCell("O25").value = changeToDash(
      calcPercentage(toNumber(obj["6_1_6"]), toNumber(b25))
    );
    sh.getCell("O26").value = changeToDash(
      calcPercentage(toNumber(n26), toNumber(b26))
    );
    sh.getCell("O27").value = changeToDash(
      calcPercentage(toNumber(obj["6_6_1"]), toNumber(b27))
    );
    sh.getCell("O28").value = changeToDash(
      calcPercentage(toNumber(obj["6_6_2"]), toNumber(b28))
    );
    sh.getCell("O29").value = changeToDash(
      calcPercentage(toNumber(obj["6_6_3"]), toNumber(b29))
    );
    sh.getCell("O30").value = changeToDash(
      calcPercentage(toNumber(obj["6_6_4"]), toNumber(b30))
    );
    sh.getCell("O31").value = changeToDash(
      calcPercentage(toNumber(obj["6_6_5"]), toNumber(b31))
    );
    sh.getCell("O32").value = changeToDash(
      calcPercentage(toNumber(obj["6_6_6"]), toNumber(b32))
    );
    sh.getCell("O33").value = changeToDash(
      calcPercentage(toNumber(n33), toNumber(b33))
    );
    sh.getCell("O34").value = changeToDash(
      calcPercentage(toNumber(obj["6_7_1"]), toNumber(b34))
    );
    sh.getCell("O35").value = changeToDash(
      calcPercentage(toNumber(obj["6_7_2"]), toNumber(b35))
    );
    sh.getCell("O36").value = changeToDash(
      calcPercentage(toNumber(obj["6_7_3"]), toNumber(b36))
    );
    sh.getCell("O37").value = changeToDash(
      calcPercentage(toNumber(obj["6_7_4"]), toNumber(b37))
    );
    sh.getCell("O38").value = changeToDash(
      calcPercentage(toNumber(obj["6_7_5"]), toNumber(b38))
    );
    sh.getCell("O39").value = changeToDash(
      calcPercentage(toNumber(obj["6_7_6"]), toNumber(b39))
    );
    sh.getCell("O40").value = changeToDash(
      calcPercentage(toNumber(n40), toNumber(b40))
    );
    sh.getCell("O41").value = changeToDash(
      calcPercentage(toNumber(obj["6_3_1"]), toNumber(b41))
    );
    sh.getCell("O42").value = changeToDash(
      calcPercentage(toNumber(obj["6_3_2"]), toNumber(b42))
    );
    sh.getCell("O43").value = changeToDash(
      calcPercentage(toNumber(obj["6_3_3"]), toNumber(b43))
    );
    sh.getCell("O44").value = changeToDash(
      calcPercentage(toNumber(obj["6_3_4"]), toNumber(b44))
    );
    sh.getCell("O45").value = changeToDash(
      calcPercentage(toNumber(obj["6_3_5"]), toNumber(b45))
    );
    sh.getCell("O46").value = changeToDash(
      calcPercentage(toNumber(obj["6_3_6"]), toNumber(b46))
    );
    sh.getCell("O47").value = changeToDash(
      calcPercentage(toNumber(n47), toNumber(b47))
    );
    sh.getCell("O48").value = changeToDash(
      calcPercentage(toNumber(obj["6_4_1"]), toNumber(b48))
    );
    sh.getCell("O49").value = changeToDash(
      calcPercentage(toNumber(obj["6_4_2"]), toNumber(b49))
    );
    sh.getCell("O50").value = changeToDash(
      calcPercentage(toNumber(obj["6_4_3"]), toNumber(b50))
    );
    sh.getCell("O51").value = changeToDash(
      calcPercentage(toNumber(obj["6_4_4"]), toNumber(b51))
    );
    sh.getCell("O52").value = changeToDash(
      calcPercentage(toNumber(obj["6_4_5"]), toNumber(b52))
    );
    sh.getCell("O53").value = changeToDash(
      calcPercentage(toNumber(obj["6_4_6"]), toNumber(b53))
    );
    sh.getCell("O54").value = changeToDash(
      calcPercentage(toNumber(n54), toNumber(b54))
    );
    sh.getCell("O55").value = changeToDash(
      calcPercentage(toNumber(obj["6_5_1"]), toNumber(b55))
    );
    sh.getCell("O56").value = changeToDash(
      calcPercentage(toNumber(obj["6_5_2"]), toNumber(b56))
    );
    sh.getCell("O57").value = changeToDash(
      calcPercentage(toNumber(obj["6_5_3"]), toNumber(b57))
    );
    sh.getCell("O58").value = changeToDash(
      calcPercentage(toNumber(obj["6_5_4"]), toNumber(b58))
    );
    sh.getCell("O59").value = changeToDash(
      calcPercentage(toNumber(obj["6_5_5"]), toNumber(b59))
    );
    sh.getCell("O60").value = changeToDash(
      calcPercentage(toNumber(obj["6_5_6"]), toNumber(b60))
    );
    // a01 = 7
    sh.getCell("Q12").value = changeToDash(
      calcPercentage(toNumber(p12), toNumber(b12))
    );
    sh.getCell("Q13").value = changeToDash(
      calcPercentage(toNumber(p13), toNumber(b13))
    );
    sh.getCell("Q14").value = changeToDash(
      calcPercentage(toNumber(p14), toNumber(b14))
    );
    sh.getCell("Q15").value = changeToDash(
      calcPercentage(toNumber(p15), toNumber(b15))
    );
    sh.getCell("Q16").value = changeToDash(
      calcPercentage(toNumber(p16), toNumber(b16))
    );
    sh.getCell("Q17").value = changeToDash(
      calcPercentage(toNumber(p17), toNumber(b17))
    );
    sh.getCell("Q18").value = changeToDash(
      calcPercentage(toNumber(p18), toNumber(b18))
    );
    sh.getCell("Q19").value = changeToDash(
      calcPercentage(toNumber(p19), toNumber(b19))
    );
    sh.getCell("Q20").value = changeToDash(
      calcPercentage(toNumber(obj["7_1_1"]), toNumber(b20))
    );
    sh.getCell("Q21").value = changeToDash(
      calcPercentage(toNumber(obj["7_1_2"]), toNumber(b21))
    );
    sh.getCell("Q22").value = changeToDash(
      calcPercentage(toNumber(obj["7_1_3"]), toNumber(b22))
    );
    sh.getCell("Q23").value = changeToDash(
      calcPercentage(toNumber(obj["7_1_4"]), toNumber(b23))
    );
    sh.getCell("Q24").value = changeToDash(
      calcPercentage(toNumber(obj["7_1_5"]), toNumber(b24))
    );
    sh.getCell("Q25").value = changeToDash(
      calcPercentage(toNumber(obj["7_1_6"]), toNumber(b25))
    );
    sh.getCell("Q26").value = changeToDash(
      calcPercentage(toNumber(p26), toNumber(b26))
    );
    sh.getCell("Q27").value = changeToDash(
      calcPercentage(toNumber(obj["7_6_1"]), toNumber(b27))
    );
    sh.getCell("Q28").value = changeToDash(
      calcPercentage(toNumber(obj["7_6_2"]), toNumber(b28))
    );
    sh.getCell("Q29").value = changeToDash(
      calcPercentage(toNumber(obj["7_6_3"]), toNumber(b29))
    );
    sh.getCell("Q30").value = changeToDash(
      calcPercentage(toNumber(obj["7_6_4"]), toNumber(b30))
    );
    sh.getCell("Q31").value = changeToDash(
      calcPercentage(toNumber(obj["7_6_5"]), toNumber(b31))
    );
    sh.getCell("Q32").value = changeToDash(
      calcPercentage(toNumber(obj["7_6_6"]), toNumber(b32))
    );
    sh.getCell("Q33").value = changeToDash(
      calcPercentage(toNumber(p33), toNumber(b33))
    );
    sh.getCell("Q34").value = changeToDash(
      calcPercentage(toNumber(obj["7_7_1"]), toNumber(b34))
    );
    sh.getCell("Q35").value = changeToDash(
      calcPercentage(toNumber(obj["7_7_2"]), toNumber(b35))
    );
    sh.getCell("Q36").value = changeToDash(
      calcPercentage(toNumber(obj["7_7_3"]), toNumber(b36))
    );
    sh.getCell("Q37").value = changeToDash(
      calcPercentage(toNumber(obj["7_7_4"]), toNumber(b37))
    );
    sh.getCell("Q38").value = changeToDash(
      calcPercentage(toNumber(obj["7_7_5"]), toNumber(b38))
    );
    sh.getCell("Q39").value = changeToDash(
      calcPercentage(toNumber(obj["7_7_6"]), toNumber(b39))
    );
    sh.getCell("Q40").value = changeToDash(
      calcPercentage(toNumber(p40), toNumber(b40))
    );
    sh.getCell("Q41").value = changeToDash(
      calcPercentage(toNumber(obj["7_3_1"]), toNumber(b41))
    );
    sh.getCell("Q42").value = changeToDash(
      calcPercentage(toNumber(obj["7_3_2"]), toNumber(b42))
    );
    sh.getCell("Q43").value = changeToDash(
      calcPercentage(toNumber(obj["7_3_3"]), toNumber(b43))
    );
    sh.getCell("Q44").value = changeToDash(
      calcPercentage(toNumber(obj["7_3_4"]), toNumber(b44))
    );
    sh.getCell("Q45").value = changeToDash(
      calcPercentage(toNumber(obj["7_3_5"]), toNumber(b45))
    );
    sh.getCell("Q46").value = changeToDash(
      calcPercentage(toNumber(obj["7_3_6"]), toNumber(b46))
    );
    sh.getCell("Q47").value = changeToDash(
      calcPercentage(toNumber(p47), toNumber(b47))
    );
    sh.getCell("Q48").value = changeToDash(
      calcPercentage(toNumber(obj["7_4_1"]), toNumber(b48))
    );
    sh.getCell("Q49").value = changeToDash(
      calcPercentage(toNumber(obj["7_4_2"]), toNumber(b49))
    );
    sh.getCell("Q50").value = changeToDash(
      calcPercentage(toNumber(obj["7_4_3"]), toNumber(b50))
    );
    sh.getCell("Q51").value = changeToDash(
      calcPercentage(toNumber(obj["7_4_4"]), toNumber(b51))
    );
    sh.getCell("Q52").value = changeToDash(
      calcPercentage(toNumber(obj["7_4_5"]), toNumber(b52))
    );
    sh.getCell("Q53").value = changeToDash(
      calcPercentage(toNumber(obj["7_4_6"]), toNumber(b53))
    );
    sh.getCell("Q54").value = changeToDash(
      calcPercentage(toNumber(p54), toNumber(b54))
    );
    sh.getCell("Q55").value = changeToDash(
      calcPercentage(toNumber(obj["7_5_1"]), toNumber(b55))
    );
    sh.getCell("Q56").value = changeToDash(
      calcPercentage(toNumber(obj["7_5_2"]), toNumber(b56))
    );
    sh.getCell("Q57").value = changeToDash(
      calcPercentage(toNumber(obj["7_5_3"]), toNumber(b57))
    );
    sh.getCell("Q58").value = changeToDash(
      calcPercentage(toNumber(obj["7_5_4"]), toNumber(b58))
    );
    sh.getCell("Q59").value = changeToDash(
      calcPercentage(toNumber(obj["7_5_5"]), toNumber(b59))
    );
    sh.getCell("Q60").value = changeToDash(
      calcPercentage(toNumber(obj["7_5_6"]), toNumber(b60))
    );
    // a01 = 8
    sh.getCell("S12").value = changeToDash(
      calcPercentage(toNumber(r12), toNumber(b12))
    );
    sh.getCell("S13").value = changeToDash(
      calcPercentage(toNumber(r13), toNumber(b13))
    );
    sh.getCell("S14").value = changeToDash(
      calcPercentage(toNumber(r14), toNumber(b14))
    );
    sh.getCell("S15").value = changeToDash(
      calcPercentage(toNumber(r15), toNumber(b15))
    );
    sh.getCell("S16").value = changeToDash(
      calcPercentage(toNumber(r16), toNumber(b16))
    );
    sh.getCell("S17").value = changeToDash(
      calcPercentage(toNumber(r17), toNumber(b17))
    );
    sh.getCell("S18").value = changeToDash(
      calcPercentage(toNumber(r18), toNumber(b18))
    );
    sh.getCell("S19").value = changeToDash(
      calcPercentage(toNumber(r19), toNumber(b19))
    );
    sh.getCell("S20").value = changeToDash(
      calcPercentage(toNumber(obj["8_1_1"]), toNumber(b20))
    );
    sh.getCell("S21").value = changeToDash(
      calcPercentage(toNumber(obj["8_1_2"]), toNumber(b21))
    );
    sh.getCell("S22").value = changeToDash(
      calcPercentage(toNumber(obj["8_1_3"]), toNumber(b22))
    );
    sh.getCell("S23").value = changeToDash(
      calcPercentage(toNumber(obj["8_1_4"]), toNumber(b23))
    );
    sh.getCell("S24").value = changeToDash(
      calcPercentage(toNumber(obj["8_1_5"]), toNumber(b24))
    );
    sh.getCell("S25").value = changeToDash(
      calcPercentage(toNumber(obj["8_1_6"]), toNumber(b25))
    );
    sh.getCell("S26").value = changeToDash(
      calcPercentage(toNumber(r26), toNumber(b26))
    );
    sh.getCell("S27").value = changeToDash(
      calcPercentage(toNumber(obj["8_6_1"]), toNumber(b27))
    );
    sh.getCell("S28").value = changeToDash(
      calcPercentage(toNumber(obj["8_6_2"]), toNumber(b28))
    );
    sh.getCell("S29").value = changeToDash(
      calcPercentage(toNumber(obj["8_6_3"]), toNumber(b29))
    );
    sh.getCell("S30").value = changeToDash(
      calcPercentage(toNumber(obj["8_6_4"]), toNumber(b30))
    );
    sh.getCell("S31").value = changeToDash(
      calcPercentage(toNumber(obj["8_6_5"]), toNumber(b31))
    );
    sh.getCell("S32").value = changeToDash(
      calcPercentage(toNumber(obj["8_6_6"]), toNumber(b32))
    );
    sh.getCell("S33").value = changeToDash(
      calcPercentage(toNumber(r33), toNumber(b33))
    );
    sh.getCell("S34").value = changeToDash(
      calcPercentage(toNumber(obj["8_7_1"]), toNumber(b34))
    );
    sh.getCell("S35").value = changeToDash(
      calcPercentage(toNumber(obj["8_7_2"]), toNumber(b35))
    );
    sh.getCell("S36").value = changeToDash(
      calcPercentage(toNumber(obj["8_7_3"]), toNumber(b36))
    );
    sh.getCell("S37").value = changeToDash(
      calcPercentage(toNumber(obj["8_7_4"]), toNumber(b37))
    );
    sh.getCell("S38").value = changeToDash(
      calcPercentage(toNumber(obj["8_7_5"]), toNumber(b38))
    );
    sh.getCell("S39").value = changeToDash(
      calcPercentage(toNumber(obj["8_7_6"]), toNumber(b39))
    );
    sh.getCell("S40").value = changeToDash(
      calcPercentage(toNumber(r40), toNumber(b40))
    );
    sh.getCell("S41").value = changeToDash(
      calcPercentage(toNumber(obj["8_3_1"]), toNumber(b41))
    );
    sh.getCell("S42").value = changeToDash(
      calcPercentage(toNumber(obj["8_3_2"]), toNumber(b42))
    );
    sh.getCell("S43").value = changeToDash(
      calcPercentage(toNumber(obj["8_3_3"]), toNumber(b43))
    );
    sh.getCell("S44").value = changeToDash(
      calcPercentage(toNumber(obj["8_3_4"]), toNumber(b44))
    );
    sh.getCell("S45").value = changeToDash(
      calcPercentage(toNumber(obj["8_3_5"]), toNumber(b45))
    );
    sh.getCell("S46").value = changeToDash(
      calcPercentage(toNumber(obj["8_3_6"]), toNumber(b46))
    );
    sh.getCell("S47").value = changeToDash(
      calcPercentage(toNumber(r47), toNumber(b47))
    );
    sh.getCell("S48").value = changeToDash(
      calcPercentage(toNumber(obj["8_4_1"]), toNumber(b48))
    );
    sh.getCell("S49").value = changeToDash(
      calcPercentage(toNumber(obj["8_4_2"]), toNumber(b49))
    );
    sh.getCell("S50").value = changeToDash(
      calcPercentage(toNumber(obj["8_4_3"]), toNumber(b50))
    );
    sh.getCell("S51").value = changeToDash(
      calcPercentage(toNumber(obj["8_4_4"]), toNumber(b51))
    );
    sh.getCell("S52").value = changeToDash(
      calcPercentage(toNumber(obj["8_4_5"]), toNumber(b52))
    );
    sh.getCell("S53").value = changeToDash(
      calcPercentage(toNumber(obj["8_4_6"]), toNumber(b53))
    );
    sh.getCell("S54").value = changeToDash(
      calcPercentage(toNumber(r54), toNumber(b54))
    );
    sh.getCell("S55").value = changeToDash(
      calcPercentage(toNumber(obj["8_5_1"]), toNumber(b55))
    );
    sh.getCell("S56").value = changeToDash(
      calcPercentage(toNumber(obj["8_5_2"]), toNumber(b56))
    );
    sh.getCell("S57").value = changeToDash(
      calcPercentage(toNumber(obj["8_5_3"]), toNumber(b57))
    );
    sh.getCell("S58").value = changeToDash(
      calcPercentage(toNumber(obj["8_5_4"]), toNumber(b58))
    );
    sh.getCell("S59").value = changeToDash(
      calcPercentage(toNumber(obj["8_5_5"]), toNumber(b59))
    );
    sh.getCell("S60").value = changeToDash(
      calcPercentage(toNumber(obj["8_5_6"]), toNumber(b60))
    );
    // a01 = 9
    sh.getCell("U12").value = changeToDash(
      calcPercentage(toNumber(t12), toNumber(b12))
    );
    sh.getCell("U13").value = changeToDash(
      calcPercentage(toNumber(t13), toNumber(b13))
    );
    sh.getCell("U14").value = changeToDash(
      calcPercentage(toNumber(t14), toNumber(b14))
    );
    sh.getCell("U15").value = changeToDash(
      calcPercentage(toNumber(t15), toNumber(b15))
    );
    sh.getCell("U16").value = changeToDash(
      calcPercentage(toNumber(t16), toNumber(b16))
    );
    sh.getCell("U17").value = changeToDash(
      calcPercentage(toNumber(t17), toNumber(b17))
    );
    sh.getCell("U18").value = changeToDash(
      calcPercentage(toNumber(t18), toNumber(b18))
    );
    sh.getCell("U19").value = changeToDash(
      calcPercentage(toNumber(t19), toNumber(b19))
    );
    sh.getCell("U20").value = changeToDash(
      calcPercentage(toNumber(obj["9_1_1"]), toNumber(b20))
    );
    sh.getCell("U21").value = changeToDash(
      calcPercentage(toNumber(obj["9_1_2"]), toNumber(b21))
    );
    sh.getCell("U22").value = changeToDash(
      calcPercentage(toNumber(obj["9_1_3"]), toNumber(b22))
    );
    sh.getCell("U23").value = changeToDash(
      calcPercentage(toNumber(obj["9_1_4"]), toNumber(b23))
    );
    sh.getCell("U24").value = changeToDash(
      calcPercentage(toNumber(obj["9_1_5"]), toNumber(b24))
    );
    sh.getCell("U25").value = changeToDash(
      calcPercentage(toNumber(obj["9_1_6"]), toNumber(b25))
    );
    sh.getCell("U26").value = changeToDash(
      calcPercentage(toNumber(t26), toNumber(b26))
    );
    sh.getCell("U27").value = changeToDash(
      calcPercentage(toNumber(obj["9_6_1"]), toNumber(b27))
    );
    sh.getCell("U28").value = changeToDash(
      calcPercentage(toNumber(obj["9_6_2"]), toNumber(b28))
    );
    sh.getCell("U29").value = changeToDash(
      calcPercentage(toNumber(obj["9_6_3"]), toNumber(b29))
    );
    sh.getCell("U30").value = changeToDash(
      calcPercentage(toNumber(obj["9_6_4"]), toNumber(b30))
    );
    sh.getCell("U31").value = changeToDash(
      calcPercentage(toNumber(obj["9_6_5"]), toNumber(b31))
    );
    sh.getCell("U32").value = changeToDash(
      calcPercentage(toNumber(obj["9_6_6"]), toNumber(b32))
    );
    sh.getCell("U33").value = changeToDash(
      calcPercentage(toNumber(t33), toNumber(b33))
    );
    sh.getCell("U34").value = changeToDash(
      calcPercentage(toNumber(obj["9_7_1"]), toNumber(b34))
    );
    sh.getCell("U35").value = changeToDash(
      calcPercentage(toNumber(obj["9_7_2"]), toNumber(b35))
    );
    sh.getCell("U36").value = changeToDash(
      calcPercentage(toNumber(obj["9_7_3"]), toNumber(b36))
    );
    sh.getCell("U37").value = changeToDash(
      calcPercentage(toNumber(obj["9_7_4"]), toNumber(b37))
    );
    sh.getCell("U38").value = changeToDash(
      calcPercentage(toNumber(obj["9_7_5"]), toNumber(b38))
    );
    sh.getCell("U39").value = changeToDash(
      calcPercentage(toNumber(obj["9_7_6"]), toNumber(b39))
    );
    sh.getCell("U40").value = changeToDash(
      calcPercentage(toNumber(t40), toNumber(b40))
    );
    sh.getCell("U41").value = changeToDash(
      calcPercentage(toNumber(obj["9_3_1"]), toNumber(b41))
    );
    sh.getCell("U42").value = changeToDash(
      calcPercentage(toNumber(obj["9_3_2"]), toNumber(b42))
    );
    sh.getCell("U43").value = changeToDash(
      calcPercentage(toNumber(obj["9_3_3"]), toNumber(b43))
    );
    sh.getCell("U44").value = changeToDash(
      calcPercentage(toNumber(obj["9_3_4"]), toNumber(b44))
    );
    sh.getCell("U45").value = changeToDash(
      calcPercentage(toNumber(obj["9_3_5"]), toNumber(b45))
    );
    sh.getCell("U46").value = changeToDash(
      calcPercentage(toNumber(obj["9_3_6"]), toNumber(b46))
    );
    sh.getCell("U47").value = changeToDash(
      calcPercentage(toNumber(t47), toNumber(b47))
    );
    sh.getCell("U48").value = changeToDash(
      calcPercentage(toNumber(obj["9_4_1"]), toNumber(b48))
    );
    sh.getCell("U49").value = changeToDash(
      calcPercentage(toNumber(obj["9_4_2"]), toNumber(b49))
    );
    sh.getCell("U50").value = changeToDash(
      calcPercentage(toNumber(obj["9_4_3"]), toNumber(b50))
    );
    sh.getCell("U51").value = changeToDash(
      calcPercentage(toNumber(obj["9_4_4"]), toNumber(b51))
    );
    sh.getCell("U52").value = changeToDash(
      calcPercentage(toNumber(obj["9_4_5"]), toNumber(b52))
    );
    sh.getCell("U53").value = changeToDash(
      calcPercentage(toNumber(obj["9_4_6"]), toNumber(b53))
    );
    sh.getCell("U54").value = changeToDash(
      calcPercentage(toNumber(t54), toNumber(b54))
    );
    sh.getCell("U55").value = changeToDash(
      calcPercentage(toNumber(obj["9_5_1"]), toNumber(b55))
    );
    sh.getCell("U56").value = changeToDash(
      calcPercentage(toNumber(obj["9_5_2"]), toNumber(b56))
    );
    sh.getCell("U57").value = changeToDash(
      calcPercentage(toNumber(obj["9_5_3"]), toNumber(b57))
    );
    sh.getCell("U58").value = changeToDash(
      calcPercentage(toNumber(obj["9_5_4"]), toNumber(b58))
    );
    sh.getCell("U59").value = changeToDash(
      calcPercentage(toNumber(obj["9_5_5"]), toNumber(b59))
    );
    sh.getCell("U60").value = changeToDash(
      calcPercentage(toNumber(obj["9_5_6"]), toNumber(b60))
    );
    // a01 = 10
    sh.getCell("W12").value = changeToDash(
      calcPercentage(toNumber(v12), toNumber(b12))
    );
    sh.getCell("W13").value = changeToDash(
      calcPercentage(toNumber(v13), toNumber(b13))
    );
    sh.getCell("W14").value = changeToDash(
      calcPercentage(toNumber(v14), toNumber(b14))
    );
    sh.getCell("W15").value = changeToDash(
      calcPercentage(toNumber(v15), toNumber(b15))
    );
    sh.getCell("W16").value = changeToDash(
      calcPercentage(toNumber(v16), toNumber(b16))
    );
    sh.getCell("W17").value = changeToDash(
      calcPercentage(toNumber(v17), toNumber(b17))
    );
    sh.getCell("W18").value = changeToDash(
      calcPercentage(toNumber(v18), toNumber(b18))
    );
    sh.getCell("W19").value = changeToDash(
      calcPercentage(toNumber(v19), toNumber(b19))
    );
    sh.getCell("W20").value = changeToDash(
      calcPercentage(toNumber(obj["10_1_1"]), toNumber(b20))
    );
    sh.getCell("W21").value = changeToDash(
      calcPercentage(toNumber(obj["10_1_2"]), toNumber(b21))
    );
    sh.getCell("W22").value = changeToDash(
      calcPercentage(toNumber(obj["10_1_3"]), toNumber(b22))
    );
    sh.getCell("W23").value = changeToDash(
      calcPercentage(toNumber(obj["10_1_4"]), toNumber(b23))
    );
    sh.getCell("W24").value = changeToDash(
      calcPercentage(toNumber(obj["10_1_5"]), toNumber(b24))
    );
    sh.getCell("W25").value = changeToDash(
      calcPercentage(toNumber(obj["10_1_6"]), toNumber(b25))
    );
    sh.getCell("W26").value = changeToDash(
      calcPercentage(toNumber(v26), toNumber(b26))
    );
    sh.getCell("W27").value = changeToDash(
      calcPercentage(toNumber(obj["10_6_1"]), toNumber(b27))
    );
    sh.getCell("W28").value = changeToDash(
      calcPercentage(toNumber(obj["10_6_2"]), toNumber(b28))
    );
    sh.getCell("W29").value = changeToDash(
      calcPercentage(toNumber(obj["10_6_3"]), toNumber(b29))
    );
    sh.getCell("W30").value = changeToDash(
      calcPercentage(toNumber(obj["10_6_4"]), toNumber(b30))
    );
    sh.getCell("W31").value = changeToDash(
      calcPercentage(toNumber(obj["10_6_5"]), toNumber(b31))
    );
    sh.getCell("W32").value = changeToDash(
      calcPercentage(toNumber(obj["10_6_6"]), toNumber(b32))
    );
    sh.getCell("W33").value = changeToDash(
      calcPercentage(toNumber(v33), toNumber(b33))
    );
    sh.getCell("W34").value = changeToDash(
      calcPercentage(toNumber(obj["10_7_1"]), toNumber(b34))
    );
    sh.getCell("W35").value = changeToDash(
      calcPercentage(toNumber(obj["10_7_2"]), toNumber(b35))
    );
    sh.getCell("W36").value = changeToDash(
      calcPercentage(toNumber(obj["10_7_3"]), toNumber(b36))
    );
    sh.getCell("W37").value = changeToDash(
      calcPercentage(toNumber(obj["10_7_4"]), toNumber(b37))
    );
    sh.getCell("W38").value = changeToDash(
      calcPercentage(toNumber(obj["10_7_5"]), toNumber(b38))
    );
    sh.getCell("W39").value = changeToDash(
      calcPercentage(toNumber(obj["10_7_6"]), toNumber(b39))
    );
    sh.getCell("W40").value = changeToDash(
      calcPercentage(toNumber(v40), toNumber(b40))
    );
    sh.getCell("W41").value = changeToDash(
      calcPercentage(toNumber(obj["10_3_1"]), toNumber(b41))
    );
    sh.getCell("W42").value = changeToDash(
      calcPercentage(toNumber(obj["10_3_2"]), toNumber(b42))
    );
    sh.getCell("W43").value = changeToDash(
      calcPercentage(toNumber(obj["10_3_3"]), toNumber(b43))
    );
    sh.getCell("W44").value = changeToDash(
      calcPercentage(toNumber(obj["10_3_4"]), toNumber(b44))
    );
    sh.getCell("W45").value = changeToDash(
      calcPercentage(toNumber(obj["10_3_5"]), toNumber(b45))
    );
    sh.getCell("W46").value = changeToDash(
      calcPercentage(toNumber(obj["10_3_6"]), toNumber(b46))
    );
    sh.getCell("W47").value = changeToDash(
      calcPercentage(toNumber(v47), toNumber(b47))
    );
    sh.getCell("W48").value = changeToDash(
      calcPercentage(toNumber(obj["10_4_1"]), toNumber(b48))
    );
    sh.getCell("W49").value = changeToDash(
      calcPercentage(toNumber(obj["10_4_2"]), toNumber(b49))
    );
    sh.getCell("W50").value = changeToDash(
      calcPercentage(toNumber(obj["10_4_3"]), toNumber(b50))
    );
    sh.getCell("W51").value = changeToDash(
      calcPercentage(toNumber(obj["10_4_4"]), toNumber(b51))
    );
    sh.getCell("W52").value = changeToDash(
      calcPercentage(toNumber(obj["10_4_5"]), toNumber(b52))
    );
    sh.getCell("W53").value = changeToDash(
      calcPercentage(toNumber(obj["10_4_6"]), toNumber(b53))
    );
    sh.getCell("W54").value = changeToDash(
      calcPercentage(toNumber(v54), toNumber(b54))
    );
    sh.getCell("W55").value = changeToDash(
      calcPercentage(toNumber(obj["10_5_1"]), toNumber(b55))
    );
    sh.getCell("W56").value = changeToDash(
      calcPercentage(toNumber(obj["10_5_2"]), toNumber(b56))
    );
    sh.getCell("W57").value = changeToDash(
      calcPercentage(toNumber(obj["10_5_3"]), toNumber(b57))
    );
    sh.getCell("W58").value = changeToDash(
      calcPercentage(toNumber(obj["10_5_4"]), toNumber(b58))
    );
    sh.getCell("W59").value = changeToDash(
      calcPercentage(toNumber(obj["10_5_5"]), toNumber(b59))
    );
    sh.getCell("W60").value = changeToDash(
      calcPercentage(toNumber(obj["10_5_6"]), toNumber(b60))
    );

    try {
      const filePath = path.resolve(
        __dirname,
        `../resource/files/ptable01_${isWeight ? "weight" : "unweight"}.xlsx`
      );
      await wb.xlsx.writeFile(filePath).then(() => {
        const err = NewCommonError(code.SUCCESS);

        const data: any = {
          datetime: new Date().toLocaleString(),
          file_path: filePath,
          type: isWeight ? "weight" : "unweight",
        };

        res.status(HttpStatusCode[<number>err.code]).send({ ...data, ...err });
      });
    } catch (err) {
      // console.log(err);
      const error = NewCommonError(code.ERR_INTERNAL);
      res.status(HttpStatusCode[<number>error.code]).send({ ...error });
    }
  });
});

export { printReport };
