import { OfficesTypes as TYPES } from "../../../actionTypes/data/dataTypes";
import { Office } from "../../../../interfaces";

export interface LoadOfficesRequestAction {
  type: typeof TYPES.LOAD_OFFICES_REQUEST;
}

export interface LoadOfficesSuccessAction {
  type: typeof TYPES.LOAD_OFFICES_SUCCESS;
  payload: Office[];
}

export interface LoadOfficesFailureAction {
  type: typeof TYPES.LOAD_OFFICES_FAILURE;
  payload: string;
}

export interface SetSelectedOfficeAction {
  type: typeof TYPES.SET_SELECTED_OFFICE;
  payload: Office;
}

export interface ResetOfficesDataAction {
  type: TYPES.RESET_OFFICES_DATA,
};

export type OfficesActions = 
  | LoadOfficesRequestAction 
  | LoadOfficesSuccessAction 
  | LoadOfficesFailureAction
  | SetSelectedOfficeAction
  | ResetOfficesDataAction;


