module.exports = app => {
    const ticket = require("../controller/controller_ticket");
  
    var router = require("express").Router();
  
   
  
router.post("/insert", ticket.insert);
router.post("/select", ticket.select);
router.post("/update", ticket.update);

  
    app.use('/api/ticket', router);
  };