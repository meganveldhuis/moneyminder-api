import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export async function getSingleCategory(req, res) {
  const category_id = req.params.id;
  let status = 200;
  let message = ``;
  let categoryData = [];
  try {
    categoryData = await knex("categories").where({
      id: category_id,
    });
    if (!categoryData || categoryData.length === 0) {
      status = 404;
      message = `No category found with ID ${category_id}.`;
      console.log(`No category found with ID ${category_id}.`);
    }
  } catch (error) {
    status = 404;
    message = `Error: could not find category with ID ${category_id}`;
    console.log(
      `Error: could not find category with ID ${category_id} ${error}`
    );
  }
  if (categoryData[0]) {
    return res.status(status).send(categoryData[0]);
  } else {
    return res.status(status).send(message);
  }
}

export async function getAllCategories(req, res) {
  try {
    const categoryData = await knex("categories");
    if (categoryData.length <= 0) {
      return res.status(404).send(`Error: Could not get all categories`);
    }
    return res.status(200).send(categoryData);
  } catch (error) {
    return res.status(500).send("Error: Could not get all categories");
  }
}

export async function getAllExpenseCategories(req, res) {
  try {
    const categoryData = await knex("categories").where({ is_income: 0 });
    if (categoryData.length <= 0) {
      return res
        .status(404)
        .send(`Error: Could not get all expense categories`);
    }
    return res.status(200).send(categoryData);
  } catch (error) {
    return res.status(500).send("Error: Could not get all expense categories");
  }
}

export async function getAllIncomeCategories(req, res) {
  try {
    const categoryData = await knex("categories").where({ is_income: 1 });
    if (categoryData.length <= 0) {
      return res
        .status(404)
        .send(`Error: Could not get all expense categories`);
    }
    return res.status(200).send(categoryData);
  } catch (error) {
    return res.status(500).send("Error: Could not get all expense categories");
  }
}
