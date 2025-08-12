
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log(err));

// 👇 Routes
app.use("/api/auth", authRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server running on port ${port}`));
