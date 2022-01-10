module.exports = app => {
    const personale = require("../controller/controller_personale");

    var router = require("express").Router();

    // Aggiungi un nuovo personale(operatore mensa o personale ADISU)
    router.post("/insert", personale.insert);

    // Prendi tutta la lista di Personali(operatori mensa o personali ADISU)
    router.post("/viewLista", personale.findByRuolo);

    // Rimuovi un Personale(operatore mensa o personale ADISU)
    router.post("/remove", personale.findByEmailAndRemove);

    //Get personale
    //router.post("/getInfo",personale.findByEmail);

    app.use('/api/personale', router);
};