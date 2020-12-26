import {Router} from 'express';
import {FantasticalEnterprisePlanData} from '../../src/models/fantastical-enterprise-plan';

const router = Router();

router.get('/', async (req, resp) => {
  const {results} = await global.db.query({sql: `SELECT * FROM plans;`});
  return resp.json({plans: results});
});

router.get('/:id', async (req, resp) => {
  try {
    const {results} = await global.db.query({
      sql: `SELECT * FROM plans WHERE id = :id;`,
      params: {id: req.params.id}
    });
    const planData: FantasticalEnterprisePlanData = results[0];
    return resp.json(planData);
  } catch (e) {
    return resp.status(500).send(e);
  }
});

export default router;
