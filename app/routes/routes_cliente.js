module.exports = app => {
    const clienti = require("../controller/controller_clienti");

    var router = require("express").Router();

    // Crea un nuovo cliente
    router.post("/create", clienti.create);

    // Prendi tutti i clienti
    router.get("/findAll", clienti.findAll);


    app.use('/api/cliente', router);

};