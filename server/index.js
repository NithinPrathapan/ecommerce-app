import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";

const app = express();
dotenv.config();
app.use(express.json());

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["http://your-hosted-domain.com"]
    : ["http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

const port = 5000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => console.log("server connected to port", port));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
