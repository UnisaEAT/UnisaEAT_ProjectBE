module.exports = app => {
    const admin = require("../controller/controller_admin");

    var router = require("express").Router();

    // Create a new admin
    router.post("/create", admin.create);

    // Retrieve all admin
    router.get("/findAll", admin.findAll);


    app.use('/api/admin', router);


};