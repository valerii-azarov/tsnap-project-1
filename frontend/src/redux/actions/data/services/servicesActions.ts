import { ServicesTypes as TYPES } from "../../../actionTypes";
import { Service, ServiceInfo } from "../../../../interfaces";

export interface LoadServicesRequestAction {
  type: typeof TYPES.LOAD_SERVICES_REQUEST;
}

export interface LoadServicesSuccessAction {
  type: typeof TYPES.LOAD_SERVICES_SUCCESS;
  payload: Service[];
}

export interface LoadServicesFailureAction {
  type: typeof TYPES.LOAD_SERVICES_FAILURE;
  payload: string;
}

export interface LoadPopularServicesRequestAction {
  type: typeof TYPES.LOAD_POPULAR_SERVICES_REQUEST;
}

export interface LoadPopularServicesSuccessAction {
  type: typeof TYPES.LOAD_POPULAR_SERVICES_SUCCESS;
  payload: Service[];
}

export interface LoadPopularServicesFailureAction {
  type: typeof TYPES.LOAD_POPULAR_SERVICES_FAILURE;
  payload: string;
}

export interface LoadSelectedServiceRequestAction {
  type: typeof TYPES.LOAD_SELECTED_SERVICE_REQUEST;
}

export interface LoadSelectedServiceSuccessAction {
  type: typeof TYPES.LOAD_SELECTED_SERVICE_SUCCESS;
  payload: ServiceInfo;
}

export interface LoadSelectedServiceFailureAction {
  type: typeof TYPES.LOAD_SELECTED_SERVICE_FAILURE;
  payload: string;
}

export interface SetSelectedServiceAction {
  type: typeof TYPES.SET_SELECTED_SERVICE;
  payload: Service;
}

export interface ResetServicesDataAction {
  type: TYPES.RESET_SERVICES_DATA,
};

export type ServicesActions =
  | LoadServicesRequestAction
  | LoadServicesSuccessAction
  | LoadServicesFailureAction
  | LoadPopularServicesRequestAction
  | LoadPopularServicesSuccessAction
  | LoadPopularServicesFailureAction
  | LoadSelectedServiceRequestAction
  | LoadSelectedServiceSuccessAction
  | LoadSelectedServiceFailureAction
  | SetSelectedServiceAction
  | ResetServicesDataAction;
