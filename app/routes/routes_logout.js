module.exports = app => {
    const Logout = require("../controller/controller_logout");

    var router = require("express").Router()
    router.get("/logout", Logout.logout);

}