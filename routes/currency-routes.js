import express from "express";
const router = express.Router();

import * as currencyController from "../controllers/currency-controller.js";

router.route("/").get(currencyController.getAllCurrency);

export default router;
