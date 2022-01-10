const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;


db.model_pasto = require("./pasto.js")(mongoose);
db.model_menu = require("./menu.js")(mongoose);


module.exports = db;