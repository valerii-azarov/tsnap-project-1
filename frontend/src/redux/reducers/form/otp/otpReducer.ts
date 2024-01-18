import { OtpTypes as TYPES } from "../../../actionTypes";
import { OtpActions } from "../../../actions";

interface OtpState {
  send: {
    isSending: boolean;
    sendError: string | null;
  };
  verify: {
    isValid: boolean;
    verifyError: string | null;
  };
}

const initialState: OtpState = {
  send: {
    isSending: false,
    sendError: null,
  },
  verify: {
    isValid: false,
    verifyError: null,
  },
};

export const otpReducer = (state = initialState, action: OtpActions): OtpState => {
  switch (action.type) {
    case TYPES.SEND_OTP_REQUEST:
      return {
        ...state,
        send: {
          isSending: true,
          sendError: null,
        },
      };

    case TYPES.SEND_OTP_SUCCESS:
      return {
        ...state,
        send: {
          isSending: false,
          sendError: null,
        },
      };

    case TYPES.SEND_OTP_FAILURE:
      return {
        ...state,
        send: {
          isSending: false,
          sendError: action.payload,
        },
      };

    case TYPES.VERIFY_OTP_REQUEST:
      return {
        ...state,
        verify: {
          isValid: false,
          verifyError: null,
        },
      };

    case TYPES.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verify: {
          isValid: true,
          verifyError: null,
        },
      };

    case TYPES.VERIFY_OTP_FAILURE:
      return {
        ...state,
        verify: {
          isValid: false,
          verifyError: action.payload,
        },
      };

    case TYPES.RESET_OTP_DATA:
      return initialState;

    default:
      return state;
  }
};
