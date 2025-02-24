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
    {
      id: 7,
      date: new Date(2025, 1, 1),
      name: "February rent",
      amount: 800,
      category_id: 2,
      currency_id: 1,
    },
    {
      date: new Date(2025, 1, 4),
      name: "Electricity bill",
      amount: 250,
      category_id: 3,
      currency_id: 1,
    },
    {
      date: new Date(2025, 1, 7),
      name: "Sobeys",
      amount: 175.2,
      category_id: 1,
      currency_id: 1,
    },
    {
      date: new Date(2025, 1, 9),
      name: "Climbing at Rock Jungle",
      amount: 22.5,
      category_id: 4,
      currency_id: 1,
    },
    {
      date: new Date(2025, 1, 9),
      name: "Dinner with friends",
      amount: 35.1,
      category_id: 7,
      currency_id: 1,
    },
    {
      date: new Date(2025, 1, 13),
      name: "Meal Prep",
      amount: 200,
      category_id: 1,
      currency_id: 1,
    },
    {
      date: new Date(2025, 1, 13),
      name: "Sobeys",
      amount: 200,
      category_id: 1,
      currency_id: 1,
    },
  ]);
}
