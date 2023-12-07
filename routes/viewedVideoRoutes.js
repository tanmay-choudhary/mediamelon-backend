// routes/viewedVideoRoutes.js
const express = require("express");
const router = express.Router();
const {
  viewVideo,
  getLastViewedVideos,
} = require("../controllers/viewedVideoController");
const {
  getAllVideosController,
  createVideoController,
  getVideoById,
} = require("../controllers/videosController");
router.post("/viewed-video", viewVideo);
router.get("/last-10-viewed-videos/:user_id", getLastViewedVideos);
router.get("/videos", getAllVideosController);
router.post("/addvideos", createVideoController);
router.get("/getVideoById/:id", getVideoById);
module.exports = router;
