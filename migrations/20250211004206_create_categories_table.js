/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  //create tables
  return knex.schema.createTable("categories", (table) => {
    table.increments("id").primary();
    table.string("category_name").notNullable();
    table.text("description");
    table.boolean("is_income").defaultTo(false);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  //delete tables
  return knex.schema.dropTable("categories");
}
