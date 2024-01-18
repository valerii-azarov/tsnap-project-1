import { ToggleModalTypes as TYPES } from "../../../../actionTypes";
import { ToggleModalActions } from "../../../../actions";

export const setToggleModal = (): ToggleModalActions => ({
  type: TYPES.TOGGLE_MODAL,
});
