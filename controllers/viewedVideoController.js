// controllers/viewedVideoController.js
const {
  addViewedVideo,
  getLast10ViewedVideos,
} = require("../models/viewership");

async function viewVideo(req, res) {
  try {
    const { videoTitle, customerId } = req.body;
    await addViewedVideo(videoTitle, customerId);
    res.status(200).json({ message: "Video viewed successfully" });
  } catch (error) {
    console.error("Error viewing video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getLastViewedVideos(req, res) {
  try {
    const customerId = req.params.customerId;
    console.log(customerId);
    const videos = await getLast10ViewedVideos(customerId);
    res.status(200).json(videos);
  } catch (error) {
    console.error("Error retrieving last viewed videos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  viewVideo,
  getLastViewedVideos,
};
