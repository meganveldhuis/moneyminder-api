import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

/* -------------------------------------------------------------------------- */
/*                             Reusable Functions                             */
/* -------------------------------------------------------------------------- */
//TODO: maybe add these to a utils file?
function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

async function doesCategoryExist(category_id) {
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
  return [status, message, categoryData[0]];
}

async function doesCurrencyExist(currency_id) {
  let status = 200;
  let message = ``;
  let currencyData;
  try {
    currencyData = await knex("currencies").where({
      id: currency_id,
    });
    if (!currencyData || currencyData.length === 0) {
      status = 404;
      message = `No currency found with ID ${currency_id}.`;
      console.log(`No currency found with ID ${currency_id}.`);
    }
  } catch (error) {
    status = 404;
    message = `Error: could not find currency with ID ${currency_id}`;
    console.log(
      `Error: could not find currency with ID ${currency_id} ${error}`
    );
  }
  return [status, message, currencyData];
}

/* -------------------------------------------------------------------------- */
/*                               Income Endpoints                             */
/* -------------------------------------------------------------------------- */

/*
 * [x] `get` all income records
 * [x] `get` income by id
 * [x] `post` new income record
 * [x] `patch` edit income record
 * [x] `delete` income record
 */

export async function getAllIncome(req, res) {
  let query = req.query.search || "";
  try {
    let queryBuilder = knex("income").select(
      "income.id",
      "income.date",
      "income.created_at",
      "income.updated_at",
      "income.name",
      "income.amount",
      "categories.category_name",
      "currencies.code"
    );
    queryBuilder = queryBuilder
      .join("categories", "categories.id", "category_id")
      .join("currencies", "currencies.id", "currency_id")
      .whereILike("income.name", `%${query}%`)
      .orderBy("expenses.updated_at", "desc");
    const data = await queryBuilder;

    res.send(data);
  } catch (error) {
    console.log(`Error getting all income records: ${error}`);
    res.status(500).send(`Error getting all income records`);
  }
}

export async function getSingleIncomeRecord(req, res) {
  try {
    let queryBuilder = knex("income").select(
      "income.id",
      "income.date",
      "income.created_at",
      "income.updated_at",
      "income.name",
      "income.amount",
      "categories.category_name",
      "currencies.code"
    );
    queryBuilder = queryBuilder
      .join("categories", "categories.id", "category_id")
      .join("currencies", "currencies.id", "currency_id")
      .where({ "income.id": req.params.id });
    const data = await queryBuilder;
    if (data.length < 1) {
      return res.status(404).send(`No expense record with id ${req.params.id}`);
    }

    res.send(data);
  } catch (error) {
    console.log(
      `Error getting income record with id ${req.params.id}: ${error}`
    );
    res
      .status(500)
      .send(`Error getting income record with id ${req.params.id}`);
  }
}

export async function addIncomeRecord(req, res) {
  /* ----------------------------- Validate Inputs ---------------------------- */
  let newRecord = req.body;
  if (
    !newRecord.date ||
    !newRecord.name ||
    !newRecord.amount ||
    !newRecord.category_id ||
    !newRecord.currency_id
  ) {
    return res.status(400).json({
      message:
        "Missing properties in the request body. Please include date, name, amount, category_id, and currency_id",
    });
  }
  newRecord.date = new Date(newRecord.date);
  if (!isValidDate(newRecord.date)) {
    return res.status(400).send(`Error: ${newRecord.date} is not a valid date`);
  }
  //check if category exists
  const doesCategory = await doesCategoryExist(newRecord.category_id);
  let [status, message, categoryData] = doesCategory;
  if (status !== 200) {
    return res.status(status).send(message);
  }
  if (!categoryData.is_income) {
    return res
      .status(400)
      .send(`Error: Category chosen needs to be an Income category`);
  }

  //check if currency exists
  const doesCurrency = await doesCurrencyExist(newRecord.currency_id);
  let currencyData;
  [status, message, currencyData] = doesCurrency;
  if (status !== 200) {
    return res.status(status).send(message);
  }

  /* --------------------- Add new Record to Income Table --------------------- */
  try {
    const newRecordID = await knex("income").insert(newRecord);
    res.status(201).json(newRecordID);
  } catch (error) {
    console.log(`Error adding new income record: ${error}`);
    res.status(500).send(`Error adding new income record`);
  }
}

export async function editIncomeRecord(req, res) {
  /* ----------------------------- Validate Inputs ---------------------------- */
  const { id } = req.params;
  let edits = {};
  let status, message, categoryData, currencyData;
  if (req.body.date !== undefined) {
    edits.date = new Date(req.body.date);
  }
  if (req.body.name !== undefined) {
    edits.name = req.body.name;
  }
  if (req.body.amount !== undefined) {
    edits.amount = Number(req.body.amount);
  }
  if (req.body.category_id !== undefined) {
    //check if category exists
    const doesCategory = await doesCategoryExist(req.body.category_id);
    [status, message, categoryData] = doesCategory;
    if (status !== 200) {
      return res.status(status).send(message);
    }
    if (!categoryData.is_income) {
      return res
        .status(400)
        .send(`Error: Category chosen needs to be an Income category`);
    }
    edits.category_id = req.body.category_id;
  }
  if (req.body.currency_id !== undefined) {
    //check if currency exists
    const doesCurrency = await doesCurrencyExist(req.body.currency_id);
    [status, message, currencyData] = doesCurrency;
    if (status !== 200) {
      return res.status(status).send(message);
    }
    edits.currency_id = req.body.currency_id;
  }

  /* --------------------------- Check record exists -------------------------- */
  try {
    const incomeRecord = await knex("income").where({ id: id }).first();
    if (!incomeRecord) {
      return res.status(404).send(`Income record not found with id ${id}`);
    }
  } catch (error) {
    console.log(`Income record not found with id ${id}: ${error}`);
    return res.status(404).send(`Income record not found with id ${id}`);
  }

  /* -------------------------- Edit Record in Table -------------------------- */
  try {
    const numberRowsChanged = await knex("income")
      .where({ id: id })
      .update(edits);
    if (numberRowsChanged < 1) {
      return res.status(500).send(`Error occured. Income record not updated`);
    }
    const editedRecord = await getSingleIncomeRecord(req, res);
  } catch (error) {
    console.log(`Error editing income record: ${error}`);
    return res.status(500).send(`Error editing income record`);
  }
}

export async function deleteIncomeRecord(req, res) {
  const { id } = req.params;
  try {
    // Check if income record exists before deleting
    const existingRecord = await knex("income").where({ id }).first();
    if (!existingRecord) {
      return res
        .status(404)
        .json({ message: `No income record found with id: ${id}` });
    }

    // Delete the record
    await knex("income").where({ id }).del();

    return res.status(200).json({
      message: `Income record with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.error(`Error deleting record with id ${id}:`, error);
    return res.status(500).json({
      message: `Error deleting record with id: ${id}`,
    });
  }
}
