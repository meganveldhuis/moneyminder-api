/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("currencies").del();
  await knex("currencies").insert([
    {
      id: 1,
      code: "CAD",
      conversion_to_CAD: 1,
    },
    {
      id: 2,
      code: "USD",
      conversion_to_CAD: 1.43,
    },
    {
      id: 3,
      code: "EUR",
      conversion_to_CAD: 1.48,
    },
    {
      id: 4,
      code: "JPY",
      conversion_to_CAD: 0.0094,
    },
  ]);
}
