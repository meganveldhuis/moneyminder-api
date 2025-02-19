import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// routes:
// [x] GET all budget lines
// [ ] GET combined for summary page's cards : budget amount, actual amount, and difference by category_name
// [x] GET budget line by category id

export async function getAllBudget(req, res) {
  try {
    let queryBuilder = knex("budget");

    const data = await queryBuilder;
    if (!data) {
      return res.status(204).send(`No budget data `);
    }
    res.send(data);
  } catch (error) {
    console.log(`Error getting budget lines ${error}`);
    return res.status(500).send(`Error getting budget lines`);
  }
}

export async function getBudgetByCategory(req, res) {
  let category_id = req.params.id || "";
  try {
    let queryBuilder = knex("budget")
      .where({ category_id: category_id })
      .first();

    const data = await queryBuilder;
    if (!data) {
      return res.status(204).send(`No budget data for category ID`);
    }
    res.send(data);
  } catch (error) {
    console.log(
      `Error getting budget line with category id ${category_id} : ${error}`
    );
    return res
      .status(500)
      .send(`Error getting budget line with category id ${category_id}`);
  }
}
