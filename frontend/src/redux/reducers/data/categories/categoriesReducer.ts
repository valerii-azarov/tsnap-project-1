import { CategoriesTypes as TYPES } from "../../../actionTypes";
import { CategoriesActions } from "../../../actions";
import { Category } from "../../../../interfaces";

const defaultCategory: Category = {
  id: null,
  name: "",
};

type CategoriesState = {
  categoryList: Category[];
  selectedCategory: Category;
  error: string | null;
};

const initialState: CategoriesState = {
  categoryList: [],
  selectedCategory: defaultCategory,
  error: null,
};

export const categoriesReducer = (state = initialState, action: CategoriesActions): CategoriesState => {
  switch (action.type) {
    case TYPES.LOAD_CATEGORIES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case TYPES.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categoryList: action.payload,
        error: null,
      };

    case TYPES.LOAD_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case TYPES.RESET_CATEGORIES_DATA:
      return {
        ...state,
        categoryList: [],
      };

    default:
      return state;
  }
};
