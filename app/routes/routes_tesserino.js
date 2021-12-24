module.exports = app => {
    const tesserino = require("../controller/controller_tesserino");
  
    var router = require("express").Router();
  
    // Create a new Tesserino
    router.post("/create", tesserino.create);
  
    // Retrieve all Tesserino
    router.get("/findAll", tesserino.findAll);

    // Retrieve saldo tesserino
    router.get("/getSaldoTesserino", tesserino.getSaldoTesserino);

    // check if the customers has a Tesserino
    router.get("/hasTesserino", tesserino.hasTesserino);

    // check if the Tesserino is expired
    router.get("/isExpired", tesserino.isExpired);
  
    app.use('/api/tesserino', router);
  };