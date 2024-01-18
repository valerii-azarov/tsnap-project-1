import { ScheduleTypes as TYPES } from "../../../actionTypes";
import { Schedule, Record } from "../../../../interfaces";

export interface LoadScheduleRequestAction {
  type: typeof TYPES.LOAD_SCHEDULE_REQUEST;
}

export interface LoadScheduleSuccessAction {
  type: typeof TYPES.LOAD_SCHEDULE_SUCCESS;
  payload: Schedule;
}

export interface LoadScheduleFailureAction {
  type: typeof TYPES.LOAD_SCHEDULE_FAILURE;
  payload: string;
}

export interface SetSelectedRecordAction {
  type: typeof TYPES.SET_SELECTED_RECORD;
  payload: Record;
}

export interface ResetScheduleDataAction {
  type: TYPES.RESET_SCHEDULE_DATA,
};

export type ScheduleActions = 
  | LoadScheduleRequestAction 
  | LoadScheduleSuccessAction 
  | LoadScheduleFailureAction
  | SetSelectedRecordAction
  | ResetScheduleDataAction;
