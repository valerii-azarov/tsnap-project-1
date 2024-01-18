import { CitiesTypes as TYPES } from "../../../actionTypes";
import { CitiesActions } from "../../../actions";
import { City } from "../../../../interfaces";

const defaultCity: City = {
  id: null,
  name: "",
};

type CitiesState = {
  cityList: City[];
  selectedCity: City;
  error: string | null;
};

const initialState: CitiesState = {
  cityList: [],
  selectedCity: defaultCity,
  error: null,
};

export const citiesReducer = (state = initialState, action: CitiesActions): CitiesState => {
  switch (action.type) {
    case TYPES.LOAD_CITIES_REQUEST:
      return {
        ...state,
        error: null,
      };

    case TYPES.LOAD_CITIES_SUCCESS:
      return {
        ...state,
        cityList: action.payload,
        error: null,
      };

    case TYPES.LOAD_CITIES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.SET_SELECTED_CITY:
      return {
        ...state,
        selectedCity: action.payload,
      };

    case TYPES.RESET_CITIES_DATA:
      return {
        ...state,
        cityList: [],
      };

    default:
      return state;
  }
};
