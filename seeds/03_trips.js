/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("trips").del();
  await knex("trips").insert([
    {
      id: 1,
      trip_name: "Europe 2024",
      from_date: new Date(2024, 6, 1),
      to_date: new Date(2024, 7, 1),
      currency_id: 3,
    },
    {
      id: 2,
      trip_name: "Japan 2024",
      from_date: new Date(2024, 8, 1),
      to_date: new Date(2024, 8, 14),
      currency_id: 4,
    },
  ]);
}
