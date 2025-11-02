const express = require('express');
const router = express.Router();

// Placeholder quiz routes
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Quiz endpoint' });
});

module.exports = router;
