/**
 * Groq Service
 * Fetches destination suggestions using Groq (Llama 3).
 * Extremely fast and reliable.
 */
const Groq = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Rich Fallback Database
const mockDestinations = {
    tired: [
        { destination: "Kerala, India", why: "Serene backwaters and houseboats perfect for doing absolutely nothing.", best_duration: "5-7 days" },
        { destination: "Bali, Indonesia", why: "Quiet yoga retreats and nature to recharge your soul.", best_duration: "7 days" },
        { destination: "Kyoto, Japan", why: "Peaceful temples and gardens to soothe the tired mind.", best_duration: "5 days" }
    ],
    stressed: [
        { destination: "Maldives", why: "Just you and the endless ocean. No noise, no emails.", best_duration: "4-5 days" },
        { destination: "Santorini, Greece", why: "Calming white architecture and sea views to reset your perspective.", best_duration: "5 days" },
        { destination: "Lake Como, Italy", why: "Luxurious calm and slow living by the water.", best_duration: "3-4 days" }
    ],
    happy: [
        { destination: "Barcelona, Spain", why: "Vibrant street life and colors to match your energy.", best_duration: "4 days" },
        { destination: "Rio de Janeiro, Brazil", why: "A city that celebrates life with music and beaches.", best_duration: "5 days" },
        { destination: "Queenstown, NZ", why: "Adventure and beauty to celebrate your good mood.", best_duration: "5-7 days" }
    ],
    unknown: [
        { destination: "Iceland", why: "A complete disconnect from the ordinary world.", best_duration: "5 days" },
        { destination: "Swiss Alps, Switzerland", why: "Fresh air and grand views to clear your head.", best_duration: "4 days" }
    ]
};

const generatePrompts = (intent, inputs) => {
    return `
    You are a travel expert. Suggest 3 travel destinations (specific cities/towns) that match the following criteria:
    - Destination Type: ${intent.destinationType}
    - Travel Pace: ${intent.pace}
    - Stay Preference: ${intent.stayPreference}
    - Activity Intensity: ${intent.activityIntensity}
    - Activity Intensity: ${intent.activityIntensity}
    - User Context: Feeling ${inputs.emotion}, travelling ${inputs.people} for ${inputs.duration} days. Budget: ${inputs.budget}.
    - Specific User Notes: "${inputs.notes || "None provided. Surprise me."}"
    
    IMPORTANT:
    - DEFAULT LOCATION: Assume the user is starting from Rajasthan, India, unless they explicitly state a different location in 'Specific User Notes'.
    - If the user provides a location in 'Specific User Notes', suggest places accessible from there if logical.
    - If they provide specific interests, prioritize them.
    - Ensure variety! Do not always suggest the most obvious top 3 places. Dig deeper for hidden gems if appropriate.
    
    CRITICAL INSTRUCTION:
    - Return ONLY a JSON array. 
    - Do NOT include any text before or after the JSON.
    - Do NOT use markdown code blocks like \`\`\`json.
    - JSON Pattern: 
    [
        {
            "destination": "Name, Country",
            "why": "One sentence explaining why it fits expectations.",
            "best_duration": "Recommended days (e.g. 3-4 days)"
        }
    ]
    `;
};

const getDestinations = async (intent, inputs) => {
    try {
        const prompt = generatePrompts(intent, inputs);

        const chatCompletion = await groq.chat.completions.create({
            "messages": [
                {
                    "role": "system",
                    "content": "You are a helpful travel assistant that outputs only JSON."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            // Updated model name as previous one was decommissioned
            "model": "llama-3.3-70b-versatile",
            "temperature": 0.9, // Higher randomness for variety
            "max_tokens": 1024,
            "top_p": 1,
            "stream": false,
            "stop": null
        });

        const content = chatCompletion.choices[0]?.message?.content || "";

        // Clean up just in case Llama adds ticks
        const jsonString = content.replace(/```json/g, "").replace(/```/g, "").trim();

        return {
            destinations: JSON.parse(jsonString),
            source: "Live AI ⚡"
        };

    } catch (error) {
        console.error("Groq API Error:", error.message);

        // --- RICH FALLBACK MODE ---
        console.log("Switching to Mock Data.");
        const emotionKey = inputs.emotion ? inputs.emotion.toLowerCase() : 'unknown';
        let suggestions = mockDestinations[emotionKey] || mockDestinations['unknown'];

        return {
            destinations: suggestions.map(s => ({
                ...s,
                why: s.why + ` (Generated for you)`
            })),
            source: "Mock Data (Fallback)"
        };
    }
};

module.exports = { getDestinations };
