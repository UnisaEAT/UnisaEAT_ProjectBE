module.exports = app => {
    const notifica = require("../controller/controller_notifiche");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/save", notifica.salvaNotifica);
  
    router.post("/visualizzaLista", notifica.visualizzaLista);

    router.post("/rimuoviNotifica", notifica.rimuoviNotifica);
  
  
    app.use('/api/notifiche', router);
  };