const assert = require("assert");
const client = require("mongodb").MongoClient;
const config = require("../config");
let _db;

function initDb(callback) {
  if (_db) {
    console.warn("Trying to init DB again!");
    return callback(null, _db);
  }
  client.connect(
    config.db.connectionString,
    config.db.connectionOptions,
    connected
  );
  function connected(err, db) {
    if (err) {
      return callback(err);
    }
    console.log(
      "DB initialized - connected to: " +
        config.db.connectionString.split("@")[1]
    );
    _db = db;
    return callback(null, _db);
  }
}

function getDb() {
  assert.ok(_db, "Db has not been initialized. Please called init first.");
  return _db;
}

module.exports = {
  getDb,
  initDb,
};
