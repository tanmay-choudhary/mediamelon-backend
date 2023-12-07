// routes/viewedVideoRoutes.js
const express = require("express");
const router = express.Router();
const {
  viewVideo,
  getLastViewedVideos,
} = require("../controllers/viewedVideoController");
const { getAllVideosController } = require("../controllers/videosController");
router.post("/viewed-video", viewVideo);
router.get("/last-10-viewed-videos/:customerId", getLastViewedVideos);
router.get("/videos", getAllVideosController);
module.exports = router;
