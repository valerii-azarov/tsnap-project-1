import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setLoading } from "../..";
import { LoadingActions } from "../../../actions";
import { ServiceTypesTypes as TYPES } from "../../../actionTypes";
import { ServiceTypesActions, LoadServiceTypesRequestAction, LoadServiceTypesSuccessAction, LoadServiceTypesFailureAction, SetSelectedServiceTypeAction, ResetServiceTypesDataAction } from "../../../actions";
import { ServiceType, ErrorResponse } from "../../../../interfaces";

export const loadServiceTypesRequest = (): LoadServiceTypesRequestAction => ({
  type: TYPES.LOAD_SERVICE_TYPES_REQUEST,
});

export const loadServiceTypesSuccess = (data: ServiceType[]): LoadServiceTypesSuccessAction => ({
  type: TYPES.LOAD_SERVICE_TYPES_SUCCESS,
  payload: data,
});

export const loadServiceTypesFailure = (error: string): LoadServiceTypesFailureAction => ({
  type: TYPES.LOAD_SERVICE_TYPES_FAILURE,
  payload: error,
});

export const setSelectedServiceType = (serviceType: ServiceType): SetSelectedServiceTypeAction => ({
  type: TYPES.SET_SELECTED_SERVICE_TYPE,
  payload: serviceType,
});

export const resetServiceTypesData = (): ResetServiceTypesDataAction => ({
  type: TYPES.RESET_SERVICE_TYPES_DATA,
});

export const loadServiceTypesData = (selectedServiceId: number) => async (dispatch: Dispatch<ServiceTypesActions | LoadingActions>) => {
  dispatch(loadServiceTypesRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/service-types/${selectedServiceId}`)
      .then((response: AxiosResponse) => {
        dispatch(loadServiceTypesSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadServiceTypesFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};
