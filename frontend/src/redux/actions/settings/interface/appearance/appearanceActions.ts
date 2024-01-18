import { AppearanceTypes as TYPES } from "../../../../actionTypes";
import { Appearance } from "../../../../../interfaces";

export interface LoadAppearanceRequestAction {
  type: typeof TYPES.LOAD_APPEARANCE_REQUEST;
}

export interface LoadAppearanceSuccessAction {
  type: typeof TYPES.LOAD_APPEARANCE_SUCCESS;
  payload: Appearance;
}

export interface LoadAppearanceFailureAction {
  type: typeof TYPES.LOAD_APPEARANCE_FAILURE;
  payload: string;
}

export interface ResetAppearanceDataAction {
  type: typeof TYPES.RESET_APPEARANCE_DATA,
};

export type AppearanceActions =
  | LoadAppearanceRequestAction
  | LoadAppearanceSuccessAction
  | LoadAppearanceFailureAction
  | ResetAppearanceDataAction;
