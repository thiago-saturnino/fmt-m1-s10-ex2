/*Após criar o modelo User no exercício anterior, é necessário implementar uma rota
 do tipo POST com o path "/users" que receba valores por meio de BODY params.
*/

const express = require("express");
const connection = require("./src/database");
const Place = require("./src/models/places");
const User = require("./src/models/users");

const app = express();

app.use(express.json());

connection.authenticate();
connection.sync({ alter: true });
console.log("API ON");

app.listen(3332, () => {
  console.log("SERVIDOR ON!");
});

app.post("/places", async (request, response) => {
  try {
    const place = {
      name: request.body.name,
      numberPhone: request.body.numberPhone,
      openingHours: request.body.openingHours,
      description: request.body.description,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
    };

    const newPlace = await Place.create(place);

    response.status(201).json(newPlace);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

app.get("/places", async (request, response) => {
  try {
    const places = await Place.findAll();
    return response.json(places);
  } catch (error) {
    response.status(500).json({ message: "Não há dados" });
  }
});

app.delete("/places/:id", async (request, response) => {
  try {
    const place = await Place.findByPk(request.params.id);
    if (!place) {
      return response.status(404).json({ message: "Local não encontrado" });
    }
    await place.destroy();
    response.status(204).json();
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

app.put("/places/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const {
      name,
      numberPhone,
      openingHours,
      description,
      latitude,
      longitude,
    } = request.body;

    const place = await Place.findByPk(id);

    place.name = name;
    place.numberPhone = numberPhone;
    place.openingHours = openingHours;
    place.description = description;
    place.latitude = latitude;
    place.longitude = longitude;

    const placeUpdated = await place.save();

    return response.json(placeUpdated);
  } catch (error) {
    return response.status(400).json({ message: error.message });
  }
});

app.post("/users", async (request, response) => {
  try {
    const user = {
      name: request.body.name,
      email: request.body.email,
      username: request.body.username,
      password: request.body.password,
    };

    const newUser = await User.create(user);

    response.status(201).json(newUser);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});
