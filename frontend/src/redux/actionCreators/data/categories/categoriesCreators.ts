import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setLoading } from "../..";
import { LoadingActions } from "../../../actions";
import { CategoriesTypes as TYPES } from "../../../actionTypes";
import { CategoriesActions, LoadCategoriesRequestAction, LoadCategoriesSuccessAction, LoadCategoriesFailureAction, SetSelectedCategoryAction, ResetCategoriesDataAction } from "../../../actions";
import { Category, ErrorResponse } from "../../../../interfaces";

export const loadCategoriesRequest = (): LoadCategoriesRequestAction => ({
  type: TYPES.LOAD_CATEGORIES_REQUEST,
});

export const loadCategoriesSuccess = (data: Category[]): LoadCategoriesSuccessAction => ({
  type: TYPES.LOAD_CATEGORIES_SUCCESS,
  payload: data,
});

export const loadCategoriesFailure = (error: string): LoadCategoriesFailureAction => ({
  type: TYPES.LOAD_CATEGORIES_FAILURE,
  payload: error,
});

export const setSelectedCategory = (category: Category): SetSelectedCategoryAction => ({
  type: TYPES.SET_SELECTED_CATEGORY,
  payload: category,
});

export const resetCategoriesData = (): ResetCategoriesDataAction => ({
  type: TYPES.RESET_CATEGORIES_DATA,
});

export const loadCategoriesData = () => async (dispatch: Dispatch<CategoriesActions | LoadingActions>) => {
  dispatch(loadCategoriesRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/categories`)
      .then((response: AxiosResponse) => {
        dispatch(loadCategoriesSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadCategoriesFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};
