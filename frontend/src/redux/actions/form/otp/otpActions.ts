import { OtpTypes as TYPES } from "../../../actionTypes";

export interface SendOtpRequestAction {
  type: typeof TYPES.SEND_OTP_REQUEST;
};

export interface SendOtpSuccessAction {
  type: typeof TYPES.SEND_OTP_SUCCESS;
};

export interface SendOtpFailureAction {
  type: typeof TYPES.SEND_OTP_FAILURE;
  payload: string;
};

export interface VerifyOtpRequestAction {
  type: typeof TYPES.VERIFY_OTP_REQUEST;
};

export interface VerifyOtpSuccessAction {
  type: typeof TYPES.VERIFY_OTP_SUCCESS;
};

export interface VerifyOtpFailureAction {
  type: typeof TYPES.VERIFY_OTP_FAILURE;
  payload: string;
};

export interface ResetOtpDataAction {
  type: typeof TYPES.RESET_OTP_DATA;
}

export type OtpActions =
  | SendOtpRequestAction
  | SendOtpSuccessAction
  | SendOtpFailureAction
  | VerifyOtpRequestAction
  | VerifyOtpSuccessAction
  | VerifyOtpFailureAction
  | ResetOtpDataAction;
