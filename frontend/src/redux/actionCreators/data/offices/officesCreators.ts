import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setLoading } from "../..";
import { LoadingActions } from "../../../actions";
import { OfficesTypes as TYPES } from "../../../actionTypes";
import { OfficesActions, LoadOfficesRequestAction, LoadOfficesSuccessAction, LoadOfficesFailureAction, SetSelectedOfficeAction, ResetOfficesDataAction } from "../../../actions";
import { Office, ErrorResponse } from "../../../../interfaces";

export const loadOfficesRequest = (): LoadOfficesRequestAction => ({
  type: TYPES.LOAD_OFFICES_REQUEST,
});

export const loadOfficesSuccess = (data: Office[]): LoadOfficesSuccessAction => ({
  type: TYPES.LOAD_OFFICES_SUCCESS,
  payload: data,
});

export const loadOfficesFailure = (error: string): LoadOfficesFailureAction => ({
  type: TYPES.LOAD_OFFICES_FAILURE,
  payload: error,
});

export const setSelectedOffice = (office: Office): SetSelectedOfficeAction => ({
  type: TYPES.SET_SELECTED_OFFICE,
  payload: office,
});

export const resetOfficesData = (): ResetOfficesDataAction => ({
  type: TYPES.RESET_OFFICES_DATA,
});

export const loadOfficesData = (selectedCityId: number) => async (dispatch: Dispatch<OfficesActions | LoadingActions>) => {
  dispatch(loadOfficesRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/offices/${selectedCityId}`)
      .then((response: AxiosResponse) => {
        dispatch(loadOfficesSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadOfficesFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};
