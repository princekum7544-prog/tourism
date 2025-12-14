const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const planRoute = require('./routes/planRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ✅ CORS */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

/* ✅ Preflight */
app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.use(express.json());

/* ✅ IMPORTANT FIX */
app.use('/api', planRoute);

/* Health check */
app.get('/', (req, res) => {
  res.send('Backend running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
