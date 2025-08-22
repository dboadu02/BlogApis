import Router from "express";
import { verifyOTP, resendOTP } from "../controllers/otpApis/barrel.js"

const otpRouter = Router();

otpRouter
        .post("/verify/:userId", verifyOTP)
        .post("/resend/:userId", resendOTP)

export default otpRouter;
