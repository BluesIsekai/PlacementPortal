const express = require('express');
const router = express.Router();

// Placeholder companies routes
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Companies endpoint' });
});

module.exports = router;
