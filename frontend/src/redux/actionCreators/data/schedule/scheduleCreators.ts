import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setLoading } from "../..";
import { LoadingActions } from "../../../actions";
import { ScheduleTypes as TYPES } from "../../../actionTypes";
import { ScheduleActions, LoadScheduleRequestAction, LoadScheduleSuccessAction, LoadScheduleFailureAction, SetSelectedRecordAction, ResetScheduleDataAction } from "../../../actions";
import { Schedule, Record, ErrorResponse } from "../../../../interfaces";

const loadScheduleRequest = (): LoadScheduleRequestAction => ({
  type: TYPES.LOAD_SCHEDULE_REQUEST,
});

const loadScheduleSuccess = (data: Schedule): LoadScheduleSuccessAction => ({
  type: TYPES.LOAD_SCHEDULE_SUCCESS,
  payload: data,
});

const loadScheduleFailure = (error: string): LoadScheduleFailureAction => ({
  type: TYPES.LOAD_SCHEDULE_FAILURE,
  payload: error,
});

export const setSelectedRecord = (record: Record): SetSelectedRecordAction => ({
  type: TYPES.SET_SELECTED_RECORD,
  payload: record,
});

export const resetScheduleData = (): ResetScheduleDataAction => ({
  type: TYPES.RESET_SCHEDULE_DATA,
});

export const loadScheduleData = (selectedOfficeId: number, selectedServiceId: number) => async (dispatch: Dispatch<ScheduleActions | LoadingActions>) => {
  dispatch(loadScheduleRequest());
  dispatch(setLoading(true));
  
  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/schedule/${selectedOfficeId}/${selectedServiceId}`)
      .then((response: AxiosResponse) => {
        dispatch(loadScheduleSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadScheduleFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};
