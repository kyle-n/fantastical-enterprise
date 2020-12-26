import {Router} from 'express';

const router = Router();

router.get('/', async (req, resp) => {
  const {results} = await global.db.query({sql: `SELECT * FROM plans;`});
  return resp.json({plans: results});
});

export default router;
