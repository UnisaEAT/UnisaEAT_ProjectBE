module.exports = app => {
    const statistica = require("../controller/controller_statistiche");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", statistica.create);
  
    // Retrieve all Tutorials
    router.get("/findAll", statistica.findAll);
  
  
    app.use('/api/statistica', router);
  };