import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setLoading } from "../..";
import { LoadingActions } from "../../../actions";
import { CitiesTypes as TYPES } from "../../../actionTypes";
import { CitiesActions, LoadCitiesRequestAction, LoadCitiesSuccessAction, LoadCitiesFailureAction, SetSelectedCityAction, ResetCitiesDataAction } from "../../../actions";
import { City, ErrorResponse } from "../../../../interfaces";

export const loadCitiesRequest = (): LoadCitiesRequestAction => ({
  type: TYPES.LOAD_CITIES_REQUEST,
});

export const loadCitiesSuccess = (data: City[]): LoadCitiesSuccessAction => ({
  type: TYPES.LOAD_CITIES_SUCCESS,
  payload: data,
});

export const loadCitiesFailure = (error: string): LoadCitiesFailureAction => ({
  type: TYPES.LOAD_CITIES_FAILURE,
  payload: error,
});

export const setSelectedCity = (city: City): SetSelectedCityAction => ({
  type: TYPES.SET_SELECTED_CITY,
  payload: city,
});

export const resetCitiesData = (): ResetCitiesDataAction => ({
  type: TYPES.RESET_CITIES_DATA,
});

export const loadCitiesData = () => async (dispatch: Dispatch<CitiesActions | LoadingActions>) => {
  dispatch(loadCitiesRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/cities`)
      .then((response: AxiosResponse) => {
        dispatch(loadCitiesSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadCitiesFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};
