module.exports = app => {
    const login = require("../controller/controller_login");

    var router = require("express").Router()
    router.post("/login", login.login);
    

    app.use('/api/login', router);
}