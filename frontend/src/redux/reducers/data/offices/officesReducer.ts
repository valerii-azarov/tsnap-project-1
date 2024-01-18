import { OfficesTypes as TYPES } from "../../../actionTypes";
import { OfficesActions } from "../../../actions";
import { Office } from "../../../../interfaces";

const defaultOffice: Office = {
  id: null,
  name: "",
  address: "",
};

type OfficesState = {
  officeList: Office[];
  selectedOffice: Office;
  error: string | null;
};

const initialState: OfficesState = {
  officeList: [],
  selectedOffice: defaultOffice,
  error: null,
};

export const officesReducer = (state = initialState, action: OfficesActions): OfficesState => {
  switch (action.type) {
    case TYPES.LOAD_OFFICES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case TYPES.LOAD_OFFICES_SUCCESS:
      return {
        ...state,
        officeList: action.payload,
        error: null,
      };

    case TYPES.LOAD_OFFICES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.SET_SELECTED_OFFICE:
      return {
        ...state,
        selectedOffice: action.payload,
      };

    case TYPES.RESET_OFFICES_DATA:
      return {
        ...state,
        officeList: [],
      };

    default:
      return state;
  }
};
