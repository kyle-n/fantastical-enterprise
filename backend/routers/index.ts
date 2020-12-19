import {Router} from 'express';

import userRouter from './user';
import companyRouter from './company';

const router = Router();

router.use('/users', userRouter);
router.use('/companies', companyRouter);

export default router;
