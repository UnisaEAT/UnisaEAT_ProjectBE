module.exports = app => {
    const notifica = require("../controller/controller_notifica");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", notifica.create);
  
    // Retrieve all Tutorials
    router.get("/findAll", notifica.findAll);
  
  
    app.use('/api/notifica', router);
  };