import {connection} from "../Database/db.js";


async function getCategories(req, res) {
  try {
     const categorias = await connection.query('SELECT * FROM categories;');
     res.status(200).send(categorias.rows);
   } catch (error) {
    console.log(error)
     res.status(500).send("Não foi possível obter todas as categorias");
   }
};
async function createCategories(req, res) {
   const { name } = req.body;
  try {
    const novaCategoria = await connection.query('INSERT INTO categories (name) VALUES ($1);',[name]);
  
    res.status(201).send("Categoria criada com sucesso!")
  } catch (error) {
    res.send(500);
  }
}

export { getCategories, createCategories };
