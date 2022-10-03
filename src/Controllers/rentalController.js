import Joi from "joi";
import { connection } from "../Database/db.js";

async function getRentals(req, res) {
  const { name } = req.query;
  try {
    const rentals = await connection.query("SELECT * FROM rentals;");

    res.send(rentals.rows).status(200);
  } catch (error) {
    res.send("Não foi possível obter os aluguéis").status(500);
  }
}
async function createRentals(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    return res.send("A inserção foi feita com sucesso!").status(200);
  } catch (error) {
    console.log(error);
    res.status(500).send("Não foi possível criar o aluguel!");
  }
}
async function finishRentals(req, res) {
  const rentalsId = req.params.id;
  
  try {
    const info =
      await connection.query(`SELECT rentals.* FROM rentals JOIN games 
    ON rentals."gameId"= games.id WHERE rentals.id = ${rentalsId};
`);
const tentativa = await connection.query(`SELECT * FROM rentals;`);
const variavel = tentativa.rows.filter((ali)=>{return ali.id == rentalsId});

 if(variavel[0].returnDate !== null){
   return res.sendStatus(400);
 }
    const rentalId = await connection.query(
      "SELECT id FROM rentals WHERE id = $1 LIMIT 1;",
      [rentalsId]
    );

    if (!rentalId.length === 0 ) {
      return res.sendStatus(404);
    }
    const today = new Date();
    const rentalAtualizado = await connection.query(
      `UPDATE rentals SET "returnDate" = $2 WHERE id = $1;`,
      [rentalsId, today]
    );
    return res.status(200).send("Aluguel finalizado com sucesso!");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
async function deleteRentals(req, res) {
  const { id } = req.params;
  try {
    const myId = await connection.query(
      'SELECT "returnDate" FROM rentals WHERE rentals.id = $1;',
      [id]
    );
    if (myId.length === 0) {
      return res.send("Esse aluguel não existe").status(404);
    }
    if (myId.rows[0].returnDate != null) {
      res.sendStatus(400);
    }
    const deleteRentals = await connection.query(
      "DELETE FROM rentals WHERE id = $1;",
      [id]
    );
    res.status(200).send("Aluguel deletado com sucesso!");
  } catch (error) {
    res.sendStatus(500);
  }
}

export { getRentals, createRentals, finishRentals, deleteRentals };
