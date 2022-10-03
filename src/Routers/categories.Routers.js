import express from "express";
import {
  getCategories,
  createCategories,
} from "../Controllers/categoriesController.js";
import validateCategories from "../Middlewares/CategoriesMiddleware.js";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories",validateCategories, createCategories);

export default router;
