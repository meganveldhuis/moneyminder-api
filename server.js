import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

//All income routes
import incomeRoutes from "./routes/income-routes.js";
app.use("/api/income", incomeRoutes);

//All expense routes
import expenseRoutes from "./routes/expense-routes.js";
app.use("/api/expense", expenseRoutes);

//All category routes
import categoryRoutes from "./routes/category-routes.js";
app.use("/api/categories", categoryRoutes);

//All date routes
import dateRoutes from "./routes/date-routes.js";
app.use("/api/date", dateRoutes);

//All currency routes
import currencyRoutes from "./routes/currency-routes.js";
app.use("/api/currency", currencyRoutes);

//All budget routes
import budgetRoutes from "./routes/budget-routes.js";
app.use("/api/budget", budgetRoutes);

//All trips routes
import tripRoutes from "./routes/trip-routes.js";
app.use("/api/trips", tripRoutes);

//All photo routes
import photoRoutes from "./routes/photo-routes.js";
app.use("/api/photo", photoRoutes);

import geminiRoutes from "./routes/gemini-routes.js";
app.use("/api/gemini", geminiRoutes);

app.get("/", (req, res) => {
  res.send("Reached the server!");
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      `Server is Successfully Running, and App is listening on port ` + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
