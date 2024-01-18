import moment from "moment";
import { otpData } from "../data/otpData.js";
import { codeValidityIntervalMinutes } from "../config/constants.js"

export const validateCode = (userEnteredCode) => {
  if (otpData.code === userEnteredCode) {
    const currentTime = moment();
    const duration = moment.duration(currentTime.diff(otpData.timestamp));
    const minutesPassed = duration.asMinutes();
    return minutesPassed <= codeValidityIntervalMinutes;
  }
  return false;
};
