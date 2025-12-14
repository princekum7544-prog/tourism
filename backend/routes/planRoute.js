const express = require('express');
const router = express.Router();

router.post('/plan', async (req, res) => {
 console.log("🔥 /api/plan HIT");
  console.log("BODY:", req.body);

  return res.json({
    success: true,
    message: "API working",
    received: req.body
  });
});

module.exports = router;
