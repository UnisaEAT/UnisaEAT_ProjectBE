const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.model_clienti = require("./cliente.js")(mongoose);
db.model_tesserino = require("./tesserino.js")(mongoose);


module.exports = db;