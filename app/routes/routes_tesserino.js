module.exports = app => {
    const tesserino = require("../controller/controller_tesserino");
  
    var router = require("express").Router();
  
    // Create a new Tesserino
    router.post("/create", tesserino.create);
  
    // Retrieve all Tesserino
    router.get("/findAll", tesserino.findAll);

    // Retrieve saldo tesserino
    router.get("/getSaldoTesserino", tesserino.getSaldoTesserino);
  
  
    app.use('/api/tesserino', router);
  };