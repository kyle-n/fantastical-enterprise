import {Router} from 'express';
import { UserData } from '../../src/models/user';

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

router.get('/:id', async (req, resp) => {
  try {
    const {results} = await global.db.query({
      sql: `SELECT * FROM users WHERE id = :id;`,
      params: {id: req.params.id}
    });
    const userData: UserData = results[0];
    return resp.json(userData);
  } catch (e) {
    return resp.status(500).send(e);
  }
});

router.patch('/:id', async (req, resp) => {
  const patchData: UserData = req.body;
  try {
    await global.db.query({
      sql: `UPDATE users SET email = :email, password = :password, companyId = :companyId, active = :active, lastSignInDate = :lastSignInDate, signUpDate = :signUpDate WHERE id = :id;`,
      params: {
        ...patchData,
        id: req.params.id
      }
    });
    const {results} = await global.db.query({
      sql: `SELECT * FROM users WHERE id = :id;`,
      params: {id: req.params.id}
    });
    const patchedUser: UserData = results[0];
    return resp.json(patchedUser);
  } catch (e) {
    return resp.status(500).send(e);
  }
});

router.delete('/:id', async (req, resp) => {
  try {
    await global.db.query({
      sql: `DELETE FROM users WHERE id = :id;`,
      params: {id: req.params.id}
    });
    return resp.status(204).send();
  } catch (e) {
    return resp.status(500).send(e);
  }
})

export default router;
