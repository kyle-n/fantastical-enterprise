import {Router} from 'express';
import { UserData } from '../../models/user';

const router = Router();

router.post('/', async (req, resp) => {
  try {
    await global.db.query({
      sql: `INSERT INTO users (email, password, companyId, active, lastSignInDate, signUpDate) VALUES (:email, :password, :companyId, :active, :lastSignInDate, :signUpDate);`,
      params: req.body
    });
    const {results} = await global.db.query({
      sql: `SELECT * FROM users WHERE id = LAST_INSERT_ID();`,
    });
    const newUserData: UserData = results[0];
    return resp.status(200).json(newUserData);
  } catch (e) {
    return resp.status(500).send(e);
  }
});

export default router;
