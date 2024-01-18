import { combineReducers } from "redux";

import { loadingReducer } from "./loading/loadingReducer";
import { toggleMenuReducer } from "./interface/desktop/toggleMenuReducer";
import { toggleModalReducer } from "./interface/desktop/toggleModalReducer";
import { toggleFirstMenuReducer } from "./interface/mobile/toggleFirstMenuReducer";
import { toggleSecondMenuReducer } from "./interface/mobile/toggleSecondMenuReducer";
import { appearanceReducer } from "./interface/appearance/appearanceReducer";

const desktopReducer = combineReducers({
  isToggleMenu: toggleMenuReducer,
  isOpenModal: toggleModalReducer,
});

const mobileReducer = combineReducers({
  isToggleFirstMenu: toggleFirstMenuReducer,
  isToggleSecondMenu: toggleSecondMenuReducer,
});

const interfaceReducer = combineReducers({
  desktop: desktopReducer,
  mobile: mobileReducer,
  appearance: appearanceReducer,
});

export const settingsReducer = combineReducers({
  isLoading: loadingReducer,
  interface: interfaceReducer,
});
