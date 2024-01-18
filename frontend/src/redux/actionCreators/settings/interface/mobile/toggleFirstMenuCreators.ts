import { ToggleFirstMenuTypes as TYPES } from "../../../../actionTypes";
import { ToggleFirstMenuActions } from "../../../../actions";

export const setToggleFirstMenu = (): ToggleFirstMenuActions => ({
  type: TYPES.TOGGLE_MENU_FIRST_MENU,
});
