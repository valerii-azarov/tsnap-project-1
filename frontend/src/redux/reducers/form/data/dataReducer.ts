import { DataTypes as TYPES } from "../../../actionTypes";
import { DataActions } from "../../../actions";
import { Data } from "../../../../interfaces";

const initialState: Data = {
  surname: "",
  name: "",
  patronymic: "",
  phone: "+380",
  consent: false,
};

export const dataReducer = (state = initialState, action: DataActions): Data => {
  switch (action.type) {
    case TYPES.SET_DATA:
      return {
        ...state,
        ...action.payload,
      };

    case TYPES.RESET_DATA:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
