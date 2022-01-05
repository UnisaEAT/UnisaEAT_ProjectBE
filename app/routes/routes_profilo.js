module.exports = app => {
    const profilo = require("../controller/controller_profilo");
  
    var router = require("express").Router();

    router.get("/findByEmail", profilo.findByEmail);
    router.post("/updatePassword", profilo.updatePassword);
app.use('/api/profilo',router);

}