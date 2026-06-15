import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const auth = req.headers["authorization"];
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Authentication required." });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
}
