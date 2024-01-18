import { ToggleFirstMenuActions } from "../../../../actions/settings/settingsActions";
import { ToggleFirstMenuTypes as TYPES } from "../../../../actionTypes/settings/settingsTypes";

export const toggleFirstMenuReducer = (state = false, action: ToggleFirstMenuActions): boolean => {
  return action.type === TYPES.TOGGLE_MENU_FIRST_MENU ? !state : state;
};
