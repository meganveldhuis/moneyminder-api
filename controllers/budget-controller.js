import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

// routes:
// [x] GET all budget lines
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

export async function addBudgetAndCategory(req, res) {
  console.log(req.body);
  let newCategory = {
    category_name: req.body.category_name,
    description: req.body.description,
    is_income: req.body.is_income || true,
  };
  let newBudget = {
    amount: req.body.amount,
    note: req.body.note,
    is_per_year: req.body.is_per_year || false,
  };
  if (
    !newCategory.category_name ||
    !newCategory.description ||
    !newBudget.amount
  ) {
    return res.status(400).json({
      message:
        "Missing properties in the request body. Please include category_name, description, and amount",
    });
  }
  /* --------------------- Check Category isn't already in Categories Table --------------------- */
  let isNewCategory = false;
  let newCategoryID;
  let categoryID = await knex("categories")
    .select("id")
    .where({
      category_name: newCategory.category_name,
    })
    .first();

  if (categoryID) {
    //category with that name already exists, so edit existing category and don't create a new one
    const numberRowsChanged = await knex("categories")
      .where({ id: categoryID.id })
      .update(newCategory);
  } else {
    /* --------------------- Add new Category to Categories Table --------------------- */

    try {
      newCategoryID = await knex("categories").insert(newCategory);
      if (newCategoryID.length === 0) {
        return res.status(500).send(`Error adding new category`);
      }
      isNewCategory = true;
    } catch (error) {
      console.log(`Error adding new category: ${error}`);
      return res.status(500).send(`Error adding new category`);
    }
  }

  /* ---------------------Add new Budget Line to Budget Table--------------------- */

  try {
    if (isNewCategory) {
      newBudget.category_id = newCategoryID[0];
    } else {
      newBudget.category_id = categoryID.id;
    }

    const newBudgetID = await knex("budget").insert(newBudget);
    res.status(201).json(newBudgetID);
  } catch (error) {
    console.log(`Error adding new budget: ${error}`);
    res.status(500).send(`Error adding new budget`);
  }
}
