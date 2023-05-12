const data = require('./demo.json')

var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

function extractSamplesFromJson() {
    const samples = data.Project.Samples;
    return samples
}

function extractInputConditionsFromJson() {
    const inputConditions = data.Project.InputConditions;
    return inputConditions
}

function extractTestPointCollectionsFromJson() {
    const testPointCollections = data.TestPointCollections;
    testPointCollections.map((testPointCollection) => {
        testPointCollection.SampleIds = JSON.stringify(testPointCollection.SampleIds)
        const values = testPointCollection.TestPoints.map(testPoint => testPoint.Value);
        testPointCollection.TestPoints = JSON.stringify(values);
        //console.log(JSON.stringify(values))
    })

    return testPointCollections
}

function generateTables(db) {
    const samples = extractSamplesFromJson()
    const inputConditions = extractInputConditionsFromJson()
    const testPointCollections = extractTestPointCollectionsFromJson()

    // Create the samples table
    db.run(`
    CREATE TABLE samples (
        Id INTEGER PRIMARY KEY,
        FamilyName text,
        ProductName text,
        Name text
    );
  `, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
        samples.forEach((sample) => {
            db.run(`
        INSERT INTO samples (Id, FamilyName, ProductName, Name)
        VALUES (?, ?, ?, ?);
      `, [sample.Id, sample.FamilyName, sample.ProductName, sample.Name], (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
        });
    });

    // Create the inputConditions table
    db.run(`
    CREATE TABLE inputConditions (
        Id INTEGER PRIMARY KEY,
        Parameter text,
        Minimum real,
        Maximum real,
        TimeBetweenPoints real
    );
  `, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
        inputConditions.forEach((inputCondition) => {
            db.run(`
        INSERT INTO inputConditions (Id, Parameter, Minimum, Maximum, TimeBetweenPoints)
        VALUES (?, ?, ?, ?, ?);
      `, [inputCondition.Id, inputCondition.Parameter, inputCondition.Min, inputCondition.Max, inputCondition.TimeBetweenPoints], (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
        });
    });

    // Create the testPointsCollections table
    db.run(`
    CREATE TABLE testPointsCollections (
        Id INTEGER PRIMARY KEY,
        InputConditionId integer, 
        SampleIds text,
        TestPoints text,
        FOREIGN KEY (InputConditionId) REFERENCES inputConditions(Id)
    );
  `, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }

        testPointCollections.forEach((testPointCollection) => {
            db.run(`
        INSERT INTO testPointsCollections (Id, InputConditionId, SampleIds, TestPoints)
        VALUES (?, ?, ?, ?);
      `, [testPointCollection.Id, testPointCollection.InputConditionId, testPointCollection.SampleIds, testPointCollection.TestPoints], (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
        });
    });
};

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        // Create tables
        generateTables(db)
    }
});

module.exports = db
