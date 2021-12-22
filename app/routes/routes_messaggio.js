module.exports = app => {
    const messaggio = require("../controller/controller_messaggio");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", messaggio.create);
  
    // Retrieve all Tutorials
    router.get("/findAll", messaggio.findAll);
  
  
    app.use('/api/messaggio', router);
  };