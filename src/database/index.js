const Sequelize = require("sequelize");

const connection = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "123456",
  database: "places_trindade",
  define: {
    timestamps: true,
    underscored: true,
    underscoresAll: true,
  },
});

module.exports = connection;
