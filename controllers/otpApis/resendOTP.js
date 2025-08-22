import OTP from "../../models/otpModel.js";
import { sendMail } from "../../utils/sendEmail.js";
import { generateOTP } from "../../utils/generateOTP.js";

//resending an OTP
export const resendOTP = async (req, res) => {
  const { userId } = req.params;
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Please provide an email" });
    } else {
      //delete any existing otp with this user's id
      await OTP.deleteMany({ userId })

      //generate a new OTP
      const { otp, otpExpires } = generateOTP();
      const otpData = new OTP({
        userId,
        otp,
        otpExpires,
      });

      await otpData.save();

      await sendMail({
        mailFrom: `weSELL ${process.env.EMAIL_USER}`,
        mailTo: email,
        subject: "Updated OTP",
        body: `
            <p>Here is your OTP ${otp}, proceed to verify</p>
          `,
      });
      res.status(200).json({ message: "OTP is resent successfully" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
