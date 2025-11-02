const express = require('express');
const router = express.Router();

// Placeholder progress routes
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Progress endpoint' });
});

module.exports = router;
