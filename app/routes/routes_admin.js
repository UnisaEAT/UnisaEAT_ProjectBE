module.exports = app => {
    const admin = require("../controller/controller_admin");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/create", admin.create);

    // Retrieve all Tutorials
    router.get("/findAll", admin.findAll);


    app.use('/api/admin', router);


};