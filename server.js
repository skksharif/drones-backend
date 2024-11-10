// backend/server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint to get products
app.get("/api/products", (req, res) => {
  fs.readFile(path.join(__dirname, "products.json"), "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "Could not read data" });
    res.json(JSON.parse(data));
  });
});

// Endpoint to update products
app.post("/api/update-product", (req, res) => {
  const updatedProducts = req.body.products;
  fs.writeFile(
    path.join(__dirname, "products.json"),
    JSON.stringify(updatedProducts, null, 2),
    (err) => {
      if (err) return res.status(500).json({ error: "Could not update data" });
      res.json({ message: "Products updated successfully" });
    }
  );
});

const PORT =process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
