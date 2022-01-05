module.exports = app => {
    const personale = require("../controller/controller_personale");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/insert", personale.insert);

    // Retrieve all Tutorials
    router.get("/viewLista", personale.findByRuolo);

    // Remove a new Personale
    router.post("/remove",personale.findByEmailAndRemove);

    //Get personale
    //router.post("/getInfo",personale.findByEmail);

    app.use('/api/personale', router);
};