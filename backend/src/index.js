import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error("CORS policy does not allow access from this origin."));
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => res.json({ status: "ok", message: "Deco Voice API" }));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
