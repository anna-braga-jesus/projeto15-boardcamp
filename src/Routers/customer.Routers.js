import express from "express";
import {
  getCustomersId,
  getCustomers,
  createCustomers,
  updateCustomers,
} from "../Controllers/customerController.js";
import createCustomerIdMiddleware from "../Middlewares/CustomersMiddleware.js";


const router = express.Router();

//Listar os clientes
router.get("/customers", getCustomers);
//Buscar um cliente por id
router.get("/customers/:id",getCustomersId);
//Inserir um cliente
router.post("/customers",createCustomerIdMiddleware, createCustomers);
//Atualizar um cliente
router.put("/customers/:id", updateCustomers);

export default router;
