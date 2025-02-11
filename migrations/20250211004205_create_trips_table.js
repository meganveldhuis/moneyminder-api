/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  //create tables
  return knex.schema.createTable("trips", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.date("from_date").notNullable();
    table.date("to_date").notNullable();
    table
      .integer("currency_id")
      .unsigned()
      .references("currencies.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  //delete tables
  return knex.schema.dropTable("trips");
}
