const express = require("express");
const cors = require("cors");
const app = express();
var db = require("./database.js");

app.use(cors());

app.get("/", (req, res) => {
    var sql = "select * from user"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows);
    });

    // res.send({ nez: "Hello World!" });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
