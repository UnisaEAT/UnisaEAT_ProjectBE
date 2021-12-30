const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(/*corsOptions*/));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//session code
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
app.use(cookieParser());
app.use(express.static(__dirname));
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to UnisaEAT." });
});

require("./app/routes/routes_cliente")(app);
require("./app/routes/routes_admin")(app);
require("./app/routes/routes_personale")(app);
require("./app/routes/routes_messaggio")(app);
require("./app/routes/routes_notifica")(app);
require("./app/routes/routes_tesserino")(app);
require("./app/routes/routes_ordine")(app);
require("./app/routes/routes_menu")(app);
require("./app/routes/routes_pasto")(app);
require("./app/routes/routes_faq")(app);
require("./app/routes/routes_ticket")(app);
require("./app/routes/routes_statistiche")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});