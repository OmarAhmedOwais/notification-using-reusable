import { Router } from "express";
import { validate } from "../middlewares/validation.middleware";
import { protectedMiddleware } from "../middlewares/protected.middleware";

// import {

// } from "../validations/notification.validator";
import {
getAllNotifications,
createNotification,
deleteNotification,
markNotificationAsRead
} from "../controllers/notification.controller";

const notificationRoute = Router();

notificationRoute
  .route("/")
  .get(protectedMiddleware,/*validate(userRegisterValidation),*/ getAllNotifications)
  .post(protectedMiddleware,/*validate(userRegisterValidation),*/ createNotification);
  notificationRoute
  .route("/:id")
  .put(protectedMiddleware,/*validate(userRegisterValidation),*/ markNotificationAsRead)
  .delete(protectedMiddleware,/*validate(userRegisterValidation),*/ deleteNotification);


export default notificationRoute;
