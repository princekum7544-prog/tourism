const express = require('express');
const router = express.Router();
const { getTravelIntent } = require('../services/emotionEngine');
const { getDestinations } = require('../services/groqService');

router.post('/', async (req, res) => {
    try {
        const { emotion, people, duration, budget, notes } = req.body;

        if (!emotion) {
            return res.status(400).json({ error: "Emotion is required" });
        }

        // 1. Get Rule-Based Intent
        const intent = getTravelIntent(emotion);

        // 2. Fetch Suggestions from Gemini/Groq
        const inputs = { emotion, people, duration, budget, notes };
        const { destinations, source } = await getDestinations(intent, inputs);

        // 3. Return Combined Result
        res.json({
            success: true,
            emotion,
            summary: {
                destinationType: intent.destinationType,
                pace: intent.pace,
                stay: intent.stayPreference,
                intensity: intent.activityIntensity,
                moodDescription: intent.moodDescription
            },
            destinations,
            source // Pass source to frontend
        });

    } catch (error) {
        console.error("Plan Route Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
