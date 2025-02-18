import express from "express";
const router = express.Router();

import * as combinedController from "../controllers/combined-controller.js";

// router
//   .route("/")
//   .get(expenseController.getAllExpenses)
//   .post(expenseController.addExpenseRecord);

// router.route("/category").get(expenseController.getExpensesByCategory);

// router
//   .route("/:id")
//   .get(expenseController.getSingleExpenseRecord)
//   .patch(expenseController.editExpenseRecord)
//   .delete(expenseController.deleteExpenseRecord);

export default router;
