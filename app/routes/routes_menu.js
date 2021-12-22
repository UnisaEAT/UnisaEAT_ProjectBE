module.exports = app => {
    const menu = require("../controller/controller_menu");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", menu.create);
  
    // Retrieve all Tutorials
    router.get("/findAll", menu.findAll);
  
  
    app.use('/api/menu', router);
  };