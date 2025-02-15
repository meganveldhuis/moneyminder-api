import express from "express";
const router = express.Router();
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

router.get(`/years`, async (req, res) => {
  try {
    let data = await knex("expenses").select("expenses.date");
    let years = [];
    let newYear;
    for (let i = 0; i < data.length; i++) {
      newYear = new Date(data[i].date).getUTCFullYear();
      years.indexOf(newYear) === -1 ? years.push(newYear) : null;
    }
    let incomeData = await knex("income").select("income.date");
    for (let i = 0; i < incomeData.length; i++) {
      newYear = new Date(incomeData[i].date).getUTCFullYear();
      years.indexOf(newYear) === -1 ? years.push(newYear) : null;
    }
    years.sort((a, b) => b - a);
    res.send(years);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error");
  }
});

export default router;
