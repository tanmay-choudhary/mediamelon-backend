const { connection: pool } = require("./db");

async function getAllVideos() {
  try {
    const query = "SELECT * FROM melon_videos";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error retrieving all videos:", error);
    throw error;
  }
}

module.exports = {
  getAllVideos,
};
