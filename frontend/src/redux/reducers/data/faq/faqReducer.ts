import { FaqTypes as TYPES } from "../../../actionTypes";
import { FaqActions } from "../../../actions";
import { Faq } from "../../../../interfaces";

type FaqState = {
  faqList: Faq[];
  error: string | null;
};

const initialState: FaqState = {
  faqList: [],
  error: null,
};

export const faqReducer = (state = initialState, action: FaqActions): FaqState => {
  switch (action.type) {
    case TYPES.LOAD_FAQ_REQUEST:
      return {
        ...state,
        error: null,
      };

    case TYPES.LOAD_FAQ_SUCCESS:
      return {
        ...state,
        faqList: action.payload,
        error: null,
      };

    case TYPES.LOAD_FAQ_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.RESET_FAQ_DATA:
      return {
        ...state,
        faqList: [],
      };

    default:
      return state;
  }
};
