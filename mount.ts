import { Router } from "express";

import authRouter from "./routes/auth.router";

import userRouter from "./routes/user.router";

import notificationRouter from "./routes/notification.router";
import policyAndTermsRouter from "./routes/policyAndTerms.router";
import indexRoute from "./routes/index.router";

const router = Router();

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

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/notification", notificationRouter);
router.use("/policyAndTerms",policyAndTermsRouter)
router.use("/",indexRoute)



export default router;
