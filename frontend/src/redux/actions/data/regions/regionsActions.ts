import { RegionsTypes as TYPES } from "../../../actionTypes";
import { Region } from "../../../../interfaces";

export interface LoadRegionsRequestAction {
  type: typeof TYPES.LOAD_REGIONS_REQUEST;
}

export interface LoadRegionsSuccessAction {
  type: typeof TYPES.LOAD_REGIONS_SUCCESS;
  payload: Region[];
}

export interface LoadRegionsFailureAction {
  type: typeof TYPES.LOAD_REGIONS_FAILURE;
  payload: string;
}

export interface SetSelectedRegionAction {
  type: typeof TYPES.SET_SELECTED_REGION;
  payload: Region;
}

export interface ResetRegionsDataAction {
  type: typeof TYPES.RESET_REGIONS_DATA,
};

export type RegionsActions =
  | LoadRegionsRequestAction
  | LoadRegionsSuccessAction
  | LoadRegionsFailureAction
  | SetSelectedRegionAction
  | ResetRegionsDataAction;
