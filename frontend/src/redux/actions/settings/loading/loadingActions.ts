import { LoadingTypes as TYPES } from "../../../actionTypes";

interface SetLoadingAction {
  type: typeof TYPES.SET_LOADING;
  payload: boolean;
}

export type LoadingActions = SetLoadingAction;
