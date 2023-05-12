const data = require('./demo.json');

const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

function extractSamplesFromJson() {
    const samples = data.project.samples;
    return samples
}

function extractInputConditionsFromJson() {
    const inputConditions = data.project.inputConditions;
    return inputConditions
}

function extractTestPointCollectionsFromJson() {
    const testPointCollections = data.testPointCollections;
    testPointCollections.map((testPointCollection) => {
        testPointCollection.sampleIds = JSON.stringify(testPointCollection.sampleIds)
        testPointCollection.TestPoints = JSON.stringify(testPointCollection.TestPoints)
    })
    return testPointCollections
}

function generateTables() {
    const samples = extractSamplesFromJson()
    const inputConditions = extractInputConditionsFromJson()
    const testPointCollections = extractTestPointCollectionsFromJson()

    // Create the samples table
    db.run(`
    CREATE TABLE IF NOT EXISTS samples (
        Id INTEGER PRIMARY KEY,
        FamilyName text,
        ProductName text,
        Name text
    );
  `, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ error: 'Failed to create the samples table.' });
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
    CREATE TABLE IF NOT EXISTS inputConditions (
        Id INTEGER PRIMARY KEY,
        Parameter text,
        Minimum real,
        Maximum real,
        TimeBetweenPoints real
    );
  `, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ error: 'Failed to create the inputConditions table.' });
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
    CREATE TABLE IF NOT EXISTS testPointsCollections (
        Id INTEGER PRIMARY KEY,
        InputConditionId integer, 
        SampleIds text,
        TestPoints text,
        FOREIGN KEY (InputConditionId) REFERENCES inputConditions(Id)
    );
  `, (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send({ error: 'Failed to create the testPointsCollections table.' });
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

    res.send({ message: 'Tables generated successfully.' });
};