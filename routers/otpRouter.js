import Router from "express";
import { verifyOTP, resendOTP } from "../controllers/otpApis/barrel.js"

const otpRouter = Router();

otpRouter
        .post("/verify-otp/:userId", verifyOTP)
        .post("/resend-otp/:userId", resendOTP)

export default otpRouter;
