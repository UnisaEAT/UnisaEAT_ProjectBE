module.exports = app => {
    const clienti = require("../controller/controller_clienti");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/create", clienti.create);

    // Retrieve all Tutorials
    router.get("/findAll", clienti.findAll);


    app.use('/api/cliente', router);

};