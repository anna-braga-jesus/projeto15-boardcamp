import {connection} from '../Database/db.js';

async function createGameSchema(req, res, next) {
  const { categoryId, name } = req.body;
  const gameCategoriesId = await connection.query(
    "SELECT id FROM categories WHERE id = $1 LIMIT 1;",
    [categoryId]
  );
  const gameNameId = await connection.query("SELECT name FROM games;");
  if (!gameNameId.rows) {
    return res.sendStatus(409);
  }
  if (!gameCategoriesId) {
    return res.sendStatus(400);
  }

  next();
}
export default createGameSchema;
