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

pool.on("error", (err) => {
  console.error("Error occurred during PostgreSQL connection:", err);
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
