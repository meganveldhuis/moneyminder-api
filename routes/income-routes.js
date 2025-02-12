import express from "express";
const router = express.Router();

import * as incomeController from "../controllers/income-controller.js";

router
  .route("/")
  .get(incomeController.getAllIncome)
  .post(incomeController.addIncomeRecord);

router
  .route("/:id")
  .get(incomeController.getSingleIncomeRecord)
  .patch(incomeController.editIncomeRecord);

export default router;
