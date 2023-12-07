const { getAllVideos } = require("../models/videos");

async function getAllVideosController(req, res) {
  try {
    const videos = await getAllVideos();
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error in getAllVideosController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllVideosController,
};
