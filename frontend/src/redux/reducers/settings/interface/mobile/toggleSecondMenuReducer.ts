import { ToggleSecondMenuActions } from "../../../../actions/settings/settingsActions";
import { ToggleSecondMenuTypes as TYPES } from "../../../../actionTypes/settings/settingsTypes";

export const toggleSecondMenuReducer = (state = false, action: ToggleSecondMenuActions): boolean => {
  return action.type === TYPES.TOGGLE_MENU_SECOND_MENU ? !state : state;
};
