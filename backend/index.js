const express = require("express");
const cors = require("cors");
const app = express();
var db = require("./database.js");

app.use(cors());

// ~/api/samples
// ~/api/input_conditions
// ~/api/test_point_collections
app.get("/", (req, res) => {
    res.send(new Date());
});

app.get("/api/samples", (req, res) => {
    var sql = "select * from samples";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows);
    });
});

app.get("/api/input_conditions", (req, res) => {
    var sql = "select * from input_conditions";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows);
    });
});

app.get("/api/test_point_collections", (req, res) => {
    var sql = "select * from test_point_collections";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
