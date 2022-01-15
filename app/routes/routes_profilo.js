module.exports = app => {
    const profilo = require("../controller/controller_profilo");

    var router = require("express").Router();

    //Trova tramite l'email il profilo
    router.post("/findByEmail", profilo.findByEmail);

    //Aggiorna la password del Cliente
    router.post("/updatePassword", profilo.updatePassword);


    app.use('/api/profilo', router);

}