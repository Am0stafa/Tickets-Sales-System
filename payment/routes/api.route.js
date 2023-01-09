const router = require('express').Router();
const { createPaymentIntent } = require('../controller/payment');

router.post('/pay', createPaymentIntent);

module.exports = router;
