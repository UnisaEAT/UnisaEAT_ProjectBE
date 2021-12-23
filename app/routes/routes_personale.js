module.exports = app => {
    const personale = require("../controller/controller_personale");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", personale.create);
  
    // Retrieve all Tutorials
    router.get("/findAll", personale.findAll);
  //AGGIUNGERE PER IL TEST
  router.get("/getProfilo", personale.getProfilo);
  router.get("/selectPersonale", personale.selectPersonale);
  router.post("/updatePassword", personale.updatePassword);



    app.use('/api/personale', router);
  };