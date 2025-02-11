/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  //create tables
  return knex.schema.createTable("income", (table) => {
    table.increments("id").primary();
    table.date("date").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    table.string("name").notNullable();
    table.decimal("amount").notNullable();
    table
      .integer("category_id")
      .unsigned()
      .references("categories.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
      .notNullable();
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
  return knex.schema.dropTable("income");
}
