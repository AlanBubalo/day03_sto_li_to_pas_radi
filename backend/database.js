var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')

        // Create table Samples
        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table created, initial insert
                    // TODO: Insert from json files from github
                    var insert = 'INSERT INTO user (name, email) VALUES (?,?)'
                    db.run(insert, ["admin", "admin@example.com"])
                    db.run(insert, ["user", "user@example.com"])
                }
            });
    }
});


module.exports = db