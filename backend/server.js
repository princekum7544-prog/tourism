const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const planRoute = require('./routes/planRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ FIXED CORS (VERY IMPORTANT)
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Allow preflight requests
app.options("*", cors());

app.use(express.json());

// ✅ API Routes
app.use('/api/plan', planRoute);

// Health check
app.get('/', (req, res) => {
    res.send('EmoTravel API is running (Calmly).');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
