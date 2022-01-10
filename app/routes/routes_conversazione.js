module.exports = app => {
    const conversazione = require("../controller/controller_conversazione");

    var router = require("express").Router();

    // Crea una nuova conversazione
    router.post("/create", conversazione.create);

    // fa il get di tutte le conversazioni di uno specifico utente
    router.post("/getConversazioni", conversazione.getConversazioni);

    app.use('/api/conversazione', router);

};