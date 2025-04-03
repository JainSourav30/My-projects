import dotenv from "dotenv";

dotenv.config();

async function listAvailableModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Available Models:", data);
    } catch (error) {
        console.error("Error fetching models:", error);
    }
}

listAvailableModels();
