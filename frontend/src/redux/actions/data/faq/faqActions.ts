import { FaqTypes as TYPES } from "../../../actionTypes";
import { Faq } from "../../../../interfaces";

export interface LoadFaqRequestAction {
  type: typeof TYPES.LOAD_FAQ_REQUEST;
}

export interface LoadFaqSuccessAction {
  type: typeof TYPES.LOAD_FAQ_SUCCESS;
  payload: Faq[];
}

export interface LoadFaqFailureAction {
  type: typeof TYPES.LOAD_FAQ_FAILURE;
  payload: string;
}

export interface ResetFaqDataAction {
  type: typeof TYPES.RESET_FAQ_DATA,
};

export type FaqActions =
  | LoadFaqRequestAction
  | LoadFaqSuccessAction
  | LoadFaqFailureAction
  | ResetFaqDataAction;