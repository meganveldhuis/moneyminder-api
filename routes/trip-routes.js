import express from "express";
const router = express.Router();

import * as tripController from "../controllers/trip-controller.js";

router.route("/").get(tripController.getAllTrips);

router.route("/:id").get(tripController.getTripById);

export default router;
