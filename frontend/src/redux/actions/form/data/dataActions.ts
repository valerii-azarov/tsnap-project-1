import { DataTypes as TYPES } from "../../../actionTypes";
import { Data } from "../../../../interfaces";

export interface SetDataAction {
  type: typeof TYPES.SET_DATA;
  payload: Data;
}

export interface ResetDataAction {
  type: typeof TYPES.RESET_DATA,
};

export type DataActions = 
 | SetDataAction
 | ResetDataAction;
