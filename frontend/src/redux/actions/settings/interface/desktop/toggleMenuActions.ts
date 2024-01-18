import { ToggleMenuTypes as TYPES } from "../../../../actionTypes";

interface SetToggleMenuAction {
  type: typeof TYPES.TOGGLE_MENU;
}

export type ToggleMenuActions = SetToggleMenuAction;
