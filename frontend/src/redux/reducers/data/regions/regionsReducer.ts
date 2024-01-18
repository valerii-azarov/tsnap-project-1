import { RegionsTypes as TYPES } from "../../../actionTypes";
import { RegionsActions } from "../../../actions";
import { Region } from "../../../../interfaces";

const defaultRegion: Region = {
  id: null,
  name: "",
};

type RegionsState = {
  regionList: Region[];
  selectedRegion: Region;
  error: string | null;
};

const initialState: RegionsState = {
  regionList: [],
  selectedRegion: defaultRegion,
  error: null,
};

export const regionsReducer = (state = initialState, action: RegionsActions): RegionsState => {
  switch (action.type) {
    case TYPES.LOAD_REGIONS_REQUEST:
      return {
        ...state,
        error: null,
      };

    case TYPES.LOAD_REGIONS_SUCCESS:
      return {
        ...state,
        regionList: action.payload,
        error: null,
      };

    case TYPES.LOAD_REGIONS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.SET_SELECTED_REGION:
      return {
        ...state,
        selectedRegion: action.payload,
      };

    case TYPES.RESET_REGIONS_DATA:
      return {
        ...state,
        regionList: [],
      };

    default:
      return state;
  }
};
