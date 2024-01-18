import { ServiceTypesTypes as TYPES } from "../../../actionTypes";
import { ServiceTypesActions } from "../../../actions";
import { ServiceType } from "../../../../interfaces";

const defaultServiceType: ServiceType = {
  id: null,
  name: "",
  serviceId: null,
};

type ServiceTypesState = {
  serviceTypeList: ServiceType[];
  selectedServiceType: ServiceType;
  error: string | null;
};

const initialState: ServiceTypesState = {
  serviceTypeList: [],
  selectedServiceType: defaultServiceType,
  error: null,
};

export const serviceTypesReducer = (state = initialState, action: ServiceTypesActions): ServiceTypesState => {
  switch (action.type) {
    case TYPES.LOAD_SERVICE_TYPES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case TYPES.LOAD_SERVICE_TYPES_SUCCESS:
      return {
        ...state,
        serviceTypeList: action.payload,
        error: null,
      };

    case TYPES.LOAD_SERVICE_TYPES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.SET_SELECTED_SERVICE_TYPE:
      return {
        ...state,
        selectedServiceType: action.payload,
      };

    case TYPES.RESET_SERVICE_TYPES_DATA:
      return {
        ...state,
        serviceTypeList: [],
      };

    default:
      return state;
  }
};
