const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

const router = express.Router();

router.get('/admin-data', protect, authorizeRoles('admin'), (req, res) => {
  res.json({ message: "Admin content" });
});

router.get('/user-data', protect, authorizeRoles('user', 'admin'), (req, res) => {
  res.json({ message: "User content" });
});

module.exports = router;
