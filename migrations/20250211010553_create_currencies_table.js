/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  //create tables
  return knex.schema.createTable("currencies", (table) => {
    table.increments("id").primary();
    table.string("code").notNullable();
    table.decimal("conversion_to_CAD");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  //delete tables
  return knex.schema.dropTable("currencies");
}
