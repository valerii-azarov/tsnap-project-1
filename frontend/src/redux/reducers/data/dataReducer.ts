import { combineReducers } from "redux";

import { regionsReducer } from "./regions/regionsReducer";
import { citiesReducer } from "./cities/citiesReducer";
import { officesReducer } from "./offices/officesReducer";
import { categoriesReducer } from "./categories/categoriesReducer";
import { servicesReducer } from "./services/servicesReducer";
import { serviceTypesReducer } from "./serviceTypes/serviceTypesReducer";
import { scheduleReducer } from "./schedule/scheduleReducer";
import { newsReducer } from "./news/newsReducer";
import { faqReducer } from "./faq/faqReducer";

export const dataReducer = combineReducers({
  regions: regionsReducer,
  cities: citiesReducer,
  offices: officesReducer,
  categories: categoriesReducer,
  services: servicesReducer,
  serviceTypes: serviceTypesReducer,
  schedule: scheduleReducer,
  news: newsReducer,
  faq: faqReducer,
});
