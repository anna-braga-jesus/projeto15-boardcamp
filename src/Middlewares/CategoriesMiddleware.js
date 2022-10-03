import {connection} from "../Database/db.js";

async function validateCategories(req, res, next) {
    const { name } = req.body;
    const nomeDuplicado = await connection.query(`SELECT * FROM categories WHERE name = $1;`, [name]);   
    if(nomeDuplicado.rows.length > 0 ){
      return res.sendStatus(409);
    }; 
    if(name.length === 0){
        return res.sendStatus(400);
      };
    next();
  };
  export default validateCategories;