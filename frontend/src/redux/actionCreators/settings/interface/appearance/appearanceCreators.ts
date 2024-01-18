import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setLoading } from "../../../";
import { LoadingActions } from "../../../../actions";
import { AppearanceTypes as TYPES } from "../../../../actionTypes";
import { AppearanceActions, LoadAppearanceRequestAction, LoadAppearanceSuccessAction, LoadAppearanceFailureAction, ResetAppearanceDataAction } from "../../../../actions";
import { Appearance, ErrorResponse } from "../../../../../interfaces";

export const loadAppearanceRequest = (): LoadAppearanceRequestAction => ({
  type: TYPES.LOAD_APPEARANCE_REQUEST,
});

export const loadAppearanceSuccess = (data: Appearance): LoadAppearanceSuccessAction => ({
  type: TYPES.LOAD_APPEARANCE_SUCCESS,
  payload: data,
});

export const loadAppearanceFailure = (error: string): LoadAppearanceFailureAction => ({
  type: TYPES.LOAD_APPEARANCE_FAILURE,
  payload: error,
});

export const resetAppearanceData = (): ResetAppearanceDataAction => ({
  type: TYPES.RESET_APPEARANCE_DATA,
});

export const loadAppearanceData = (cityId: number) => async (dispatch: Dispatch<AppearanceActions | LoadingActions>) => {
  dispatch(loadAppearanceRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/appearance/${cityId}`)
      .then((response: AxiosResponse) => {
        dispatch(loadAppearanceSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadAppearanceFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};
