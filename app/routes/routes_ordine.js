module.exports = app => {
    const ordine = require("../controller/controller_ordine");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", ordine.create);
  
    // Retrieve all Tutorials
    router.get("/findAll", ordine.findAll);
  
  
    app.use('/api/ordine', router);
  };