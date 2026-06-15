import express from "express";
import prisma from "../db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (!user) return res.status(404).json({ error: "User not found." });
  res.json({ id: user.id, email: user.email, name: user.name, onboarded: user.onboarded });
});

router.post("/onboard", authMiddleware, async (req, res) => {
  const { name } = req.body;
  const user = await prisma.user.update({
    where: { id: req.userId },
    data: { name, onboarded: true },
  });
  res.json({ id: user.id, email: user.email, name: user.name, onboarded: user.onboarded });
});

export default router;
