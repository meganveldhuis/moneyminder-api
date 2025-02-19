import express from "express";
const router = express.Router();

import * as budgetContoller from "../controllers/budget-controller.js";
router.route("/").get(budgetContoller.getAllBudget);

router.route("/:id").get(budgetContoller.getBudgetByCategory);

export default router;
