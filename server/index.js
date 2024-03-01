import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();

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

app.listen(port, () => console.log("server connected to port", port));
