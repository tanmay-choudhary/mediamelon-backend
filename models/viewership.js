// models/viewership.js
const { connection: pool } = require("./db");

async function addViewedVideo(videoTitle, customerId) {
  const timestamp = Math.floor(Date.now() / 1000); // Epoch time in seconds
  const query =
    "INSERT INTO viewership (timestamp, video_title, customer_id) VALUES ($1, $2, $3)";
  await pool.query(query, [timestamp, videoTitle, customerId]);
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
