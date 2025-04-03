import express from "express";
import { analyzeSpending } from "../geminiService.js";  
import { authMiddleware } from '../middleware.js';

const router = express.Router();

router.post("/analyze-spending", authMiddleware,async (req, res) => {
    try {  
        
        const userId = req.userid;  // Assuming user authentication middleware

        const insightstext = await analyzeSpending(userId);
        const insightsArray = insightstext.split("\n").map(insight => insight.replace(/[*]+/g, "").trim());
        res.json({ insightsArray });
    } catch (error) {
        res.status(500).json({ message: "Failed to generate spending insights" });
    }
});

export default router;