import { LoadingTypes as TYPES } from "../../../actionTypes";
import { LoadingActions } from "../../../actions";

export const loadingReducer = (state = false, action: LoadingActions): boolean => {
  return action.type === TYPES.SET_LOADING ? action.payload : state;
};
