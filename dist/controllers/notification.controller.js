"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markNotificationAsReadSocket = exports.markNotificationAsRead = exports.deleteNotification = exports.createNotification = exports.getAllNotifications = void 0;
const notification_model_1 = require("../models/notification.model");
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const index_1 = require("../index");
exports.getAllNotifications = (0, express_async_handler_1.default)(async (req, res, next) => {
    const notifications = await notification_model_1.Notification.find();
    if (!notifications) {
        return next(new ApiError_1.default({
            en: "Notifications not found",
            ar: "الأشعار غير موجود",
        }, http_status_codes_1.StatusCodes.NOT_FOUND));
    }
    res.json(notifications);
});
exports.createNotification = (0, express_async_handler_1.default)(async (req, res) => {
    var _a;
    try {
        const { title, message, receiver } = req.body;
        const sender = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // add type guard to check if req.user exists
        const notification = await notification_model_1.Notification.create({ title, message, sender, receiver });
        // Access the WebSocket server from the request object
        // Broadcast the notification to all connected clients
        index_1.io.to(receiver).emit('createNotification', notification);
        res.status(201).json(notification);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.deleteNotification = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    try {
        await notification_model_1.Notification.findByIdAndDelete(id);
        res.json({ message: 'Notification deleted' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
    res.status(204).send();
});
exports.markNotificationAsRead = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    try {
        // Update the notification by its ID to set 'read' to true
        const notification = await notification_model_1.Notification.findByIdAndUpdate(id, { read: true }, { new: true });
        index_1.io.emit('updateNotification', notification);
        res.json({ message: 'Notification marked as read' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
const markNotificationAsReadSocket = async (Id) => {
    try {
        // Update the notification by its ID to set 'read' to true
        const notification = await notification_model_1.Notification.findByIdAndUpdate(Id, { read: true }, { new: true });
        index_1.io.emit('updateNotification', notification);
        return notification;
    }
    catch (error) {
        return error;
    }
};
exports.markNotificationAsReadSocket = markNotificationAsReadSocket;
