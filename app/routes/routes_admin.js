module.exports = app => {
    const admin = require("../controller/controller_admin");

    var router = require("express").Router();

    // Crea un nuovo Admin
    router.post("/create", admin.create);

    app.use('/api/admin', router);


};