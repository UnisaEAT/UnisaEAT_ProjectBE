module.exports = app => {
    const tesserino = require("../controller/controller_tesserino");
  
    var router = require("express").Router();
  
    // Create a new Tesserino
    router.post("/create", tesserino.create);
  
    // Retrieve saldo tesserino
    router.post("/getInfoTesserino", tesserino.getInfoTesserino);

    // check if the customers has a Tesserino
    router.post("/hasTesserino", tesserino.hasTesserino);

    // check if the Tesserino is expired
    router.post("/isExpired", tesserino.isExpired);

    // update saldo del tesserino
    router.post("/ricaricaTesserino", tesserino.ricaricaTesserino);

    // update data del tesserino
    router.post("/rinnovoTesserino", tesserino.updateDataScadenza);
  
    app.use('/api/tesserino', router);
  };