import cron from "node-cron";
import moment from "moment";

import { TagSpending } from "./db.js"; // Ensure .js extension is included

// Function to reset TotalSpent and store history
const resetTotalSpent = async () => {
    try {
        const tags = await TagSpending.find({});
        
        for (const tag of tags) {
            if (tag.TotalSpent > 0) {  // Only save if there's spending
                const lastMonth = moment().subtract(1, "month").format("MMMM");
                const currentYear = moment().year();

                tag.History.push({
                    month: lastMonth,
                    year: currentYear,
                    amount: tag.TotalSpent
                });
            }

            // Reset TotalSpent
            tag.TotalSpent = 0;
            await tag.save();
        }

        console.log("✅ Monthly reset completed!");
    } catch (error) {
        console.error("❌ Error in resetting TotalSpent:", error);
    }
};

// Run automatically at 1st of every month at 00:00
cron.schedule("0 0 1 * *", resetTotalSpent, { timezone: "Asia/Kolkata" });

// Export function for manual testing
export { resetTotalSpent };