module.exports = app => {
    const menu = require("../controller/controller_menu");
  
    var router = require("express").Router();
  
  
  
    // Retrieve all pasto for choose the menu
    router.get("/SceltaMenu", menu.scelatamenu);
    router.post("/VisualizzaMenu", menu.visualizzamenu);
    router.post("/InserisciMenu", menu.inseriscimenu);
    router.post("/ModificaMenu", menu.modificamenu);
    app.use('/api/menu', router);
  };
