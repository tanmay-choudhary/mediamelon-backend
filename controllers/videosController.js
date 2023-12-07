const {
  getAllVideos,
  insertVideo,
  getVideoByIdModel,
} = require("../models/videos");

async function getAllVideosController(req, res) {
  try {
    const videos = await getAllVideos();
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error in getAllVideosController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getVideoById(req, res) {
  try {
    const id = req.params.id;
    const videos = await getVideoByIdModel(id);
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error in getAllVideosController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createVideoController(req, res) {
  try {
    const { title, url } = req.body;

    if (!title || !url) {
      return res.status(400).json({ error: "Title and URL are required." });
    }

    const newVideo = await insertVideo({ title, url });
    res.status(201).json(newVideo);
  } catch (error) {
    console.error("Error in createVideoController:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAllVideosController,
  createVideoController,
  getVideoById,
};
