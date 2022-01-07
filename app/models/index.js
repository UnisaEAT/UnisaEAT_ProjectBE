const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;


db.model_cliente = require("./cliente.js")(mongoose);
db.model_admin = require("./admin.js")(mongoose);
db.model_personale = require("./personale.js")(mongoose);
db.model_messaggio = require("./messaggio.js")(mongoose);
db.model_notifica = require("./notifica.js")(mongoose);
db.model_tesserino = require("./tesserino.js")(mongoose);
db.model_pasto = require("./pasto.js")(mongoose);
db.model_ordine = require("./ordine.js")(mongoose);
db.model_menu = require("./menu.js")(mongoose);

module.exports = db;