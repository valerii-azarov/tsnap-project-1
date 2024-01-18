import { ToggleMenuTypes as TYPES } from "../../../../actionTypes";
import { ToggleMenuActions } from "../../../../actions";

export const setToggleMenu = (): ToggleMenuActions => ({
  type: TYPES.TOGGLE_MENU,
});
