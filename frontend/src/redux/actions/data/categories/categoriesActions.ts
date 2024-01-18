import { CategoriesTypes as TYPES } from "../../../actionTypes";
import { Category } from "../../../../interfaces";

export interface LoadCategoriesRequestAction {
  type: typeof TYPES.LOAD_CATEGORIES_REQUEST;
}

export interface LoadCategoriesSuccessAction {
  type: typeof TYPES.LOAD_CATEGORIES_SUCCESS;
  payload: Category[];
}

export interface LoadCategoriesFailureAction {
  type: typeof TYPES.LOAD_CATEGORIES_FAILURE;
  payload: string;
}

export interface SetSelectedCategoryAction {
  type: typeof TYPES.SET_SELECTED_CATEGORY;
  payload: Category;
}

export interface ResetCategoriesDataAction {
  type: typeof TYPES.RESET_CATEGORIES_DATA,
};

export type CategoriesActions =
  | LoadCategoriesRequestAction
  | LoadCategoriesSuccessAction
  | LoadCategoriesFailureAction
  | SetSelectedCategoryAction
  | ResetCategoriesDataAction;
