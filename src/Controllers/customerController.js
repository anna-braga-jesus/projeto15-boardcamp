import { connection } from "../Database/db.js";
import GameSchema from '../Schemas/GameSchema.js'


async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    const customer = await connection.query("SELECT * FROM customers;");
    res.status(200).send(customer.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

async function getCustomersId(req, res) {
  const customerId = req.params.id;
  try {
     const customer = await connection.query(
       "SELECT * FROM customers WHERE id = $1;",
       [customerId]
     );
     if (customer.rows.length === 0) {
       return res.sendStatus(404);
     }
    res.send(customer.rows[0]).status(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
async function createCustomers(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const customers = await connection.query(
      "SELECT * FROM customers WHERE cpf = $1;",
      [cpf]
    );
    await connection.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);",
      [name, phone, cpf, birthday]
    );
    res.status(201).send("Cliente criado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro na inserção!");
  }
}
async function updateCustomers(req, res) {
  const { name, cpf, phone, birthday } = req.body;
  const id = req.params.id;

  try {
     if (!GameSchema.validate()) {
       return res.sendStatus(400);
     }
    const customers = await connection.query(
      "SELECT * FROM customers WHERE cpf = $1 AND id <> $2;",
      [cpf, id]
    );
    if (customers.length) {
      return res.send(409);
    }
    await connection.query(
      "UPDATE customers SET name = $1, phone = $2 , cpf = $3, birthday = $4 WHERE id = $5;",
      [name, phone, cpf, birthday, id]
    );

    return res.status(200).send("Cliente atualizado com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao atualizar cliente");
  }
}
export { getCustomers, getCustomersId, createCustomers, updateCustomers };
