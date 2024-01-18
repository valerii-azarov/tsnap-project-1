import { ToggleSecondMenuTypes as TYPES } from "../../../../actionTypes";
import { ToggleSecondMenuActions } from "../../../../actions";

export const setToggleSecondMenu = (): ToggleSecondMenuActions => ({
  type: TYPES.TOGGLE_MENU_SECOND_MENU,
});
