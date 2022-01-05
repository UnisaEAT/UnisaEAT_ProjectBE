//Route routes_faq.js
module.exports = app => {
    const faq = require("../controller/controller_faq");
  
    var router = require("express").Router();
  
   
  
router.post("/insertFAQ", faq.insertFAQ);
router.post("/deleteFAQ", faq.deleteFAQ);
router.post("/selectFAQ", faq.selectFAQ);
router.post("/updateFAQ", faq.updateFAQ);

  
    app.use('/api/faq', router);
  };