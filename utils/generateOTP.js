export const generateOTP = () => {
  return {
    otp: Math.floor(100000 + Math.random() * 900000).toString(),
    otpExpires: new Date(Date.now() + 5 * 60 * 1000), //OTP expires in 5 minutes
  };
};
