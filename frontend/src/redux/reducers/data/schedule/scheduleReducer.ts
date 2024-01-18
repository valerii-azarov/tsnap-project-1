import { ScheduleTypes as TYPES } from "../../../actionTypes";
import { ScheduleActions } from "../../../actions";
import { Schedule, Record } from "../../../../interfaces";

const defaultRecord: Record = {
  id: null,
  date: "",
  time: "",
  availability: false,
};

type ScheduleState = {
  scheduleList: Schedule;
  selectedRecord: Record;
  error: string | null;
};

const initialState: ScheduleState = {
  scheduleList: {},
  selectedRecord: defaultRecord,
  error: null,
};

export const scheduleReducer = (state = initialState, action: ScheduleActions): ScheduleState => {
  switch (action.type) {
    case TYPES.LOAD_SCHEDULE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case TYPES.LOAD_SCHEDULE_SUCCESS:
      return {
        ...state,
        scheduleList: action.payload,
        error: null,
      };

    case TYPES.LOAD_SCHEDULE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.SET_SELECTED_RECORD:
      return {
        ...state,
        selectedRecord: action.payload,
      };

    case TYPES.RESET_SCHEDULE_DATA:
      return {
        ...state,
        scheduleList: {},
      };

    default:
      return state;
  }
};
