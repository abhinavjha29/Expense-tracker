const nodemailer = require("nodemailer");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });
const verifyEmail = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndUpdate(id, { userVerified: true });
    console.log(user, "VERIFIEDDDD");
    res.status(200).json({ msg: "Email Verified" });
  } catch (err) {
    console.log(err);
  }
};

const verifyEmailLink = async (req, res) => {
  try {
    // Get user ID from request
    const id = req.user;
    // Find user by ID
    console.log(id, " HERE IS  ID IS=>>>>>>>>>>>>>");
    const user = await User.findById(id);
    // Get user's email
    const userEmail = user.email;

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SenderEmail, // Your Gmail email address from environment variables
        pass: process.env.SenderPassword, // Your Gmail password from environment variables
      },
    });

    // Setup email data
    const mailOptions = {
      from: process.env.SenderEmail, // Your Gmail email address
      to: userEmail, // User's email address
      subject: "Email Verification",
      text: `Please click on the following link to verify your email: http://localhost:5000/verify/verifyEmail/${user._id}`, // Example verification link
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);

    res.json({ msg: "Verification email sent successfully" });
  } catch (error) {
    console.error("Error sending verification email: ", error);
    res.status(500).send("Failed to send verification email");
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // Verify reset token
    const decodedToken = jwt.verify(token, process.env.JWT_PASSWORD);
    const user = await User.findByIdAndUpdate(decodedToken.userId, {
      password: newPassword,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "Password reset successfully" });
    }
  } catch (error) {
    console.error("Error resetting password:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ error: "Reset token has expired" });
    }
    res.status(500).json({ error: "Failed to reset password" });
  }
};
const forgotPasswordLink = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_PASSWORD,
      {
        expiresIn: "1h",
      }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SenderEmail,
        pass: process.env.SenderPassword,
      },
    });

    const mailOptions = {
      from: process.env.SenderEmail,
      to: user.email,
      subject: "Password Reset",
      html: `<p>You requested a password reset. Click <a href="http://localhost:5173/updatePassword/${resetToken}">here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ error: "Failed to send password reset email" });
  }
};

module.exports = {
  verifyEmail,
  verifyEmailLink,
  forgotPassword,
  forgotPasswordLink,
};
