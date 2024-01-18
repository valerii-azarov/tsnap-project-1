import { BookingTypes as TYPES } from "../../../actionTypes";
import { BookingActions } from "../../../actions";
import { Booking } from "../../../../interfaces";

interface BookingState {
  create: {
    ticketId: number | null;
    isBookingCreated: boolean;
    createError: string | null;
  };
  check: {
    isCheckingBooking: boolean;
    checkError: string | null;
  };
  status: {
    data: Booking[];
    statusError: string | null;
  }
}

const initialState: BookingState = {
  create: {
    ticketId: null,
    isBookingCreated: false,
    createError: null,
  },
  check: {
    isCheckingBooking: false,
    checkError: null,
  },
  status: {
    data: [],
    statusError: null,
  },
};

export const bookingReducer = (state = initialState, action: BookingActions): BookingState => {
  switch (action.type) {
    case TYPES.CREATE_BOOKING_REQUEST:
      return {
        ...state,
        create: {
          ticketId: null,
          isBookingCreated: false,
          createError: null,
        },
      };

    case TYPES.CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        create: {
          ticketId: action.payload.id,
          isBookingCreated: true,
          createError: null,
        },
      };

    case TYPES.CREATE_BOOKING_FAILURE:
      return {
        ...state,
        create: {
          ticketId: null,
          isBookingCreated: false,
          createError: action.payload,
        },
      };

    case TYPES.CHECK_RECORD_REQUEST:
      return {
        ...state,
        check: {
          isCheckingBooking: true,
          checkError: null,
        },
      };

    case TYPES.CHECK_RECORD_SUCCESS:
      return {
        ...state,
        check: {
          isCheckingBooking: false,
          checkError: null,
        },
      };

    case TYPES.CHECK_RECORD_FAILURE:
      return {
        ...state,
        check: {
          isCheckingBooking: false,
          checkError: action.payload,
        },
      };

    case TYPES.CHECK_BOOKING_STATUS_REQUEST:
      return {
        ...state,
        status: {
          data: [],
          statusError: null,
        },
      };
  
    case TYPES.CHECK_BOOKING_STATUS_SUCCESS:
      return {
        ...state,
        status: {
          data: action.payload,
          statusError: null,
        },
      };
  
    case TYPES.CHECK_BOOKING_STATUS_FAILURE:
      return {
        ...state,
        status: {
          data: [],
          statusError: action.payload,
        },
      };

    case TYPES.RESET_BOOKING_DATA:
      return initialState;
      
    case TYPES.RESET_BOOKING_STATUS_DATA:
      return {
        ...state,
        status: {
          data: [],
          statusError: null,
        },
      };

    default:
      return state;
  }
};
