import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setLoading } from "../..";
import { LoadingActions } from "../../../actions";
import { NewsTypes as TYPES } from "../../../actionTypes";
import { NewsActions, LoadNewsRequestAction, LoadNewsSuccessAction, LoadNewsFailureAction, LoadFeaturedNewsRequestAction, LoadFeaturedNewsSuccessAction, LoadFeaturedNewsFailureAction, LoadSelectedNewsRequestAction, LoadSelectedNewsSuccessAction, LoadSelectedNewsFailureAction, ResetNewsDataAction } from "../../../actions";
import { News, ErrorResponse } from "../../../../interfaces";

export const loadNewsRequest = (): LoadNewsRequestAction => ({
  type: TYPES.LOAD_NEWS_REQUEST,
});
  
export const loadNewsSuccess = (data: { totalPages: number; data: News[]; }): LoadNewsSuccessAction => ({
  type: TYPES.LOAD_NEWS_SUCCESS,
  payload: data,
});
  
export const loadNewsFailure = (error: string): LoadNewsFailureAction => ({
  type: TYPES.LOAD_NEWS_FAILURE,
  payload: error,
});
  
export const loadFeaturedNewsRequest = (): LoadFeaturedNewsRequestAction => ({
  type: TYPES.LOAD_FEATURED_NEWS_REQUEST,
});
  
export const loadFeaturedNewsSuccess = (data: News): LoadFeaturedNewsSuccessAction => ({
  type: TYPES.LOAD_FEATURED_NEWS_SUCCESS,
  payload: data,
});
  
export const loadFeaturedNewsFailure = (error: string): LoadFeaturedNewsFailureAction => ({
  type: TYPES.LOAD_FEATURED_NEWS_FAILURE,
  payload: error,
});

export const loadSelectedNewsRequest = (): LoadSelectedNewsRequestAction => ({
  type: TYPES.LOAD_SELECTED_NEWS_REQUEST,
});
  
export const loadSelectedNewsSuccess = (data: News): LoadSelectedNewsSuccessAction => ({
  type: TYPES.LOAD_SELECTED_NEWS_SUCCESS,
  payload: data,
});
  
export const loadSelectedNewsFailure = (error: string): LoadSelectedNewsFailureAction => ({
  type: TYPES.LOAD_SELECTED_NEWS_FAILURE,
  payload: error,
});

export const resetNewsData = (): ResetNewsDataAction => ({
  type: TYPES.RESET_NEWS_DATA,
});

export const loadNewsData = (page: number, limit: number) => async (dispatch: Dispatch<NewsActions | LoadingActions>) => {
  dispatch(loadNewsRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/news?page=${page}&limit=${limit}`)
      .then((response: AxiosResponse) => {
        dispatch(loadNewsSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadNewsFailure(errorMessage));
      })      
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};

export const loadFeaturedNewsData = () => async (dispatch: Dispatch<NewsActions | LoadingActions>) => {
  dispatch(loadFeaturedNewsRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/news/featured`)
      .then((response: AxiosResponse) => {
        dispatch(loadFeaturedNewsSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadFeaturedNewsFailure(errorMessage));
      })      
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};

export const loadSelectedNewsData = (selectedNewsId: string) => async (dispatch: Dispatch<NewsActions | LoadingActions>) => {
  dispatch(loadSelectedNewsRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/news/details/${selectedNewsId}`)
      .then((response: AxiosResponse) => {
        dispatch(loadSelectedNewsSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadSelectedNewsFailure(errorMessage));
      })      
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};