import {Router} from 'express';

import userRouter from './user';
import companyRouter from './company';
import planRouter from './plan';

const router = Router();

router.use('/users', userRouter);
router.use('/companies', companyRouter);
router.use('/plans', planRouter);

export default router;
