//Database test
let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.sqlite3')

module.exports = db