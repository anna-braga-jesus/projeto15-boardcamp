import express from "express";
import cors from "cors";
import pkg from 'pg';
import categoriesRouter from "../src/Routers/categories.Routers.js";
import gameRouter from "../src/Routers/game.Routers.js";
import customersRouter from "./Routers/customer.Routers.js";
import rentalsRouter from "./Routers/rental.Routers.js";

const server = express();
server.use([cors(), express.json()]);



//==============CATEGORIAS===================
server.use(categoriesRouter);

//======JOGOS==============
server.use(gameRouter);

//======CLIENTES==============
server.use(customersRouter);

//======ALUGUEIS==============
server.use(rentalsRouter);

server.listen(4000, console.log("Listening on port 4000"));
