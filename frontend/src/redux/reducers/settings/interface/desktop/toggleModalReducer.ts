import { ToggleModalActions } from "../../../../actions/settings/settingsActions";
import { ToggleModalTypes as TYPES } from "../../../../actionTypes/settings/settingsTypes";

export const toggleModalReducer = (state = false, action: ToggleModalActions): boolean => {
  return action.type === TYPES.TOGGLE_MODAL ? !state : state;
};
