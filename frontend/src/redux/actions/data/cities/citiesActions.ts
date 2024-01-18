import { CitiesTypes as TYPES } from "../../../actionTypes";
import { City } from "../../../../interfaces";

export interface LoadCitiesRequestAction {
  type: typeof TYPES.LOAD_CITIES_REQUEST;
}

export interface LoadCitiesSuccessAction {
  type: typeof TYPES.LOAD_CITIES_SUCCESS;
  payload: City[];
}

export interface LoadCitiesFailureAction {
  type: typeof TYPES.LOAD_CITIES_FAILURE;
  payload: string;
}

export interface SetSelectedCityAction {
  type: typeof TYPES.SET_SELECTED_CITY;
  payload: City;
}

export interface ResetCitiesDataAction {
  type: TYPES.RESET_CITIES_DATA,
};

export type CitiesActions = 
  | LoadCitiesRequestAction 
  | LoadCitiesSuccessAction 
  | LoadCitiesFailureAction
  | SetSelectedCityAction 
  | ResetCitiesDataAction;
