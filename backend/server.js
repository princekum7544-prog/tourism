const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const planRoute = require('./routes/planRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ✅ HARD CORS FIX */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

/* ✅ THIS IS THE KEY LINE (MOST IMPORTANT) */
app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.use(express.json());

/* ✅ ROUTE */
app.use('/api/plan', planRoute);

/* Health check */
app.get('/', (req, res) => {
  res.send('Backend running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
