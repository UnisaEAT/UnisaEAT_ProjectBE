module.exports = app => {
    const clienti = require("../controller/controller_clienti");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", clienti.create);
  
    // Retrieve all Tutorials
    router.get("/", clienti.findAll);
  
  
    app.use('/api/cliente', router);
  };