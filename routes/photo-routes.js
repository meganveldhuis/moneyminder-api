import express from "express";
const router = express.Router();
import axios from "axios";
const API_key = process.env.UNSPLASH_KEY;

//hit this at: http://localhost:8080/api/photo?search=searchTerm
router.get(`/`, async (req, res) => {
  let search = req.query.search || "";
  try {
    const photoResponse = await axios.get(
      `https://api.unsplash.com/search/photos/?query=${search}&page=1&per_page=1&content_filter=high&client_id=${API_key}`
    );
    res.send(photoResponse.data.results[0]);
  } catch (error) {
    console.log(`Error: Could not retrieve photo : ${error}`);
    res.status(500).send("Error: Could not retrieve photo");
  }
});

export default router;
