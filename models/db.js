// models/db.js
// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   ssl: {
//     rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === "true",
//   },
// });

// module.exports = pool;

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "jobscout.cyqf0foa4owe.ap-south-1.rds.amazonaws.com",
  database: "postgres",
  password: "JHjh2000***",
  port: 5432, // default PostgreSQL port
  ssl: {
    rejectUnauthorized: false, // Set to true to verify SSL certificate
  },
});

// Log a message when the pool is created
// pool.on('connect', () => {
//   console.log('Connected to Database ;)');
// });

// Handle error events
pool.on("error", (err) => {
  console.error("Error occurred during PostgreSQL connection:", err);
  // You can add additional error handling logic here
});

// Log database connection status on application startup
pool
  .connect()
  .then(() => {
    console.log("Database pool is ready and connected.");
  })
  .catch((err) => {
    console.error("Error connecting to the database!");
  });
exports.connection = pool;
