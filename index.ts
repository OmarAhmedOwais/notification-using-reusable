import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config({ path: "./config/config.env" });

import db_connection from "./config/db_connection";
import morgan from "morgan";
import router from "./mount";

import "colors";
import expressAsyncHandler from "express-async-handler";
import ApiError from "./utils/ApiError";
import { StatusCodes } from "http-status-codes";
import http from "http";
import { Server, Socket } from "socket.io";
import { markNotificationAsReadSocket } from "./controllers/notification.controller";
// Passport
import passport from 'passport';
//import cookieSession from 'cookie-session';


const app = express();


const NODE_ENV = process.env.NODE_ENV || "dev";

if (NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

db_connection();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/v1", router);

// un handled routes (not found)
app.all(
  "*",
  (req, res, next) => {
    next(
      new ApiError(
        {
          en: `this path ${req.originalUrl} not found`,
          ar: `هذا المسار ${req.originalUrl} غير موجود`,
        },
        StatusCodes.NOT_FOUND
      )
    );
  }
);


// set up session cookies
// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: ['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']
// }));

const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running:  ${process.env.APP_URL_Render}`.green.bold);
// });


///
// Passport
// Initialize Passport
app.use(passport.initialize());
// Start the Passport session
//app.use(passport.session());
///

// Socket.io
// Create a new HTTP server
const server = http.createServer(app);
// Create a new Socket.io server
export const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});
// Attach the Socket.io server to the HTTP server
app.set('socketio', io);
// Listen for incoming connections
io.on('connection', (socket: Socket) => {
  console.log('A client connected');
  socket.on('mark-as-read', async (notificationId) => {
    // Update the notification by its ID to set 'read' to true
    const notification = await markNotificationAsReadSocket(notificationId);
    console.log('mark-as-read', notification);
  });
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});
// Start the HTTP server
server.listen(PORT, () => {
  console.log(`Server running:  ${process.env.APP_URL_Render}`.green.bold);
});