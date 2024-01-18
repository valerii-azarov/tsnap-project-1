import { AppearanceTypes as TYPES } from "../../../../actionTypes";
import { AppearanceActions, } from "../../../../actions";
import { Appearance } from "../../../../../interfaces";

const defaultAppearance: Appearance = {
  background: "#d8f5a2",
  text: "Всеукраїнський",
  welcome: "Ласкаво просимо до України",
  image: "default.png",
};

type AppearanceState = {
  data: Appearance;
  error: string | null;
}

const initialState: AppearanceState = {
  data: defaultAppearance,
  error: null,
};

export const appearanceReducer = (state = initialState, action: AppearanceActions): AppearanceState => {
  switch (action.type) {
    case TYPES.LOAD_APPEARANCE_REQUEST:
      return {
        ...state,
        error:  null,
      };

    case TYPES.LOAD_APPEARANCE_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };

    case TYPES.LOAD_APPEARANCE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.RESET_APPEARANCE_DATA:
      return {
        ...state,
        data: defaultAppearance,
        error: null,
      };

    default:
      return state;
  }
};

