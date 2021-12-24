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
  
   exports.updatePassword = function (req, res) {
        var tipo = "Personale"
        var mail = "giannipepp@gmail.com"
      var oldPassword = req.body.inputOldPassword
      var password = req.body.inputPassword
      var passwordConfirm = req.body.inputConfirmPassword
 //->Sostituire is right con classici errori message - definire err.message? se non va solo messaggio
    if ((oldPassword == null) || (oldPassword.length <= 7) || (!/^[A-Za-z0-9]+$/.test(oldPassword))) {
       
          res.status(500).send({
            message: "Errore Password vecchia."
        });
      }
  
      if ((password == null) || (password.length <= 7) || (!/^[A-Za-z0-9]+$/.test(password))) {
          res.status(500).send({
            message:"Errore Password."
        });
      }
  
      if (passwordConfirm != password) {   
          res.status(500).send({
            message: "Errore Password di conferma."
        });
   }
   var passwordHashed = hash.hashPassword(password) 

  if (req.session.tipo == "Personale"){
        var checkS = Personale_Model.findOneAndUpdate ({Email: mail}, {password: passwordHashed});}
        if (req.session.tipo == "Cliente"){
            var checkS = Cliente_Model.findOneAndUpdate ({Email: mail}, {password: passwordHashed});}
            if (req.session.tipo == "Admin"){
                var checkS = Admin_Model.findOneAndUpdate ({Email: mail}, {password: passwordHashed});}

         checkS.then(function (result) {
           if (result != null) {

          res.status(500).send({
            message:
           "Tutto ok."
          });
           } else { res.status(500).send({
            message:
           "Errore alla fine."
           });
         }
   });
  };