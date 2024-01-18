import { ServiceTypesTypes as TYPES } from "../../../actionTypes";
import { ServiceType } from "../../../../interfaces";

export interface LoadServiceTypesRequestAction {
  type: typeof TYPES.LOAD_SERVICE_TYPES_REQUEST;
}

export interface LoadServiceTypesSuccessAction {
  type: typeof TYPES.LOAD_SERVICE_TYPES_SUCCESS;
  payload: ServiceType[];
}

export interface LoadServiceTypesFailureAction {
  type: typeof TYPES.LOAD_SERVICE_TYPES_FAILURE;
  payload: string;
}

export interface SetSelectedServiceTypeAction {
  type: typeof TYPES.SET_SELECTED_SERVICE_TYPE;
  payload: ServiceType;
}

export interface ResetServiceTypesDataAction {
  type: TYPES.RESET_SERVICE_TYPES_DATA,
};

export type ServiceTypesActions =
  | LoadServiceTypesRequestAction
  | LoadServiceTypesSuccessAction
  | LoadServiceTypesFailureAction
  | SetSelectedServiceTypeAction
  | ResetServiceTypesDataAction;
