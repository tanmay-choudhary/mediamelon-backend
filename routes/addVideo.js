// routes/viewedVideoRoutes.js
const express = require("express");
const router = express.Router();
const { createVideoController } = require("../controllers/videosController");

router.post("/addvideos", createVideoController);
module.exports = router;
