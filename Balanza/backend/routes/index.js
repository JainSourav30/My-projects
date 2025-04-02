import express from 'express';
import UserRouter from './user.js';
import AccountRouter from './accounts.js';
import PaymentRouter from './payments.js';

const router = express.Router();

router.use('/user', UserRouter);
router.use('/account', AccountRouter);
router.use('/payments', PaymentRouter);

export default router;