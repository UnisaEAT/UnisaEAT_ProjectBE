var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
//Personale
var Personale_Model = db.model_personale;
//Cliente
var Cliente_Model=db.model_clienti;
//Admin
var Admin_Model=db.model_admin;


exports.findByEmail = (req, res) => {
    var tipo = "Personale"
    var mail = "giannipepp@gmail.com"
    /*req.session.utente.id = new ObjectId("61c4518cee6b7b3e89608755")
    var id= req.session.utente.id ORA SI E' DECISO PER EMAIL
    EX - getPROFILO
    Vedere se bisogna consegnare con Propt e non più send
    */
//TIPO - Nota: req.session.tipo=personale andrà modificato una volta implementata la sessione nei Login
  
//if Personale, Cliente, Admin
if (tipo == "Personale"){
//Email andrà modificato una volta implementata la sessione nei Login
      Personale_Model.findOne({email:mail}) //ID
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving profile."
        });
      });
    }
    if (tipo == "Cliente"){
        Cliente_Model.find({email:mail}) //ID
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving profile."
          });
        });
      }
      if (tipo == "Admin"){
        Admin_Model.find({email:mail}) //ID
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving profile."
          });
        });
      }
  };

  const session = require('express-session')
  var hash = require('./hash.js')
  
  /**
   * This method updates the external tutor's informations
   * @param {Object} req - The HTTP request
   * @param {Object} res - The HTTP response
   * @returns {Boolean}  - It returns true if the update was successfull, else false
   */
  
  
 
  //Inserire IF
  exports.updatePassword = function (req, res) {
    return new Promise(function (resolve, reject) {
        var tipo = "Personale"
        var mail = "giannipepp@gmail.com"
      var oldPassword = req.body.inputOldPassword
      var password = req.body.inputPassword
      var passwordConfirm = req.body.inputConfirmPassword
 
      // Form Validation
      var isRight = true
  
      if ((oldPassword == null) || (oldPassword.length <= 7) || (!/^[A-Za-z0-9]+$/.test(oldPassword))) {
        res.cookie('errOldPassword', '1')
        isRight = false
      }
  
      if ((password == null) || (password.length <= 7) || (!/^[A-Za-z0-9]+$/.test(password))) {
        res.cookie('errPassword', '1')
  
        isRight = false
      }
  
      if (passwordConfirm != password) {
        res.cookie('errPasswordConfirm', '1')
  
        isRight = false
      }
  
      if (!isRight) {
        resolve(false)
        return
      }
 //Riga da rivedere
      if (hash.checkPassword(req.session.utente.utente.Password.hash, req.session.utente.utente.Password.salt, oldPassword)) {
        var passwordHashed = hash.hashPassword(password) 
  //Vedere come fare setPassword
  if (req.session.tipo == "Personale"){
        var checkS = Personale_Model.findOneAndUpdate ({Email: mail}, {password: passwordHashed});}
        if (req.session.tipo == "Cliente"){
            var checkS = Cliente_Model.findOneAndUpdate ({Email: mail}, {password: passwordHashed});}
            if (req.session.tipo == "Admin"){
                var checkS = Admin_Model.findOneAndUpdate ({Email: mail}, {password: passwordHashed});}

         checkS.then(function (result) {
           if (result != null) {
             req.session.utente.utente = result
             res.cookie('updatePassEff', '1')
             resolve(true)
           } else { resolve() }
         })
       } else {
         res.cookie('errPassword', '1')
         resolve(false)
       }
     })
   }
