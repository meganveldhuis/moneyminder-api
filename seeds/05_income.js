/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("income").del();
  await knex("income").insert([
    {
      id: 1,
      date: new Date(2024, 6, 1),
      name: "job 1",
      amount: 500,
      category_id: 5,
      currency_id: 1,
    },
    {
      id: 2,
      date: new Date(2024, 6, 2),
      name: "Dear Rouge concert",
      amount: 45,
      category_id: 6,
      currency_id: 1,
    },
    {
      id: 3,
      date: new Date(2024, 7, 1),
      name: "job 1",
      amount: 500,
      category_id: 5,
      currency_id: 1,
    },
    {
      id: 4,
      date: new Date(2024, 7, 1),
      name: "job 2",
      amount: 100,
      category_id: 5,
      currency_id: 1,
    },
    {
      id: 5,
      date: new Date(2024, 7, 3),
      name: "portraits",
      amount: 80,
      category_id: 6,
      currency_id: 1,
    },
  ]);
}
