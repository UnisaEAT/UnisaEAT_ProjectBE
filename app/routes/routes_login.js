module.exports = app => {
    const Login = require("../controller/controller_login");

    var router = require("express").Router()
    router.post("/login", Login.login);
    app.use('/api/login', router);
}