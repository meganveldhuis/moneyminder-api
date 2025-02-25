import express from "express";
const router = express.Router();
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//hit this at: http://localhost:8080/api/gemini
router.post(`/`, async (req, res) => {
  let search = req.body.search || "";
  if (!search) return res.send(`Search required`);
  try {
    const response = await model.generateContent(search);
    return res.send(response.response.text());
  } catch (error) {
    console.log(`Error: Could not retrieve AI generation : ${error}`);
    return res.status(500).send("Error: Could not retrieve AI generation");
  }
});

export default router;
