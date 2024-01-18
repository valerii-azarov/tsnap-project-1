import { Dispatch } from "redux";
import axios, { AxiosError, AxiosResponse } from "axios";

import { setLoading } from "../..";
import { LoadingActions } from "../../../actions";
import { ServicesTypes as TYPES } from "../../../actionTypes";
import { ServicesActions, LoadServicesRequestAction, LoadServicesSuccessAction, LoadServicesFailureAction, LoadPopularServicesRequestAction, LoadPopularServicesSuccessAction, LoadPopularServicesFailureAction, LoadSelectedServiceRequestAction, LoadSelectedServiceSuccessAction, LoadSelectedServiceFailureAction, SetSelectedServiceAction, ResetServicesDataAction } from "../../../actions";
import { Service, ServiceInfo, ErrorResponse } from "../../../../interfaces";

export const loadServicesRequest = (): LoadServicesRequestAction => ({
  type: TYPES.LOAD_SERVICES_REQUEST,
});

export const loadServicesSuccess = (data: Service[]): LoadServicesSuccessAction => ({
  type: TYPES.LOAD_SERVICES_SUCCESS,
  payload: data,
});

export const loadServicesFailure = (error: string): LoadServicesFailureAction => ({
  type: TYPES.LOAD_SERVICES_FAILURE,
  payload: error,
});

export const loadPopularServicesRequest = (): LoadPopularServicesRequestAction => ({
  type: TYPES.LOAD_POPULAR_SERVICES_REQUEST,
});

export const loadPopularServicesSuccess = (data: Service[]): LoadPopularServicesSuccessAction => ({
  type: TYPES.LOAD_POPULAR_SERVICES_SUCCESS,
  payload: data,
});

export const loadPopularServicesFailure = (error: string): LoadPopularServicesFailureAction => ({
  type: TYPES.LOAD_POPULAR_SERVICES_FAILURE,
  payload: error,
});

export const loadSelectedServiceRequest = (): LoadSelectedServiceRequestAction => ({
  type: TYPES.LOAD_SELECTED_SERVICE_REQUEST,
});
  
export const loadSelectedServiceSuccess = (data: ServiceInfo): LoadSelectedServiceSuccessAction => ({
  type: TYPES.LOAD_SELECTED_SERVICE_SUCCESS,
  payload: data,
});
  
export const loadSelectedServiceFailure = (error: string): LoadSelectedServiceFailureAction => ({
  type: TYPES.LOAD_SELECTED_SERVICE_FAILURE,
  payload: error,
});

export const setSelectedService = (service: Service): SetSelectedServiceAction => ({
  type: TYPES.SET_SELECTED_SERVICE,
  payload: service,
});

export const resetServicesData = (): ResetServicesDataAction => ({
  type: TYPES.RESET_SERVICES_DATA,
});

export const loadServicesData = (selectedCategoryId: number) => async (dispatch: Dispatch<ServicesActions | LoadingActions>) => {
  dispatch(loadServicesRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/services/${selectedCategoryId}`)
      .then((response: AxiosResponse) => {
        dispatch(loadServicesSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadServicesFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};

export const loadPopularServicesData = () => async (dispatch: Dispatch<ServicesActions | LoadingActions>) => {
  dispatch(loadPopularServicesRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/services/popular`) 
      .then((response: AxiosResponse) => {
        dispatch(loadPopularServicesSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadPopularServicesFailure(errorMessage));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};

export const loadSelectedServiceData = (selectedServiceTypeId: string) => async (dispatch: Dispatch<ServicesActions | LoadingActions>) => {
  dispatch(loadSelectedServiceRequest());
  dispatch(setLoading(true));

  setTimeout(() => {
    axios
      .get(`${process.env.REACT_APP_API}/api/services/info/${selectedServiceTypeId}`)
      .then((response: AxiosResponse) => {
        dispatch(loadSelectedServiceSuccess(response.data));
      })
      .catch((error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response ? error.response.data.message : error.message;
        dispatch(loadSelectedServiceFailure(errorMessage));
      })      
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, 2000);
};
