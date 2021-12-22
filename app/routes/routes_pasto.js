module.exports = app => {
    const pasto = require("../controller/controller_pasto");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", pasto.create);
  
    // Retrieve all Tutorials
    router.get("/findAll", pasto.findAll);
  
  
    app.use('/api/pasto', router);
  };