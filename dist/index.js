"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({ path: "./config/config.env" });
const db_connection_1 = __importDefault(require("./config/db_connection"));
const morgan_1 = __importDefault(require("morgan"));
const mount_1 = __importDefault(require("./mount"));
require("colors");
const globalError_middleware_1 = require("./middlewares/globalError.middleware");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ApiError_1 = __importDefault(require("./utils/ApiError"));
const http_status_codes_1 = require("http-status-codes");
//import webhook from "./webhooks";
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const notification_controller_1 = require("./controllers/notification.controller");
// Passport
const passport_1 = __importDefault(require("passport"));
//import cookieSession from 'cookie-session';
//import session from 'express-session';
const app = (0, express_1.default)();
const NODE_ENV = process.env.NODE_ENV || "dev";
if (NODE_ENV === "dev") {
    app.use((0, morgan_1.default)("dev"));
}
(0, db_connection_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// routes
app.use("/api/v1", mount_1.default);
//app.use("/webhooks", webhook);
// un handled routes (not found)
app.use("*", (0, express_async_handler_1.default)(async (req, res, next) => {
    next(new ApiError_1.default({
        en: `this path ${req.originalUrl} not found`,
        ar: `هذا المسار ${req.originalUrl} غير موجود`,
    }, http_status_codes_1.StatusCodes.NOT_FOUND));
}));
app.use(globalError_middleware_1.globalErrorMiddleware);
// set up session cookies
// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: ['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']
// }));
// // Configure express-session middleware
// app.use(session({
//   secret: 'your-secret-key', // Change this to a secure random string
//   resave: false,
//   saveUninitialized: true,
// }));
const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running:  ${process.env.APP_URL}`.green.bold);
// });
///
// Passport
// Initialize Passport
app.use(passport_1.default.initialize());
// Start the Passport session
//app.use(passport.session());
///
// Socket.io
// Create a new HTTP server
const server = http_1.default.createServer(app);
// Create a new Socket.io server
exports.io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
// Attach the Socket.io server to the HTTP server
app.set('socketio', exports.io);
// Listen for incoming connections
exports.io.on('connection', (socket) => {
    console.log('A client connected');
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`A client joined room: ${room}`);
    });
    socket.on('mark-as-read', async (notificationId) => {
        // Update the notification by its ID to set 'read' to true
        const notification = await (0, notification_controller_1.markNotificationAsReadSocket)(notificationId);
        console.log('mark-as-read', notification);
    });
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});
// Start the HTTP server
server.listen(PORT, () => {
    console.log(`Server running:  ${process.env.APP_URL}`.green.bold);
});
