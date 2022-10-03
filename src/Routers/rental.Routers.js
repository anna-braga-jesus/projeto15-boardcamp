import {
  getRentals,
  createRentals,
  finishRentals,
  deleteRentals,
} from "../Controllers/rentalController.js";
import express from "express";
import rentalMiddleware from "../Middlewares/RentalsMiddleware.js";

const router = express.Router();

router.get("/rentals", getRentals);
router.post("/rentals", rentalMiddleware, createRentals);
router.post("/rentals/:id/return", finishRentals);
router.delete("/rentals/:id", deleteRentals);

export default router;
