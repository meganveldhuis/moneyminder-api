import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

/* -------------------------------------------------------------------------- */
/*                             Reusable Functions                             */
/* -------------------------------------------------------------------------- */
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

async function doesTripExist(trip_id) {
  let status = 200;
  let message = ``;
  let tripData = [];
  try {
    tripData = await knex("trips").where({
      id: trip_id,
    });
    if (!tripData || tripData.length === 0) {
      status = 404;
      message = `No trip found with ID ${trip_id}.`;
      console.log(`No trip found with ID ${trip_id}.`);
    }
  } catch (error) {
    status = 404;
    message = `Error: could not find trip with ID ${trip_id}`;
    console.log(`Error: could not find trip with ID ${trip_id} ${error}`);
  }
  return [status, message, tripData[0]];
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
/*                              Expenses Endpoints                            */
/* -------------------------------------------------------------------------- */

/*
 * [x] `get` all expense records
 * [x] `get` expense by id
 * [x] `post` new expense record
 * [x] `patch` edit expense record
 * [x] `delete` expense record
 */

export async function getAllExpenses(req, res) {
  let query = req.query.search || "";
  let filterByYear = req.query.year || "";
  let filterByMonth = req.query.month || "";
  let filterByCategoryId = req.query.category || "";
  if (filterByMonth) {
    // month inputs start at index of 0
    filterByMonth = String(Number(filterByMonth) + 1);
  }
  try {
    let queryBuilder = knex("expenses").select(
      "expenses.id",
      "expenses.date",
      "expenses.created_at",
      "expenses.updated_at",
      "expenses.name",
      "expenses.amount",
      "categories.category_name",
      "currencies.code",
      "trips.trip_name"
    );
    queryBuilder = queryBuilder
      .join("categories", "categories.id", "category_id")
      .join("currencies", "currencies.id", "currency_id")
      .leftJoin("trips", "trips.id", "trip_id")
      .whereILike("expenses.name", `%${query}%`)
      .orderBy("expenses.updated_at", "desc");

    //for simplicity and better UI, we will only allow a filter by month if the year is set.
    if (filterByYear && filterByYear != 0) {
      if (filterByMonth) {
        if (filterByMonth.length === 1) {
          filterByMonth = `0${filterByMonth}`;
        }
        let nextMonth = Number(filterByMonth) + 1;
        let nextYear = filterByYear;
        if (nextMonth === 13) {
          nextMonth = "01";
          nextYear = filterByYear + 1;
        }
        queryBuilder = queryBuilder
          .where("date", ">=", `${filterByYear}-${filterByMonth}-01T00:00:00Z`)
          .where("date", "<", `${nextYear}-${nextMonth}-01T00:00:00Z`);
      } else {
        queryBuilder = queryBuilder
          .where("date", ">=", `${filterByYear}-01-01T00:00:00Z`)
          .where("date", "<=", `${filterByYear}-12-31T23:59:59Z`);
      }
    }
    if (filterByCategoryId && filterByCategoryId != 0) {
      queryBuilder = queryBuilder.where({
        "expenses.category_id": filterByCategoryId,
      });
    }
    const data = await queryBuilder;

    res.send(data);
  } catch (error) {
    console.log(`Error getting all expense records: ${error}`);
    res.status(500).send(`Error getting all expense records`);
  }
}

export async function getExpensesByCategory(req, res) {
  let filterByYear = req.query.year || "";
  let filterByMonth = req.query.month || "";
  if (filterByMonth) {
    // month inputs start at index of 0
    filterByMonth = String(Number(filterByMonth) + 1);
  }
  try {
    let queryBuilder = knex("expenses")
      .select("categories.category_name", "expenses.category_id")
      .join("categories", "categories.id", "category_id")
      .sum("amount as total")
      .groupBy("category_name", "category_id");
    if (filterByYear && filterByYear != 0) {
      if (filterByMonth) {
        if (filterByMonth.length === 1) {
          filterByMonth = `0${filterByMonth}`;
        }
        let nextMonth = Number(filterByMonth) + 1;
        let nextYear = filterByYear;
        if (nextMonth === 13) {
          nextMonth = "01";
          nextYear = filterByYear + 1;
        }
        queryBuilder = queryBuilder
          .where("date", ">=", `${filterByYear}-${filterByMonth}-01T00:00:00Z`)
          .where("date", "<", `${nextYear}-${nextMonth}-01T00:00:00Z`);
      } else {
        queryBuilder = queryBuilder
          .where("date", ">=", `${filterByYear}-01-01T00:00:00Z`)
          .where("date", "<=", `${filterByYear}-12-31T23:59:59Z`);
      }
    }
    const response = await queryBuilder;
    if (response.length === 0) {
      return res.status(204).send(`No data exists for request`);
    }
    return res.status(200).send(response);
  } catch (error) {
    console.log(`Error getting expense records by category: ${error}`);
    res.status(500).send(`Error getting expense records by category`);
  }
}

export async function getSingleExpenseRecord(req, res) {
  try {
    let queryBuilder = knex("expenses").select(
      "expenses.id",
      "expenses.date",
      "expenses.created_at",
      "expenses.updated_at",
      "expenses.name",
      "expenses.amount",
      "categories.category_name",
      "currencies.code as currency_code",
      "trips.trip_name"
    );
    queryBuilder = queryBuilder
      .join("categories", "categories.id", "category_id")
      .join("currencies", "currencies.id", "currency_id")
      .leftJoin("trips", "trips.id", "trip_id")
      .where({ "expenses.id": req.params.id });
    const data = await queryBuilder;
    if (data.length < 1) {
      return res.status(404).send(`No expense record with id ${req.params.id}`);
    }

    res.send(data[0]);
  } catch (error) {
    console.log(
      `Error getting expense record with id ${req.params.id}: ${error}`
    );
    res
      .status(500)
      .send(`Error getting expense record with id ${req.params.id}`);
  }
}

export async function addExpenseRecord(req, res) {
  /* ----------------------------- Validate Inputs ---------------------------- */
  let newRecord = {
    date: req.body.date,
    name: req.body.name,
    amount: req.body.amount,
    category_id: req.body.category_id,
    currency_id: req.body.currency_id,
    trip_id: req.body.trip_id ? req.body.trip_id : null,
  };
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
  //check if trip exists
  if (newRecord.trip_id) {
    const doesTrip = await doesTripExist(newRecord.trip_id);
    let [status, message, tripData] = doesTrip;
    if (status !== 200) {
      return res.status(status).send(message);
    }
  }

  //check if category exists and is an Expense category
  const doesCategory = await doesCategoryExist(newRecord.category_id);
  let [status, message, categoryData] = doesCategory;
  if (status !== 200) {
    return res.status(status).send(message);
  }
  if (categoryData.is_income) {
    return res
      .status(400)
      .send(`Error: Category chosen needs to be an Expense category`);
  }

  //check if currency exists
  const doesCurrency = await doesCurrencyExist(newRecord.currency_id);
  let currencyData;
  [status, message, currencyData] = doesCurrency;
  if (status !== 200) {
    return res.status(status).send(message);
  }

  /* --------------------- Add new Record to Expenses Table --------------------- */
  try {
    const newRecordID = await knex("expenses").insert(newRecord);
    res.status(201).json(newRecordID);
  } catch (error) {
    console.log(`Error adding new expense record: ${error}`);
    res.status(500).send(`Error adding new expense record`);
  }
}

export async function editExpenseRecord(req, res) {
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
  if (req.body.trip_id !== undefined) {
    //check if trip exists
    if (req.body.trip_id) {
      const doesTrip = await doesTripExist(newRecord.trip_id);
      let [status, message, tripData] = doesTrip;
      if (status !== 200) {
        return res.status(status).send(message);
      }
    }
    edits.trip_id = req.body.trip_id ? req.body.trip_id : null;
  }
  if (req.body.category_id !== undefined) {
    //check if category exists
    const doesCategory = await doesCategoryExist(req.body.category_id);
    [status, message, categoryData] = doesCategory;
    if (status !== 200) {
      return res.status(status).send(message);
    }
    if (categoryData.is_income) {
      return res
        .status(400)
        .send(`Error: Category chosen needs to be an Expense category`);
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
    const expenseRecord = await knex("expenses").where({ id: id }).first();
    if (!expenseRecord) {
      return res.status(404).send(`Expense record not found with id ${id}`);
    }
  } catch (error) {
    console.log(`Expense record not found with id ${id}: ${error}`);
    return res.status(404).send(`Expense record not found with id ${id}`);
  }

  /* -------------------------- Edit Record in Table -------------------------- */
  try {
    const numberRowsChanged = await knex("expenses")
      .where({ id: id })
      .update(edits);
    if (numberRowsChanged < 1) {
      return res.status(500).send(`Error occured. Expense record not updated`);
    }
    const editedRecord = await getSingleExpenseRecord(req, res);
  } catch (error) {
    console.log(`Error editing expense record: ${error}`);
    return res.status(500).send(`Error editing expense record`);
  }
}

export async function deleteExpenseRecord(req, res) {
  const { id } = req.params;
  try {
    // Check if expenses record exists before deleting
    const existingRecord = await knex("expenses").where({ id }).first();
    if (!existingRecord) {
      return res
        .status(404)
        .json({ message: `No expense record found with id: ${id}` });
    }

    // Delete the record
    await knex("expenses").where({ id }).del();

    return res.status(200).json({
      message: `expense record with id ${id} deleted successfully`,
    });
  } catch (error) {
    console.error(`Error deleting record with id ${id}:`, error);
    return res.status(500).json({
      message: `Error deleting record with id: ${id}`,
    });
  }
}
