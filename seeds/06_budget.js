/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("budget").del();
  await knex("budget").insert([
    {
      id: 1,
      note: "",
      amount: 500,
      category_id: 1,
      is_per_year: false,
    },
    {
      id: 2,
      note: "",
      amount: 1200,
      category_id: 2,
      is_per_year: false,
    },
    {
      id: 3,
      note: "",
      amount: 300,
      category_id: 3,
      is_per_year: false,
    },
    {
      id: 4,
      note: "",
      amount: 100,
      category_id: 4,
      is_per_year: false,
    },
    {
      id: 5,
      note: "expected monthly amount",
      amount: 1000,
      category_id: 5,
      is_per_year: false,
    },
    {
      id: 6,
      note: "expected monthly amount",
      amount: 80,
      category_id: 6,
      is_per_year: false,
    },
    {
      id: 7,
      note: "",
      amount: 80,
      category_id: 7,
      is_per_year: false,
    },
  ]);
}
