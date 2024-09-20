import express, { json } from "express";
const app = express();
const port = process.env.PORT || 3000;

app.use(json()); // Middleware to parse JSON requests

// In-memory storage (temporary)
let dataStore = [
  //   {
  //     id: "578c",
  //     cityName: "Sonepur",
  //     country: "India",
  //     emoji: "🇮🇳",
  //     date: "2024-09-08T18:40:28.848Z",
  //     notes: "",
  //     position: {
  //       lat: "25.69289353811285",
  //       lng: "85.18043295053334",
  //     },
  //   },
];

// GET all cities
app.get("/cities", (req, res) => {
  res.json(dataStore);
});

// POST an item
app.post("/cities", (req, res) => {
  const item = req.body;
  dataStore.push(item);
  res.status(201).json(item);
});

// GET a specific item by ID (index in array)
app.get("/cities/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < dataStore.length) {
    res.json(dataStore[id]);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// DELETE an item by ID
app.delete("/cities/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < dataStore.length) {
    const deletedItem = dataStore.splice(id, 1);
    res.json(deletedItem);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// PUT (update) an item by ID
app.put("/cities/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (id >= 0 && id < dataStore.length) {
    dataStore[id] = req.body;
    res.json(dataStore[id]);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
