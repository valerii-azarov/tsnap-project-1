import { ToggleMenuActions } from "../../../../actions/settings/settingsActions";
import { ToggleMenuTypes as TYPES } from "../../../../actionTypes/settings/settingsTypes";

export const toggleMenuReducer = (state = false, action: ToggleMenuActions): boolean => {
  return action.type === TYPES.TOGGLE_MENU ? !state : state;
};
