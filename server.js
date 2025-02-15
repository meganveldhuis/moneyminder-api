import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

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
