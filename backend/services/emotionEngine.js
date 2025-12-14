/**
 * Emotion Engine (Rule-Based)
 * Maps input emotion to deterministic travel parameters.
 */

const createIntent = (destinationType, pace, stayPreference, activityIntensity, moodDescription) => ({
    destinationType,
    pace,
    stayPreference,
    activityIntensity,
    moodDescription
});

const rules = {
    tired: createIntent(
        "Nature / Hills",
        "Slow",
        "Quiet Resort or Cabin",
        "Low",
        "You need a break. We've prioritized nature, silence, and minimal movement."
    ),
    stressed: createIntent(
        "Beach / Coastal",
        "Relaxed",
        "Luxury or Boutique Hotel",
        "Low",
        "Let the ocean wash away the stress. Focus on open horizons and calming sounds."
    ),
    happy: createIntent(
        "City / Culture",
        "Medium",
        "Modern Apartment or Hotel",
        "Medium",
        "Ride that wave of happiness! Explore vibrant streets and soak in new culture."
    ),
    overthinking: createIntent(
        "Spiritual / Temple Town",
        "Medium",
        "Ashram or Heritage Stay",
        "Low",
        "A place to ground yourself. Structure, history, and spiritual energy to calm the mind."
    ),
    adventurous: createIntent(
        "Mountains / Trekking",
        "Fast",
        "Camping or Hostel",
        "High",
        "Adrenaline mode on. High peaks, physical challenges, and raw nature."
    ),
    burnt_out: createIntent(
        "Wellness / Retreat",
        "Slow",
        "Wellness Resort",
        "None",
        "Complete disconnect. Yoga, spa, and zero work obligations."
    )
};

const getTravelIntent = (emotion) => {
    const normalizedEmotion = emotion?.toLowerCase() || "tired";
    return rules[normalizedEmotion] || rules["tired"];
};

module.exports = { getTravelIntent };
