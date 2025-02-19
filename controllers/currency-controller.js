import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export async function getAllCurrency(req, res) {
  try {
    const data = await knex("currencies");
    if (!data) {
      return res.status(204).send(`No currencies found`);
    }
    return res.status(200).send(data);
  } catch (error) {
    console.log(`Error getting all currencies : ${error}`);
    return res.status(500).send(`Error getting all currencies`);
  }
}
