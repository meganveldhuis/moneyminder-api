import express from "express";
const router = express.Router();

import * as incomeController from "../controllers/income-controller.js";

router
  .route("/")
  .get(incomeController.getAllIncome)
  .post(incomeController.addIncomeRecord);

router.route("/category").get(incomeController.getIncomeByCategory);

router
  .route("/:id")
  .get(incomeController.getSingleIncomeRecord)
  .patch(incomeController.editIncomeRecord)
  .delete(incomeController.deleteIncomeRecord);

export default router;
