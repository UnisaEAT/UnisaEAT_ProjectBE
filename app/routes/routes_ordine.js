module.exports = app => {
    const ordine = require("../controller/controller_ordine");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/create", ordine.create);
  
    router.post("/ordinaPasti", ordine.visualizzaPasti);

    router.post("/hasOrdini", ordine.hasOrdini);

    router.post("/getOrdini", ordine.getOrdiniByCliente);
  
  
    app.use('/api/ordine', router);
  };