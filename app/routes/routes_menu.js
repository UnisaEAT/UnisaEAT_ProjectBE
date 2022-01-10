module.exports = app => {
    const menu = require("../controller/controller_menu");

    var router = require("express").Router();


    // Prendi tutti i pasti per fare in modo che l'operatore mensa scelga il menu
    router.get("/sceltaMenu", menu.sceltaMenu);

    //Riceve la tipologia di menu da visualizzare
    router.post("/visualizzaMenu", menu.visualizzamenu);


    app.use('/api/menu', router);
};