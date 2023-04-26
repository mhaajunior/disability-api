import { Request, Response } from "express";
import Household from "../models/schemas/household.schema";
import {
  changeNegativeToEmpty,
  changeEmptyToNegative,
} from "../helpers/commom.helper";

const fetchHouseholds = async (req: Request, res: Response) => {
  const householdId = req.query.id || null;
  if (householdId) {
    Household.findById(householdId)
      .then((household: any) => {
        if (household) {
          household.enum_gr = changeEmptyToNegative(household.enum_gr);
          household.members = changeEmptyToNegative(household.members);
          household.mem_dis = changeEmptyToNegative(household.mem_dis);
          res.status(200).send({ status: "success", household });
        } else {
          res.status(400).send({ status: "error" });
        }
      })
      .catch((err) => res.status(500).send({ ...err }));
  } else {
    Household.find()
      .then((households) => {
        res.status(200).send({ status: "success", households });
      })
      .catch((err) => res.status(500).send({ ...err }));
  }
};

const addHousehold = async (req: Request, res: Response) => {
  const {
    reg,
    cwt,
    amp,
    tmb,
    area,
    ea,
    vil,
    psu_no,
    ea_set,
    month,
    yr,
    hh_no,
    list_gr,
    enum_gr,
    members,
    listing,
    mem_dis,
  } = req.body.data;

  const household = new Household({
    reg,
    cwt,
    amp,
    tmb,
    area,
    ea,
    vil,
    psu_no,
    ea_set,
    month,
    yr,
    hh_no,
    list_gr,
    enum_gr: changeNegativeToEmpty(enum_gr),
    members: changeNegativeToEmpty(members),
    listing,
    mem_dis: changeNegativeToEmpty(mem_dis),
    enum: req.body.data.enum,
    status: req.body.status,
  });

  household
    .save()
    .then((result) => {
      res.status(200).send({ status: "success" });
    })
    .catch((err) => {
      res.status(500).send({ ...err });
    });
};

const editHousehold = async (req: Request, res: Response) => {
  const householdId = req.params.id;
  const {
    reg,
    cwt,
    amp,
    tmb,
    area,
    ea,
    vil,
    psu_no,
    ea_set,
    month,
    yr,
    hh_no,
    list_gr,
    enum_gr,
    members,
    listing,
    mem_dis,
  } = req.body;

  Household.findById(householdId)
    .then((household: any) => {
      household.reg = reg;
      household.cwt = cwt;
      household.amp = amp;
      household.tmb = tmb;
      household.area = area;
      household.ea = ea;
      household.vil = vil;
      household.psu_no = psu_no;
      household.ea_set = ea_set;
      household.month = month;
      household.yr = yr;
      household.hh_no = hh_no;
      household.list_gr = list_gr;
      household.enum_gr = changeNegativeToEmpty(enum_gr);
      household.members = changeNegativeToEmpty(members);
      household.listing = listing;
      household.mem_dis = changeNegativeToEmpty(mem_dis);
      household.enum = req.body.enum;
      household.edit_date = new Date();
      return household.save();
    })
    .then((result) => {
      res.status(200).send({ status: "success" });
    })
    .catch((err) => res.status(500).send({ ...err }));
};

const deleteHousehold = async (req: Request, res: Response) => {
  const householdId = req.params.id;
  Household.findByIdAndRemove(householdId)
    .then(() => {
      res.status(200).send({ status: "success" });
    })
    .catch((err) => res.status(500).send({ ...err }));
};

export { fetchHouseholds, addHousehold, editHousehold, deleteHousehold };
