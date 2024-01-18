import { NewsTypes as TYPES } from "../../../actionTypes";
import { News } from "../../../../interfaces";

export interface LoadNewsRequestAction {
  type: typeof TYPES.LOAD_NEWS_REQUEST;
}

export interface LoadNewsSuccessAction {
  type: typeof TYPES.LOAD_NEWS_SUCCESS;
  payload: {
    totalPages: number;
    data: News[];
  };
}

export interface LoadNewsFailureAction {
  type: typeof TYPES.LOAD_NEWS_FAILURE;
  payload: string;
}

export interface LoadFeaturedNewsRequestAction {
  type: typeof TYPES.LOAD_FEATURED_NEWS_REQUEST;
}

export interface LoadFeaturedNewsSuccessAction {
  type: typeof TYPES.LOAD_FEATURED_NEWS_SUCCESS;
  payload: News;
}

export interface LoadFeaturedNewsFailureAction {
  type: typeof TYPES.LOAD_FEATURED_NEWS_FAILURE;
  payload: string;
}

export interface LoadSelectedNewsRequestAction {
  type: typeof TYPES.LOAD_SELECTED_NEWS_REQUEST;
}

export interface LoadSelectedNewsSuccessAction {
  type: typeof TYPES.LOAD_SELECTED_NEWS_SUCCESS;
  payload: News;
}

export interface LoadSelectedNewsFailureAction {
  type: typeof TYPES.LOAD_SELECTED_NEWS_FAILURE;
  payload: string;
}

export interface ResetNewsDataAction {
  type: typeof TYPES.RESET_NEWS_DATA,
};

export type NewsActions =
  | LoadNewsRequestAction
  | LoadNewsSuccessAction
  | LoadNewsFailureAction
  | LoadFeaturedNewsRequestAction
  | LoadFeaturedNewsSuccessAction
  | LoadFeaturedNewsFailureAction
  | LoadSelectedNewsRequestAction
  | LoadSelectedNewsSuccessAction
  | LoadSelectedNewsFailureAction
  | ResetNewsDataAction;