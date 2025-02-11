/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("expenses").del();
  await knex("expenses").insert([
    {
      id: 1,
      date: new Date(2024, 6, 1),
      name: "Sobeys",
      amount: 120,
      category_id: 1,
      currency_id: 1,
    },
    {
      id: 2,
      date: new Date(2024, 6, 2),
      name: "Superstore",
      amount: 45,
      category_id: 1,
      currency_id: 1,
    },
    {
      id: 3,
      date: new Date(2024, 7, 1),
      name: "rent",
      amount: 500,
      category_id: 2,
      currency_id: 1,
    },
    {
      id: 4,
      date: new Date(2024, 7, 1),
      name: "water and gas",
      amount: 100,
      category_id: 3,
      currency_id: 1,
    },
    {
      id: 5,
      date: new Date(2024, 7, 3),
      name: "electricity",
      amount: 40,
      category_id: 3,
      currency_id: 1,
    },
    {
      id: 6,
      date: new Date(2024, 7, 4),
      name: "climbing day pass",
      amount: 25,
      category_id: 4,
      currency_id: 1,
    },
  ]);
}
