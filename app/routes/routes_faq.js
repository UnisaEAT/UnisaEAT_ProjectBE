module.exports = app => {
    const faq = require("../controller/controller_faq");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", faq.create);
  
    // Retrieve all Tutorials
    router.get("/findAll", faq.findAll);
  
  
    app.use('/api/faq', router);
  };