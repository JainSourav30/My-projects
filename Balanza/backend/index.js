import './cronjobs.js'; // Ensure the correct file extension is included

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRouter from "./routes/aiRoutes.js"
import mainRouter from "./routes/index.js";
const app = express();
dotenv.config();

app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
  }));
app.use(express.json());

app.use('/api/v1',mainRouter);
app.use("/api/v1/ai",aiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});