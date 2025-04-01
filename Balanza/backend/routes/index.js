const express = require('express')
const UserRouter = require('./user');
const AccountRouter = require('./accounts');
const PaymentRouter = require('./payments');

const router = express.Router();


router.use('/user',UserRouter);
router.use('/account',AccountRouter);
router.use('/payments',PaymentRouter);

module.exports = router; 