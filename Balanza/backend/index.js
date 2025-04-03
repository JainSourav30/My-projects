import './cronjobs.js'; // Ensure the correct file extension is included

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRouter from "./routes/aiRoutes.js"
import mainRouter from "./routes/index.js";
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/v1',mainRouter);
app.use("/api/v1/ai",aiRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

