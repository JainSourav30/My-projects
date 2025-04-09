import './cronjobs.js'; // Ensure the correct file extension is included

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRouter from "./routes/aiRoutes.js"
import mainRouter from "./routes/index.js";
const app = express();
dotenv.config();

const allowedOrigins = [
  'http://localhost:5173',
  'https://balanza-five.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use('/api/v1',mainRouter);
app.use("/api/v1/ai",aiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});