import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["http://your-hosted-domain.com"]
    : ["http://localhost:3000"];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

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
