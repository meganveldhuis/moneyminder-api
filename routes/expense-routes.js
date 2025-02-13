import express from "express";
const router = express.Router();

import * as expenseController from "../controllers/expense-controller.js";
router
  .route("/")
  .get(expenseController.getAllExpenses)
  .post(expenseController.addExpenseRecord);

router
  .route("/:id")
  .get(expenseController.getSingleExpenseRecord)
  .patch(expenseController.editExpenseRecord)
  .delete(expenseController.deleteExpenseRecord);
export default router;
