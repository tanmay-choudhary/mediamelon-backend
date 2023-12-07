// models/viewership.js
const { connection: pool } = require("./db");
const { v4: uuidv4 } = require("uuid");
async function addViewedVideo(video_id, user_id) {
  const timestamp = Math.floor(Date.now() / 1000); // Epoch time in seconds
  const id = uuidv4();
  const query =
    "INSERT INTO viewed_videos (view_id, video_id, user_id) VALUES ($1, $2, $3)";
  await pool.query(query, [id, video_id, user_id]);
}

// Assuming you have a connection pool (`pool`) established already

async function getLast10ViewedVideos(customerId) {
  try {
    const query = `
      SELECT DISTINCT ON (video_id) timestamp, video_id, title AS video_title, thumbnail
      FROM latest_viewed_videos2
      WHERE user_id = $1
      ORDER BY video_id, timestamp DESC 
      LIMIT 10`;

    const result = await pool.query(query, [customerId]);
    return result.rows;
  } catch (error) {
    console.error("Error retrieving last viewed videos:", error);
    throw error;
  }
}

module.exports = {
  addViewedVideo,
  getLast10ViewedVideos,
};
