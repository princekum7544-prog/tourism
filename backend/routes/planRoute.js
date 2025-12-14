const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  console.log("PLAN HIT", req.body);

  return res.json({
    success: true,
    message: "API working",
    received: req.body
  });
});

module.exports = router;
