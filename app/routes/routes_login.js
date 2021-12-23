module.exports = app => {
    const Login = require("../controller/controller_login");

    var router = require("express").Router()
    router.get("/login", Login.login);

}