import { combineReducers } from "redux";

import { settingsReducer } from "./settings/settingsReducer";
import { dataReducer } from "./data/dataReducer";
import { formReducer } from "./form/formReducer";

const rootReducer = combineReducers({
  settings: settingsReducer,
  data: dataReducer,
  form: formReducer,
});

export default rootReducer;
