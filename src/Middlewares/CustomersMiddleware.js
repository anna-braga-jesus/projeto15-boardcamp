import { connection } from "../Database/db.js";
import CustomerSchema from '../Schemas/CustomerSchema.js';

async function createCustomerIdMiddleware(req,res){
    const { cpf } = req.body;
    const customerId  = req.params.id;
    const existeCustomer = await connection.query('SELECT * FROM customers WHERE id = $1;', [customerId]);

    if(existeCustomer.length === 0 && customerId) {
        return res.sendStatus(404);
    }
   
    const { error } = CustomerSchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(400).send(error)
    }

    const { rows: customerEncontrado } = await connection.query('SELECT * FROM customers WHERE cpf = $1', [cpf])

    if(customerEncontrado.length > 0 && customerEncontrado[0].id !== Number(customerId)) {
        return res.sendStatus(409);
    }
    next();

}
export default createCustomerIdMiddleware;