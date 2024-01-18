import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setLoading } from "../..";
import { LoadingActions } from "../../../actions";
import { OtpTypes as TYPES } from "../../../actionTypes";
import { OtpActions, SendOtpRequestAction, SendOtpSuccessAction, SendOtpFailureAction, VerifyOtpRequestAction, VerifyOtpSuccessAction, VerifyOtpFailureAction, ResetOtpDataAction } from "../../../actions";
import { ErrorResponse } from "../../../../interfaces";

const sendOtpRequest = (): SendOtpRequestAction => ({
  type: TYPES.SEND_OTP_REQUEST,
});

const sendOtpSuccess = (): SendOtpSuccessAction => ({
  type: TYPES.SEND_OTP_SUCCESS,
});

const sendOtpFailure = (error: string): SendOtpFailureAction => ({
  type: TYPES.SEND_OTP_FAILURE,
  payload: error,
});

const verifyOtpRequest = (): VerifyOtpRequestAction => ({
  type: TYPES.VERIFY_OTP_REQUEST,
});

const verifyOtpSuccess = (): VerifyOtpSuccessAction => ({
  type: TYPES.VERIFY_OTP_SUCCESS,
});

const verifyOtpFailure = (error: string): VerifyOtpFailureAction => ({
  type: TYPES.VERIFY_OTP_FAILURE,
  payload: error,
});

export const resetOtpData = (): ResetOtpDataAction => ({
  type: TYPES.RESET_OTP_DATA,
});

export const sendOtp = (phone: string) => async (dispatch: Dispatch<OtpActions | LoadingActions>) => {
  dispatch(sendOtpRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .post(`${process.env.REACT_APP_API}/api/otp/send`, { phone })
      .then((response: AxiosResponse) => {
        dispatch(sendOtpSuccess());
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(sendOtpFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};

export const verifyOtp = (userEnteredCode: string) => async (dispatch: Dispatch<OtpActions | LoadingActions>) => {
  dispatch(verifyOtpRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .post(`${process.env.REACT_APP_API}/api/otp/verify`, { userEnteredCode })
      .then((response: AxiosResponse) => {
        dispatch(verifyOtpSuccess());
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(verifyOtpFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};
