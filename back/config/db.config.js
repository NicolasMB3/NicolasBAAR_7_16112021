const dotenv = require("dotenv")
// .env config
// DB_HOST=
// DB_USER=
// DB_PASSWORD=
// DB_NAME=
dotenv.config({ path: '.env' });

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
