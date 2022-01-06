module.exports = app => {
    const logout = require("../controller/controller_logout");

    var router = require("express").Router()

    //Get di logout
    router.get("/logout", logout.logout);

    app.use('/api/logout', router);
}