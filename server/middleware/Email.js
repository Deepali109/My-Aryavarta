import { transporter } from "./Emai.config.js";
import {
  Verification_Email_Template,
  Welcome_Email_Template,
} from "./EmailTemplate.js";

export const SendVerificationCode = async (email, verificationCode) => {
  try {
    console.log("eeeemaaaaaaaaal", email);
    const response = await transporter.sendMail({
      from: '"Priya" <priyaaaji25@gmail.com>',
      to: email,
      subject: "Verify Your Email",
      text: "Verify Your Email", // plain‑text body
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });
    // console.log("Email Sent Successfully", response);
  } catch (error) {
    console.log("Email Error", error);
  }
};

export const SendWelcomeemail = async (email, name) => {
  try {
    console.log("eeeemaaaaaaaaal", email);
    const response = await transporter.sendMail({
      from: '"Priya" <priyaaaji25@gmail.com>',
      to: email,
      subject: "welcome Email",
      text: `hello ${name}`, // plain‑text body
      html: Welcome_Email_Template.replace("{name}", name),
    });
    // console.log("Email Sent Successfully", response);
  } catch (error) {
    console.log("Email Error", error);
  }
};
