import { combineReducers } from "redux";

import { stepReducer } from "./step/stepReducer";
import { bookingReducer } from "./booking/bookingReducer";
import { otpReducer } from "./otp/otpReducer";
import { dataReducer } from "./data/dataReducer";

export const formReducer = combineReducers({
  step: stepReducer,
  booking: bookingReducer,
  otp: otpReducer,
  data: dataReducer,
});
