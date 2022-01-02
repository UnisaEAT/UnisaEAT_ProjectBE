const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.model_clienti = require("./cliente.js")(mongoose);
db.model_admin = require("./admin.js")(mongoose);
db.model_personale = require("./personale.js")(mongoose);

module.exports = db;