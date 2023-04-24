const express = require("express");
const connection = require("./src/database");
const Place = require("./src/models/places");
const User = require("./src/models/users");

const app = express();

app.use(express.json());

connection.authenticate();
connection.sync({ alter: true });
console.log("API ON");

app.listen(3333, () => {
  console.log("SERVIDOR ON!");
});

app.post("/places", async (req, res) => {
  try {
    const place = {
      name: req.body.name,

      numberPhone: req.body.numberPhone,

      openingHours: req.body.openingHours,

      description: req.body.description,

      latitude: req.body.latitude,

      longitude: req.body.longitude,
    };

    const newPlace = await Place.create(place);

    res.status(201).json(newPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/places", async (req, res) => {
  try {
    const places = await Place.findAll();
    return res.json(places);
  } catch (error) {
    res.status(500).json({ message: "Não há dados" });
  }
});

app.delete("/places/:id", async (req, res) => {
  try {
    const place = await Place.findByPk(req.params.id);
    if (!place) {
      return res.status(404).json({ message: "Local não encontrado" });
    }
    await place.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/places/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      numberPhone,
      openingHours,
      description,
      latitude,
      longitude,
    } = req.body;

    const place = await Place.findByPk(id);

    place.name = name;
    place.numberPhone = numberPhone;
    place.openingHours = openingHours;
    place.description = description;
    place.latitude = latitude;
    place.longitude = longitude;

    const placeUpdated = await place.save();

    return res.json(placeUpdated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = {
      name: req.body.name,

      email: req.body.email,

      username: req.body.username,

      password: req.body.password,
    };

    const newUser = await User.create(user);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
