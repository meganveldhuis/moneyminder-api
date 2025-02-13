import express from "express";
const router = express.Router();

import * as categoryController from "../controllers/category-controller.js";

router.route("/").get(categoryController.getAllCategories);

router.route("/expense").get(categoryController.getAllExpenseCategories);

router.route("/income").get(categoryController.getAllIncomeCategories);

router.route("/:id").get(categoryController.getSingleCategory);

export default router;
