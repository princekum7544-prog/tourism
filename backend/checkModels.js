const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

async function checkModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("Checking available models...");
    try {
        // There isn't a direct listModels on genAI instance in some versions, 
        // but typically it's via the API.
        // Actually, the Node SDK doesn't always expose listModels easily in the main entry.
        // Let's try to infer it by just trying a very basic 'gemini-pro' call which should exist.

        // Correction: The SDK DOES support verifying models if we use the API directly or just catch errors.
        // But since we are 404ing on everything, let's try a different approach.
        // Maybe the user copied the key wrong?

        // Wait, 404 can also happen if the Endpoint is wrong.

        // Let's try a minimal script.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello");
        console.log("Success with gemini-1.5-flash");
        console.log(result.response.text());
    } catch (error) {
        console.error("Error details:", error);
    }
}

checkModels();
