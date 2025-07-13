const express = require('express')
const { createOrder, verifyPayment, fetchRazorpayKey } = require('./controllers')
const router = express.Router()

router.get('/getKey',fetchRazorpayKey)
router.post('/createOrder',createOrder);
router.post('/verifyPayment',verifyPayment);

module.exports = router;