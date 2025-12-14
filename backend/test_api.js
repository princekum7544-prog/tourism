const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const models = [
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite-preview-02-05",
    "gemini-1.5-flash",
    "models/gemini-2.0-flash-lite-preview-02-05", // Try with prefix
    "gemini-2.0-flash-thinking-exp-01-21"
];

async function test() {
    console.log("Testing models...");
    for (const modelName of models) {
        try {
            process.stdout.write(`Trying ${modelName}... `);
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hi");
            console.log("SUCCESS! ✅");
            return; // Exit on first success
        } catch (e) {
            console.log("FAILED ❌");
            // console.log(e.message.split('\n')[0]); // Log brief error
        }
    }
    console.log("All attempts failed.");
}

test();
