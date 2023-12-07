// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const viewedVideoRoutes = require("./routes/viewedVideoRoutes");
const addVideo = require("./routes/addVideo");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
// app.get("/last-10-viewed-videos/:customerId", (req, res) => {
//   res.send("ok");
// });

// app.use(bodyParser.json());
app.use(viewedVideoRoutes);
//app.use(addVideo);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
