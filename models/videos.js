const { connection: pool } = require("./db");
const { v4: uuidv4 } = require("uuid");
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

async function getVideoByIdModel(videoId) {
  try {
    const query = "SELECT * FROM melon_videos WHERE video_id = $1";
    const values = [videoId];
    const result = await pool.query(query, values);
    return result.rows[0]; // Assuming there's only one video with the given ID
  } catch (error) {
    console.error(`Error retrieving video with ID ${videoId}:`, error);
    throw error;
  }
}

async function getVideosByIdsModel(videoIds) {
  try {
    const query = "SELECT * FROM melon_videos WHERE video_id = ANY($1)";
    const values = [videoIds];
    const result = await pool.query(query, values);
    return result.rows; // Returning an array of videos
  } catch (error) {
    console.error(
      `Error retrieving videos with IDs ${videoIds.join(", ")}:`,
      error
    );
    throw error;
  }
}

async function insertVideo(video) {
  try {
    const { title, url } = video;

    // Generate a unique id using uuid
    const id = uuidv4();

    const query =
      "INSERT INTO melon_videos (video_id, title, video_url, view_count) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [id, title, url, 0];

    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting video:", error);
    throw error;
  }
}

module.exports = {
  getAllVideos,
  insertVideo,
  getVideoByIdModel,
  getVideosByIdsModel,
};
