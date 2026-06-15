import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import prisma from "../db.js";

const router = express.Router();
const otpStore = {};

const isEmailConfigured = Boolean(
  process.env.EMAIL_HOST &&
  process.env.EMAIL_USER &&
  process.env.EMAIL_PASS &&
  process.env.OTP_FROM
);

let transporter;
if (isEmailConfigured) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

const generateOTP = () => String(Math.floor(1000 + Math.random() * 9000));

async function sendOtpEmail(email, code) {
  const message = {
    from: process.env.OTP_FROM || "no-reply@decovoice.local",
    to: email,
    subject: "Your DecoVoice OTP code",
    text: `Your DecoVoice OTP is ${code}. It expires in 5 minutes.`,
    html: `<p>Your DecoVoice OTP is <strong>${code}</strong>.</p><p>It expires in 5 minutes.</p>`,
  };

  if (transporter) {
    await transporter.sendMail(message);
  } else {
    console.log(`OTP for ${email}: ${code}`);
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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, onboarded: user.onboarded } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to login." });
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
    if (!transporter) response.otp = code;

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to send OTP." });
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
