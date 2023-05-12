const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send({ nez: "Hello World!" });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
