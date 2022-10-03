import express from "express";
import { getGames, createGames } from "../Controllers/gameController.js";
import createGameSchema from "../Middlewares/GameMiddleware.js";

const router = express.Router();

router.get("/games", getGames);
router.post("/games", createGameSchema,createGames);

export default router;
