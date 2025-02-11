/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("categories").del();
  await knex("categories").insert([
    {
      id: 1,
      category_name: "Groceries",
      description: "includes any food eaten at home",
      is_income: false,
    },
    {
      id: 2,
      category_name: "Rent",
      description: "",
      is_income: false,
    },
    {
      id: 3,
      category_name: "Utilities",
      description: "includes electricity, heating, water, and phone bills",
      is_income: false,
    },
    {
      id: 4,
      category_name: "Health and Fitness",
      description: "includes any day passes for fitness classes",
      is_income: false,
    },
    {
      id: 5,
      category_name: "Job",
      description: "",
      is_income: true,
    },
    {
      id: 6,
      category_name: "Photography",
      description: "",
      is_income: true,
    },
  ]);
}
