// app.js
const express = require("express");
const bodyParser = require("body-parser");
const viewedVideoRoutes = require("./routes/viewedVideoRoutes");

const app = express();
const port = 3001;

// app.get("/last-10-viewed-videos/:customerId", (req, res) => {
//   res.send("ok");
// });

// app.use(bodyParser.json());
app.use(viewedVideoRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
