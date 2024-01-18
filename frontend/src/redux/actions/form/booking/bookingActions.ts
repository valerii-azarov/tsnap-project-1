import { BookingTypes as TYPES } from "../../../actionTypes";
import { Booking } from "../../../../interfaces";

export interface CheckRecordRequestAction {
  type: typeof TYPES.CHECK_RECORD_REQUEST;
}

export interface CheckRecordSuccessAction {
  type: typeof TYPES.CHECK_RECORD_SUCCESS;
}

export interface CheckRecordFailureAction {
  type: typeof TYPES.CHECK_RECORD_FAILURE;
  payload: string;
}

export interface CreateBookingRequestAction {
  type: typeof TYPES.CREATE_BOOKING_REQUEST;
}

export interface CreateBookingSuccessAction {
  type: typeof TYPES.CREATE_BOOKING_SUCCESS;
  payload: { 
    id: number; 
  };
}

export interface CreateBookingFailureAction {
  type: typeof TYPES.CREATE_BOOKING_FAILURE;
  payload: string;
}

export interface CheckBookingStatusRequestAction {
  type: typeof TYPES.CHECK_BOOKING_STATUS_REQUEST;
}

export interface CheckBookingStatusSuccessAction {
  type: typeof TYPES.CHECK_BOOKING_STATUS_SUCCESS;
  payload: Booking[];
}

export interface CheckBookingStatusFailureAction {
  type: typeof TYPES.CHECK_BOOKING_STATUS_FAILURE;
  payload: string;
}

export interface ResetBookingDataAction {
  type: typeof TYPES.RESET_BOOKING_DATA;
}

export interface ResetBookingStatusDataAction {
  type: typeof TYPES.RESET_BOOKING_STATUS_DATA;
}

export type BookingActions =
  | CheckRecordRequestAction
  | CheckRecordSuccessAction
  | CheckRecordFailureAction
  | CreateBookingRequestAction
  | CreateBookingSuccessAction
  | CreateBookingFailureAction
  | CheckBookingStatusRequestAction
  | CheckBookingStatusSuccessAction
  | CheckBookingStatusFailureAction
  | ResetBookingDataAction
  | ResetBookingStatusDataAction;
