import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setLoading } from "../..";
import { LoadingActions } from "../../../actions";
import { BookingTypes as TYPES } from "../../../actionTypes";
import { BookingActions, CheckRecordRequestAction, CheckRecordSuccessAction, CheckRecordFailureAction, CreateBookingRequestAction, CreateBookingSuccessAction, CreateBookingFailureAction, CheckBookingStatusRequestAction, CheckBookingStatusSuccessAction, CheckBookingStatusFailureAction, ResetBookingDataAction, ResetBookingStatusDataAction } from "../../../actions";
import { Booking, BookingDetails, BookingCheck, ErrorResponse } from "../../../../interfaces";

const checkRecordRequest = (): CheckRecordRequestAction => ({
  type: TYPES.CHECK_RECORD_REQUEST,
});

const checkRecordSuccess = (): CheckRecordSuccessAction => ({
  type: TYPES.CHECK_RECORD_SUCCESS,
});

const checkRecordFailure = (error: string): CheckRecordFailureAction => ({
  type: TYPES.CHECK_RECORD_FAILURE,
  payload: error,
});

const createBookingRequest = (): CreateBookingRequestAction => ({
  type: TYPES.CREATE_BOOKING_REQUEST,
});

const createBookingSuccess = (data: { id: number }): CreateBookingSuccessAction => ({
  type: TYPES.CREATE_BOOKING_SUCCESS,
  payload: data,
});

const createBookingFailure = (error: string): CreateBookingFailureAction => ({
  type: TYPES.CREATE_BOOKING_FAILURE,
  payload: error,
});

const checkBookingStatusRequest = (): CheckBookingStatusRequestAction => ({
  type: TYPES.CHECK_BOOKING_STATUS_REQUEST,
});

const checkBookingStatusSuccess = (data: Booking[]): CheckBookingStatusSuccessAction => ({
  type: TYPES.CHECK_BOOKING_STATUS_SUCCESS,
  payload: data,
});

const checkBookingStatusFailure = (error: string): CheckBookingStatusFailureAction => ({
  type: TYPES.CHECK_BOOKING_STATUS_FAILURE,
  payload: error,
});

export const resetBookingData = (): ResetBookingDataAction => ({
  type: TYPES.RESET_BOOKING_DATA,
});

export const resetBookingStatusData = (): ResetBookingStatusDataAction => ({
  type: TYPES.RESET_BOOKING_STATUS_DATA,
});

export const checkRecord = (selectedRecordId: number) => async (dispatch: Dispatch<BookingActions | LoadingActions>) => {
  dispatch(checkRecordRequest());
  dispatch(setLoading(true));
  
  setTimeout(() => {
    axios
      .post(`${process.env.REACT_APP_API}/api/booking/check`, { selectedRecordId })
      .then((response: AxiosResponse) => {
        dispatch(checkRecordSuccess());
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(checkRecordFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};

export const createBooking = (data: BookingDetails) => async (dispatch: Dispatch<BookingActions | LoadingActions>) => {
  dispatch(createBookingRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .post(`${process.env.REACT_APP_API}/api/booking/create`, data)
      .then((response: AxiosResponse) => {
        dispatch(createBookingSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(createBookingFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};

export const checkBookingStatus = (data: BookingCheck) => async (dispatch: Dispatch<BookingActions | LoadingActions>) => {
  dispatch(checkBookingStatusRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .post(`${process.env.REACT_APP_API}/api/booking/status`, data)
      .then((response: AxiosResponse) => {
        dispatch(checkBookingStatusSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(checkBookingStatusFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};