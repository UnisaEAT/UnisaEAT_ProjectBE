module.exports = app => {
    const personale = require("../controller/controller_personale");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", personale.create);
  
    // Retrieve all Tutorials
    router.get("/findAll", personale.findAll);
  
  
    app.use('/api/personale', router);
  };