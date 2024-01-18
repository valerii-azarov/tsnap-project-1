import { NewsTypes as TYPES } from "../../../actionTypes";
import { NewsActions } from "../../../actions";
import { News } from "../../../../interfaces";

const defaultNews: News = {
  id: null,
  title: "",
  content: "",
  publish_date: "",
};

type NewsState = {
  newsList: {
    totalPages: number;
    data: News[];
  };
  featuredNews: News;
  selectedNews: News;
  error: string | null;
};

const initialState: NewsState = {
  newsList: {
    totalPages: 0,
    data: [],
  },
  featuredNews: defaultNews,
  selectedNews: defaultNews,
  error: null,
};

export const newsReducer = (state = initialState, action: NewsActions): NewsState => {
  switch (action.type) {
    case TYPES.LOAD_NEWS_REQUEST:
    case TYPES.LOAD_FEATURED_NEWS_REQUEST:
    case TYPES.LOAD_SELECTED_NEWS_REQUEST:
      return {
        ...state,
        error: null,
      };

    case TYPES.LOAD_NEWS_SUCCESS:
      return {
        ...state,
        newsList: action.payload,
        error: null,
      };

    case TYPES.LOAD_NEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.LOAD_FEATURED_NEWS_SUCCESS:
      return {
        ...state,
        featuredNews: action.payload,
        error: null,
      };

    case TYPES.LOAD_FEATURED_NEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.LOAD_SELECTED_NEWS_SUCCESS:
      return {
        ...state,
        selectedNews: action.payload,
        error: null,
      };

    case TYPES.LOAD_SELECTED_NEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case TYPES.RESET_NEWS_DATA:
      return {
        ...state,
        newsList: {
          totalPages: 0,
          data: [],
        },
      };

    default:
      return state;
  }
};
