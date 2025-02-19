import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export async function getAllTrips(req, res) {
  try {
    let queryBuilder = knex("trips");

    const data = await queryBuilder;
    if (!data) {
      return res.status(204).send(`No trips data `);
    }
    res.send(data);
  } catch (error) {
    console.log(`Error getting trips ${error}`);
    return res.status(500).send(`Error getting trips`);
  }
}

export async function getTripById(req, res) {
  let trip_id = req.params.id || "";
  try {
    let queryBuilder = knex("trips").where({ id: trip_id }).first();

    const data = await queryBuilder;
    if (!data) {
      return res.status(204).send(`No trips data for category ID`);
    }
    res.send(data);
  } catch (error) {
    console.log(`Error getting trip with id ${id} : ${error}`);
    return res.status(500).send(`Error getting trip with id ${id}`);
  }
}
