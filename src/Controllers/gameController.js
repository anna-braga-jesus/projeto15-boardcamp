import { connection } from "../Database/db.js";
//import GameSchema from "../Schemas/GameSchema.js";

async function getGames(req, res) {
  const { name } = req.query;
  const games = await connection.query(`SELECT * FROM games;`);

  try {
    if (name) {
      const variavel = games.rows.filter((parametro) => {
        return parametro.name.toLowerCase() === name.toLowerCase();
      });
      return res.send(variavel);
    } else {
      res.status(200).send(games.rows);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function createGames(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  
  try {
    await connection.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    return res.send("Jogo inserido com sucesso").status(201);
  } catch (error) {
    res.status(500).send("Não foi possível inserir o jogo!");
  }
}

export { getGames, createGames };
