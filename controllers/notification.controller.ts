import { NextFunction, Request, Response } from 'express';
import {Notification} from '../models/notification.model';
import { StatusCodes } from "http-status-codes";
import ApiError from "../utils/ApiError";
import expressAsyncHandler from 'express-async-handler';
import {io} from'../index';

export const getAllNotifications = expressAsyncHandler(async (req: Request, res: Response , next: NextFunction) => {
        const notifications = await Notification.find();
        if (!notifications) {
            return next(
                new ApiError(
                  {
                    en: "Notifications not found",
                    ar: "الأشعار غير موجود",
                  },
                  StatusCodes.NOT_FOUND
                )
              );
        }
        res.json(notifications);
});

export const createNotification = expressAsyncHandler(async (req: Request, res: Response) => {
  try {
    const { title, message, receiver } = req.body;
    const sender = (req.user as any)?._id; // add type guard to check if req.user exists
    const notification = await Notification.create({ title, message, sender, receiver });
    // Access the WebSocket server from the request object

   // Broadcast the notification to all connected clients
    io.emit('createNotification', notification);
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export const deleteNotification = expressAsyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await Notification.findByIdAndDelete(id);
        res.json({ message: 'Notification deleted' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
    res.status(204).send();
});

export const markNotificationAsRead = expressAsyncHandler(async (req: Request, res: Response)  => {
  const { id } = req.params;
  try {
    // Update the notification by its ID to set 'read' to true
    const notification= await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
    io.emit('updateNotification', notification);
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export const markNotificationAsReadSocket = async (Id: string) => {
  try {
    // Update the notification by its ID to set 'read' to true
    const notification= await Notification.findByIdAndUpdate(Id, { read: true }, { new: true });
    io.emit('updateNotification', notification);
    return notification;
  } catch (error) {
    return error;
  }
};