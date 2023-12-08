// models/viewership.js
const { connection: pool } = require("./db");
const { v4: uuidv4 } = require("uuid");
const date = require("date-and-time");
async function addViewedVideo(video_id, user_id) {
  const timestamp = Math.floor(Date.now() / 1000); // Epoch time in seconds
  const id = uuidv4();
  const existingView = await getViewByVideoAndUser(video_id, user_id);

  if (existingView) {
    // If view_id already exists, update the datetime
    const updateQuery =
      "UPDATE watched_videos SET datetime = $1 WHERE view_id = $2";
    await pool.query(updateQuery, [currentDateTime(), existingView.view_id]);
  } else {
    // If view_id doesn't exist, insert a new record
    const insertQuery =
      "INSERT INTO watched_videos (view_id, video_id, user_id, datetime) VALUES ($1, $2, $3, $4)";
    await pool.query(insertQuery, [
      video_id,
      video_id,
      user_id,
      currentDateTime(),
    ]);
  }
}
async function getViewByVideoAndUser(video_id, user_id) {
  const query =
    "SELECT view_id FROM watched_videos WHERE video_id = $1 AND user_id = $2 LIMIT 1";
  const result = await pool.query(query, [video_id, user_id]);
  return result.rows.length > 0 ? result.rows[0] : null;
}
function currentDateTime() {
  return date.format(new Date(), "YYYY-MM-DD HH:mm:ss");
}
// Assuming you have a connection pool (`pool`) established already

async function getLast10ViewedVideos(user_id) {
  const query =
    "SELECT DISTINCT ON (video_id) video_id, datetime FROM watched_videos WHERE user_id = $1 ORDER BY video_id, datetime DESC LIMIT 10";
  const result = await pool.query(query, [user_id]);
  return result.rows.sort((a, b) =>
    b.datetime.toString().localeCompare(a.datetime.toString())
  );
}

module.exports = {
  addViewedVideo,
  getLast10ViewedVideos,
};
