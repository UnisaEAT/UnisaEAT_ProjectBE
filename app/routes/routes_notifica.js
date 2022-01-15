module.exports = app => {
    const notifica = require("../controller/controller_notifica");
  
    var router = require("express").Router();
  
    //router.post("/salvaNotifica", notifica.salvaNotifica);
  
    router.post("/visualizzaLista", notifica.visualizzaLista);

    router.post("/rimuoviNotifica", notifica.rimuoviNotifica);
  
  
    app.use('/api/notifiche', router);
  };