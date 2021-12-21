module.exports = app => {
    const ticket = require("../controller/controller_ticket");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", ticket.create);
  
    // Retrieve all Tutorials
    router.get("/findAll", ticket.findAll);
  
  
    app.use('/api/ticket', router);
  };