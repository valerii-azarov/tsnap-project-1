import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setLoading } from "../..";
import { LoadingActions } from "../../../actions";
import { FaqTypes as TYPES } from "../../../actionTypes";
import { FaqActions, LoadFaqRequestAction, LoadFaqSuccessAction, LoadFaqFailureAction, ResetFaqDataAction } from "../../../actions";
import { Faq, ErrorResponse } from "../../../../interfaces";

export const loadFaqRequest = (): LoadFaqRequestAction => ({
  type: TYPES.LOAD_FAQ_REQUEST,
});
  
export const loadFaqSuccess = (data: Faq[]): LoadFaqSuccessAction => ({
  type: TYPES.LOAD_FAQ_SUCCESS,
  payload: data,
});
  
export const loadFaqFailure = (error: string): LoadFaqFailureAction => ({
  type: TYPES.LOAD_FAQ_FAILURE,
  payload: error,
});

export const resetFaqData = (): ResetFaqDataAction => ({
  type: TYPES.RESET_FAQ_DATA,
});

export const loadFaqData = () => async (dispatch: Dispatch<FaqActions | LoadingActions>) => {
  dispatch(loadFaqRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/faq`)
      .then((response: AxiosResponse) => {
        dispatch(loadFaqSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadFaqFailure(errorMessage));
      })      
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};
