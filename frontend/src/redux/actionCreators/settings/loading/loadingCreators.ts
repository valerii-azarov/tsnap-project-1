import { LoadingTypes as TYPES } from "../../../actionTypes";
import { LoadingActions } from "../../../actions";

export const setLoading = (isLoading: boolean): LoadingActions => ({
  type: TYPES.SET_LOADING,
  payload: isLoading,
});
