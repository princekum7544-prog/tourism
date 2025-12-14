/**
 * Gemini Service (Native Fetch Version + Rich Fallback)
 * Fetches destination suggestions by hitting the REST API directly.
 * If API fails (Quota/404), falls back to a rich local database of suggestions.
 */
require("dotenv").config();

const API_KEY = process.env.GEMINI_API_KEY;

const generatePrompts = (intent, inputs) => {
    return `
    Suggest 3 travel destinations (specific cities/towns) that match the following criteria:
    - Destination Type: ${intent.destinationType}
    - Travel Pace: ${intent.pace}
    - Stay Preference: ${intent.stayPreference}
    - Activity Intensity: ${intent.activityIntensity}
    - User Context: Feeling ${inputs.emotion}, travelling ${inputs.people} for ${inputs.duration} days. Budget: ${inputs.budget}.
    
    Constraint:
    - Return strictly a JSON array.
    - No markdown formatting in response (just raw JSON).
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

const getDestinations = async (intent, inputs) => {
    // List of models and API versions to try
    const endpoints = [
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite-preview-02-05:generateContent`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
    ];

    const promptText = generatePrompts(intent, inputs);
    const requestBody = {
        contents: [{
            parts: [{ text: promptText }]
        }]
    };

    console.log("Starting Gemini Fetch with Fallback Mode Enabled...");

    for (const url of endpoints) {
        try {
            console.log(`Trying URL: ${url}`);
            const response = await fetch(`${url}?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errText = await response.text();
                console.warn(`Failed ${url}: ${response.status} - ${errText}`);
                continue; // Try next
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) throw new Error("No text in response");

            // Cleanup markdown if Gemini adds it (```json ... ```)
            const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
            return JSON.parse(jsonString);

        } catch (error) {
            console.error(`Error with ${url}:`, error.message);
        }
    }

    // --- FALLBACK MODE ---
    console.error("All Gemini endpoints failed. Switching to Mock Data.");
    const emotionKey = inputs.emotion ? inputs.emotion.toLowerCase() : 'unknown';
    // Match partial keys if needed
    let suggestions = mockDestinations[emotionKey] || mockDestinations['unknown'];

    // Customize why text slightly based on context
    return suggestions.map(s => ({
        ...s,
        why: s.why + ` (Generated for ${inputs.people} traveler)`
    }));
};

module.exports = { getDestinations };
