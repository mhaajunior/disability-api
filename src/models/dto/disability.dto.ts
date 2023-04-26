import {
  IStep1,
  IStep2,
  IStep3,
  IStep4,
  IStep5,
  IStep6,
  IStep7,
  IStep8,
  IStep9,
  IStep10,
  IStep11,
} from "./member.dto";

export interface IHousehold {
  reg: string;
  cwt: string;
  amp: string;
  tmb: string;
  area: string;
  ea: string;
  vil: string;
  psu_no: string;
  ea_set: string;
  month: string;
  yr: string;
  hh_no: string;
  list_gr: string;
  enum_gr?: string;
  members?: string;
  listing: string;
  mem_dis?: string;
  enum: string;
}

export interface IMember
  extends IStep1,
    IStep2,
    IStep3,
    IStep4,
    IStep5,
    IStep6,
    IStep7,
    IStep8,
    IStep9,
    IStep10,
    IStep11 {
  ww_hh?: string;
  ww_pop?: string;
  re_f10?: string;
  re_f14?: string;
  re_occ?: string;
  re_ind?: string;
  dif_2_4?: string;
  dif_5_17?: string;
  dif_18?: string;
}

export interface IDisability extends IHousehold, IMember {}
