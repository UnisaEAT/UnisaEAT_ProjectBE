module.exports = app => {
    const tesserino = require("../controller/controller_tesserino");
  
    var router = require("express").Router();
  
    // Create a new Tesserino
    router.post("/create", tesserino.create);
  
    // Retrieve saldo tesserino
    router.get("/getInfoTesserino", tesserino.getInfoTesserino);

    // check if the customers has a Tesserino
    router.get("/hasTesserino", tesserino.hasTesserino);

    // check if the Tesserino is expired
    router.get("/isExpired", tesserino.isExpired);

    // update saldo del tesserino
    router.post("/ricaricaTesserino", tesserino.ricaricaTesserino);
  
    app.use('/api/tesserino', router);
  };