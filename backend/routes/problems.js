const express = require('express');
const router = express.Router();

// Placeholder problems routes
router.get('/', (req, res) => {
  res.json({ success: true, message: 'Problems endpoint' });
});

module.exports = router;
