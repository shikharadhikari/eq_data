const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(express.json());

let earthquakes = require("./earthquakeData.json");

app.get("/earthquakes", (req, res) => {
  res.json(earthquakes);
});

app.get("/earthquakes/:id", (req, res) => {
  const eq = earthquakes.find((e) => e.id === req.params.id);
  if (!eq) return res.status(404).json({ message: "Earthquake not found" });
  res.json(eq);
});

app.post("/earthquakes", (req, res) => {
  const { id, country, magnitude, date } = req.body;
  if (!id || !country || !magnitude || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }
  earthquakes.push({ id, country, magnitude, date });
  res
    .status(201)
    .json({
      message: "Earthquake added",
      data: { id, country, magnitude, date },
    });
});

app.put("/earthquakes/:id", (req, res) => {
  const index = earthquakes.findIndex((e) => e.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Earthquake not found" });

  earthquakes[index] = { ...earthquakes[index], ...req.body };
  res.json({ message: "Earthquake updated", data: earthquakes[index] });
});

app.delete("/earthquakes/:id", (req, res) => {
  const index = earthquakes.findIndex((e) => e.id === req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Earthquake not found" });

  earthquakes.splice(index, 1);
  res.json({ message: "Earthquake deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
