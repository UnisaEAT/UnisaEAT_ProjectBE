module.exports = app => {
    const conversazione = require("../controller/controller_conversazione");

    var router = require("express").Router();

    // Crea una nuova conversazione
    router.post("/create", conversazione.create);

    app.use('/api/conversazione', router);

};