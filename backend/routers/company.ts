import {Router} from 'express';
import { CompanyData } from '../../models/company';

const router = Router();

router.get('/:id', async (req, resp) => {
  const {results} = await global.db.query({
    sql: `SELECT * FROM company WHERE id = :id;`,
    params: {id: req.body.id}}
  );

  return resp.json(results[0]);
});

// @TODO: Full JSON Schema validation for request bodies
router.post('/', async (req, resp) => {
  const patchData: CompanyData = req.body;
  try {
    await global.db.query({
      sql: `INSERT INTO companies (name, planId, planAdministratorId, totalSeats, activeSeats) VALUES (:name, :planId, :planAdministratorId, :totalSeats, :activeSeats);`,
      params: patchData
    });
    const {results} = await global.db.query({
      sql: `SELECT * FROM companies WHERE id = LAST_INSERT_ID();`,
    });
    const postedCompany: CompanyData = results[0];
    return resp.status(201).send(postedCompany);
  } catch (e) {
    // @TODO: Parse out the error and send specific HTTP error codes
    return resp.status(409).send(e);
  }
});

router.patch('/:id', async (req, resp) => {
  const patchData: CompanyData = req.body;
  try {
    await global.db.query({
      sql: `UPDATE companies SET name = :name, planId = :planId, planAdministratorId = :planAdministratorId, totalSeats = :totalSeats, activeSeats = :activeSeats WHERE id = :id;`,
      params: {
        ...patchData,
        id: req.params.id
      }
    });
    const {results} = await global.db.query({
      sql: `SELECT * FROM companies WHERE id = :id;`,
      params: {id: req.params.id}
    });
    const patchedCompany: CompanyData = results[0];
    return resp.status(204).json(patchedCompany);
  } catch (e) {
    return resp.status(500).send(e);
  }
});

router.delete('/:id', async (req, resp) => {
  try {
    await global.db.query({
      sql: `DELETE FROM companies WHERE id = :id;`,
      params: {id: req.params.id}
    });
    return resp.status(204).send();
  } catch (e) {
    return resp.status(500).send(e);
  }
});

export default router;
