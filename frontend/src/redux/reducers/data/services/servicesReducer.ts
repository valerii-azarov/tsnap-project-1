import { ServicesTypes as TYPES } from "../../../actionTypes";
import { ServicesActions } from "../../../actions";
import { Service, ServiceInfo } from "../../../../interfaces";

const defaultService: Service = {
  id: null,
  name: "",
  categoryId: null,
};

const defaultServiceInfo: ServiceInfo = {
  id: null,
  name: "",
  description: "",
  required_documents: "",
  regulatory_documents: "",
  delivery_time: "",
  price: "",
};

type ServicesState = {
  serviceList: Service[];
  popularServicesList: Service[];
  selectedService: Service;
  serviceInfo: {
    info: ServiceInfo;
    error: string | null;
  }
  error: string | null;
};

const initialState: ServicesState = {
  serviceList: [],
  popularServicesList: [],
  selectedService: defaultService,
  serviceInfo: {
    info: defaultServiceInfo,
    error: null,
  },
  error: null,
};

export const servicesReducer = (state = initialState, action: ServicesActions): ServicesState => {
  switch (action.type) {
    case TYPES.LOAD_SERVICES_REQUEST:
    case TYPES.LOAD_POPULAR_SERVICES_REQUEST:
    case TYPES.LOAD_SELECTED_SERVICE_REQUEST:
      return {
        ...state,
        error: null,
      };

    case TYPES.LOAD_SERVICES_SUCCESS:
      return {
        ...state,
        serviceList: action.payload,
        error: null,
      };

    case TYPES.LOAD_SERVICES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.LOAD_POPULAR_SERVICES_SUCCESS:
      return {
        ...state,
        popularServicesList: action.payload,
        error: null,
      };

    case TYPES.LOAD_POPULAR_SERVICES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.LOAD_SELECTED_SERVICE_SUCCESS:
      return {
        ...state,
        serviceInfo: {
          info: action.payload,
          error: null,
        },
      };

    case TYPES.LOAD_SELECTED_SERVICE_FAILURE:
      return {
        ...state,
        serviceInfo: {
          info: defaultServiceInfo,
          error: action.payload,
        },
      };

    case TYPES.SET_SELECTED_SERVICE:
      return {
        ...state,
        selectedService: action.payload,
      };

    case TYPES.RESET_SERVICES_DATA:
      return {
        ...state,
        serviceList: [],
      };

    default:
      return state;
  }
};
