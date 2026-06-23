import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import prisma from "../db.js";

const router = express.Router();
const otpStore = {};

let _transporter = null;

function getTransporter() {
  if (_transporter) return _transporter;
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.OTP_FROM) {
    return null;
  }
  _transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return _transporter;
}

const generateOTP = () => String(Math.floor(1000 + Math.random() * 9000));

async function sendOtpEmail(email, code) {
  const message = {
    from: process.env.OTP_FROM || "no-reply@decovoice.local",
    to: email,
    subject: "Your Login OTP Code",
    text: `Your login OTP is ${code}. It expires in 5 minutes. Do not share this code with anyone.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:8px;">
        <h2 style="color:#1a1a1a;margin-bottom:8px;">Your Login OTP</h2>
        <p style="color:#555;margin-bottom:24px;">Use the code below to complete your login. It expires in <strong>5 minutes</strong>.</p>
        <div style="background:#fff;border:1px solid #e0e0e0;border-radius:6px;padding:24px;text-align:center;">
          <span style="font-size:36px;font-weight:700;letter-spacing:12px;color:#1a1a1a;">${code}</span>
        </div>
        <p style="color:#999;font-size:12px;margin-top:24px;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  };

  const transporter = getTransporter();
  if (transporter) {
    await transporter.sendMail(message);
  } else {
    console.log(`[OTP] Email not configured. OTP for ${email}: ${code}`);
  }
}

router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: "User already exists." });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed, name } });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, onboarded: user.onboarded } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create user." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "Email and password are required." });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials." });

    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    otpStore[email] = { code, expiresAt };
    await sendOtpEmail(email, code);

    const response = { message: "OTP sent to your email" };
    if (!getTransporter()) response.otp = code;

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to login.", detail: error.message });
  }
});

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required." });

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const hashed = await bcrypt.hash(Math.random().toString(36), 10);
      user = await prisma.user.create({ data: { email, password: hashed } });
    }

    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    otpStore[email] = { code, expiresAt };
    await sendOtpEmail(email, code);

    const response = { message: "OTP sent" };
    if (!getTransporter()) response.otp = code;

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to send OTP.", detail: error.message });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ error: "Email and OTP code are required." });

    const record = otpStore[email];
    if (!record || record.code !== code || record.expiresAt < new Date()) {
      return res.status(400).json({ error: "Invalid or expired OTP." });
    }

    delete otpStore[email];

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found." });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, onboarded: user.onboarded } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to verify OTP." });
  }
});

export default router;
