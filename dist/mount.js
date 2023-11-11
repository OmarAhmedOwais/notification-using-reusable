"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./routes/auth.router"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const notification_router_1 = __importDefault(require("./routes/notification.router"));
const policyAndTerms_router_1 = __importDefault(require("./routes/policyAndTerms.router"));
const index_router_1 = __importDefault(require("./routes/index.router"));
const router = (0, express_1.Router)();
/*
allowedTo(
  Role.RootAdmin,
  Role.AdminA,
  Role.AdminB,
  Role.AdminC,
  Role.SubAdmin,
  Role.USER
),
*/
router.use("/users", user_router_1.default);
router.use("/auth", auth_router_1.default);
router.use("/notification", notification_router_1.default);
router.use("/policyAndTerms", policyAndTerms_router_1.default);
router.use("/", index_router_1.default);
exports.default = router;
