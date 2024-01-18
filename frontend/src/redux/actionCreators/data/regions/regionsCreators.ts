import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setLoading } from "../../";
import { LoadingActions } from "../../../actions";
import { RegionsTypes as TYPES } from "../../../actionTypes";
import { RegionsActions, LoadRegionsRequestAction, LoadRegionsSuccessAction, LoadRegionsFailureAction, SetSelectedRegionAction, ResetRegionsDataAction } from "../../../actions";
import { Region, ErrorResponse } from "../../../../interfaces";

export const loadRegionsRequest = (): LoadRegionsRequestAction => ({
  type: TYPES.LOAD_REGIONS_REQUEST,
});

export const loadRegionsSuccess = (data: Region[]): LoadRegionsSuccessAction => ({
  type: TYPES.LOAD_REGIONS_SUCCESS,
  payload: data,
});

export const loadRegionsFailure = (error: string): LoadRegionsFailureAction => ({
  type: TYPES.LOAD_REGIONS_FAILURE,
  payload: error,
});

export const setSelectedRegion = (region: Region): SetSelectedRegionAction => ({
  type: TYPES.SET_SELECTED_REGION,
  payload: region,
});

export const resetRegionsData = (): ResetRegionsDataAction => ({
  type: TYPES.RESET_REGIONS_DATA,
});

export const loadRegionsData = () => async (dispatch: Dispatch<RegionsActions | LoadingActions>) => {
  dispatch(loadRegionsRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/regions`)
      .then((response: AxiosResponse) => {
        dispatch(loadRegionsSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadRegionsFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};
