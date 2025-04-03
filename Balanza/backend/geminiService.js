
  // Adjust the path as needed
import {TagSpending} from './db.js'
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeSpending(userId) {
    try {
        // 🔹 Fetch tags where TotalSpent > 0
        const tags = await TagSpending.find({ 
            UserId: userId, 
            TotalSpent: { $gt: 0 } 
        });

        if (tags.length === 0) return "No spending data available for insights.";

        // 🔹 Format spending data
        const spendingData = tags.map(tag => ({
            tag: tag.Tag,
            totalSpent: tag.TotalSpent,
            goal: tag.Goal,
            history: tag.History  // Include full spending history
        }));

        const currentDate = new Date();
        const dayOfMonth = currentDate.getDate();
        const month = currentDate.toLocaleString('default', { month: 'long' });

        const prompt = `Today's date is ${dayOfMonth} and month is ${month} The current month history amount is always 0,it updates once the month ends,if their is only one month in history array that means the user is new, to get the total spent of current month, add the total spent for each tag . ALl the goals are monthly and the amount is in rupees.Also the total spent is also monthly.
        
        Analyze this spending data and provide insights in three key areas:
        1. **Major Overspending Areas, based on how close they are from their goal** (Where is the user spending too much and If a user has already spent 20-30% of their goal in the first few days (e.g., within the first 5-10 days),how likely are they to exceed their goal.)
        2. **Potential Saving Opportunities** (Where can they cut costs?)
        3. for high spent tags,Use the current date to get idea of how likely they are to exceed their goals.
        4. **Notable Spending Trends** (compared to previous 2 months only if there is data available for that)
        - **Limit response to 5 bullet points maximum.**
        - **Provide only important takeaways, not detailed explanations.**
        - **Ensure responses are practical and actionable.**
        Spending Data: ${JSON.stringify(spendingData)}`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });
        const result = await model.generateContent(prompt);
        const response = await result.response;

        return response.text();
    } catch (error) {
        console.error("Error fetching Gemini insights:", error);
        return "Error generating insights.";
    }
}