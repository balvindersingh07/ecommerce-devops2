const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

function loadCatalog() {
  const candidates = [
    path.join(__dirname, "..", "..", "shared", "catalog.json"),
    path.join(__dirname, "..", "shared", "catalog.json")
  ];
  for (const catalogPath of candidates) {
    try {
      const raw = fs.readFileSync(catalogPath, "utf8");
      return JSON.parse(raw);
    } catch {
      /* try next */
    }
  }
  return { products: [], categories: [] };
}

const catalog = loadCatalog();

if (process.env.APPINSIGHTS_CONNECTION_STRING) {
  const appInsights = require("applicationinsights");
  appInsights
    .setup(process.env.APPINSIGHTS_CONNECTION_STRING)
    .setAutoCollectRequests(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectExceptions(true)
    .start();
}

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "backend" });
});

app.get("/api/products", (_req, res) => {
  res.json(catalog.products || []);
});

app.get("/api/products/:id", (req, res) => {
  const list = catalog.products || [];
  const found = list.find((p) => String(p.id) === String(req.params.id));
  if (!found) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(found);
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}

module.exports = app;
