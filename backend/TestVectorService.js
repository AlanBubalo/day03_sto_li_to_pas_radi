var db = require("./database.js");


function getVectorTable(sampleId, callback) {
    getVectorTable2(sampleId, (err, data) => {
        let rows = Object.values(data);
        rows.sort((row1, row2) => row1.TimeBetweenPoints - row2.TimeBetweenPoints);
        
        let target = [];
        for (const row of rows) {
            let points = JSON.parse(row.TestPoints);
            target.push(points[points.length - 1]);
        }

        console.log(target);

        callback(null, rows);
    })
}

function getVectorTable2(sampleId, callback) {
    getFilteredVectorTable(sampleId, (err, data) => {
        // Join Test point collections with Input conditions
        var sql = "SELECT * FROM testPointsCollections JOIN inputConditions ON testPointsCollections.InputConditionId = inputConditions.Id where testPointsCollections.Id in (" + data.toString() + ");";
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, rows);
            }
        });
    })
}

function getFilteredVectorTable(sampleId, callback) {
    // Get only filtered Test point collection
    var sql = "select * from testPointsCollections";
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            rows = rows.map((row) => {
                return {
                    'Id': row.Id,
                    'InputConditionId': row.InputConditionId,
                    'SampleIds': JSON.parse(row.SampleIds),
                }
            }).filter((row) => {
                return row.SampleIds.includes(sampleId);
            }).map((row) => {
                return row.Id
            });

            callback(null, rows);
        }
    });
}

module.exports = {
    getVectorTable
};
