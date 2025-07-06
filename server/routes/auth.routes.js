const express = require('express');
const { register, login, googleLogin, verifyUser, convertToAdmin } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin);
router.get('/verify', protect, verifyUser);
router.put('/convert-to-admin', protect, convertToAdmin)

module.exports = router;
