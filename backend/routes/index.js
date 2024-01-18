import express from "express";

import { getAllRegionsHandler, getAppearanceByCityIdHandler } from "../controllers/regionsController.js";
import { getAllCitiesHandler } from "../controllers/citiesController.js";
import { getAllOfficesByCityIdHandler } from "../controllers/officesController.js";
import { getAllCategoriesHandler } from "../controllers/categoriesController.js";
import { getPopularServicesHandler, getServicesByCategoryHandler, getServiceInfoByServiceTypeIdHandler } from "../controllers/servicesController.js";
import { getServiceTypesByServiceIdHandler } from "../controllers/serviceTypesController.js";
import { getScheduleByOfficeIdAndServiceIdHandler } from "../controllers/scheduleController.js";
import { canBookAppointmentHandler, createBookingHandler, checkBookingStatusHandler } from "../controllers/bookingController.js";
import { sendOtpHandler, verifyOtpHandler } from "../controllers/otpController.js";
import { getNewsHandler, getFeaturedNewsHandler, getNewsByIdHandler } from "../controllers/newsController.js";
import { getAllFAQHandler } from "../controllers/faqController.js";
import { imageRequest } from "../utils/imageHandler.js"

const router = express.Router();

const routes = [
  { path: "/regions", method: "GET", handler: getAllRegionsHandler },
  { path: "/appearance/:cityId", method: "GET", handler: getAppearanceByCityIdHandler },
  { path: "/appearance/images/:imageName", method: "GET", handler: imageRequest },    
  { path: "/cities", method: "GET", handler: getAllCitiesHandler },
  { path: "/offices/:cityId", method: "GET", handler: getAllOfficesByCityIdHandler },
  { path: "/categories", method: "GET", handler: getAllCategoriesHandler },
  { path: "/services/popular", method: "GET", handler: getPopularServicesHandler },
  { path: "/services/:categoryId", method: "GET", handler: getServicesByCategoryHandler },
  { path: "/services/info/:serviceTypeId", method: "GET", handler: getServiceInfoByServiceTypeIdHandler },
  { path: "/service-types/:serviceId", method: "GET", handler: getServiceTypesByServiceIdHandler },
  { path: "/schedule/:officeId/:serviceId", method: "GET", handler: getScheduleByOfficeIdAndServiceIdHandler },
  { path: "/booking/check", method: "POST", handler: canBookAppointmentHandler },
  { path: "/booking/create", method: "POST", handler: createBookingHandler },
  { path: "/booking/status", method: "POST", handler: checkBookingStatusHandler },
  { path: "/otp/send", method: "POST", handler: sendOtpHandler },
  { path: "/otp/verify", method: "POST", handler: verifyOtpHandler },
  { path: "/news", method: "GET", handler: getNewsHandler },
  { path: "/news/featured", method: "GET", handler: getFeaturedNewsHandler },
  { path: "/news/details/:newsId", method: "GET", handler: getNewsByIdHandler },  
  { path: "/faq", method: "GET", handler: getAllFAQHandler },
];

routes.forEach(route => {
  switch (route.method) {
    case "GET":
      router.get(route.path, route.handler);
      break;
    case "POST":
      router.post(route.path, route.handler);
      break;
    default:
      break;
  }
});

export default router;
