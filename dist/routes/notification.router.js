"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const protected_middleware_1 = require("../middlewares/protected.middleware");
// import {
// } from "../validations/notification.validator";
const notification_controller_1 = require("../controllers/notification.controller");
const notificationRoute = (0, express_1.Router)();
notificationRoute
    .route("/")
    .get(protected_middleware_1.protectedMiddleware, /*validate(userRegisterValidation),*/ notification_controller_1.getAllNotifications)
    .post(protected_middleware_1.protectedMiddleware, /*validate(userRegisterValidation),*/ notification_controller_1.createNotification);
notificationRoute
    .route("/:id")
    .put(protected_middleware_1.protectedMiddleware, /*validate(userRegisterValidation),*/ notification_controller_1.markNotificationAsRead)
    .delete(protected_middleware_1.protectedMiddleware, /*validate(userRegisterValidation),*/ notification_controller_1.deleteNotification);
exports.default = notificationRoute;
