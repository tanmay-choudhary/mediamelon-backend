// controllers/viewedVideoController.js
const {
  addViewedVideo,
  getLast10ViewedVideos,
} = require("../models/viewership");
const { getVideoByIdModel } = require("../models/videos");

const cache = new Map();
const cacheOrder = [];
async function viewVideo(req, res) {
  try {
    const { video_id, user_id } = req.body;
    await addViewedVideo(video_id, user_id);
    // Update the cache for the user_id after successfully viewing the video
    if (cache.has(user_id)) {
      console.log(`Updating cache for user_id: ${user_id}`);

      // Fetch the latest viewed videos from the database
      const videos = await getLast10ViewedVideos(user_id);

      // Update the cache with the latest videos
      cache.set(user_id, videos);
    }
    res.status(200).json({ message: "Video viewed successfully" });
  } catch (error) {
    console.error("Error viewing video:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getLastViewedVideos(req, res) {
  try {
    const user_id = req.params.user_id;

    // Check if the result is present in the cache
    if (cache.has(user_id)) {
      console.log(`Cache hit for user_id: ${user_id}`);

      // Update the cache order (move accessed item to the front)
      const index = cacheOrder.indexOf(user_id);
      if (index !== -1) {
        cacheOrder.splice(index, 1);
        cacheOrder.unshift(user_id);
      }

      const cachedResult = cache.get(user_id);
      const videoIds = cachedResult.map((video) => video.video_id);
      let videos = [];
      for (let i = 0; i < videoIds.length; i++) {
        let data = await getData(videoIds[i]);
        videos.push(data);
      }
      //let videos =
      res.status(200).json(videos);
      return;
    }

    // If not present in the cache, fetch from the database
    const videos = await getLast10ViewedVideos(user_id);

    // Update the cache with the result
    cache.set(user_id, videos);
    cacheOrder.unshift(user_id);

    // If the cache size exceeds 10, remove the least recently used item
    if (cacheOrder.length > 10) {
      const lruUserId = cacheOrder.pop();
      cache.delete(lruUserId);
    }

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error retrieving last viewed videos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getData(videoId) {
  try {
    return await getVideoByIdModel(videoId);
  } catch (e) {
    console.log(e);
  }
  return [];
}
module.exports = {
  viewVideo,
  getLastViewedVideos,
};
