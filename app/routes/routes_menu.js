module.exports = app => {
    const menu = require("../controller/controller_menu");

    var router = require("express").Router();



    // Retrieve all pasto for choose the menu
    router.get("/sceltaMenu", menu.sceltaMenu);


    router.post("/visualizzaMenu", menu.visualizzamenu);


    app.use('/api/menu', router);
};