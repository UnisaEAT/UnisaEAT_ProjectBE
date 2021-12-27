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
        res.json(data);
      })
      .catch(err => {
        res.json({
          message:
            err.message || "Some error occurred while retrieving profile."
        });
      });
    }
    if (tipo == "Cliente"){
        Cliente_Model.find({email:mail}) //ID
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.json({
            message:
              err.message || "Some error occurred while retrieving profile."
          });
        });
      }
      if (tipo == "Admin"){
        Admin_Model.find({email:mail}) //ID
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.json({
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
         req.session.tipo = "Personale"
        var mail = "giannipepp@gmail.com"
      var oldPassword = req.body.inputOldPassword
      var password = req.body.inputPassword
      var passwordConfirm = req.body.inputConfirmPassword
      if ((oldPassword == null) || (oldPassword.length <= 7) || (!/^[A-Za-z0-9]+$/.test(oldPassword))) {
       
        res.json({
          message: "Errore Password vecchia."
      });return;
    }

    if ((password == null) || (password.length <= 7) || (!/^[A-Za-z0-9]+$/.test(password))) {
        res.json({
          message:"Errore Password."
      });return;
    }

    if (passwordConfirm != password) {   
        res.json({
          message: "Errore Password di conferma."
      });return;
 }
  var passwordHashed = hash.hashPassword(password) 

  
   if (req.session.tipo == "Personale"){
        Personale_Model.findOneAndUpdate ({email: mail}, {password: passwordHashed}).then(
          function(val) {
            res.json({
              message:
             "Modifica password avvenuta con successo."
            });
            return;
          }
        );       
      }
     if (req.session.tipo == "Cliente"){
      Cliente_Model.findOneAndUpdate ({email: mail}, {password: passwordHashed}).then(
        function(val) {
          res.json({
            message:
           "Modifica password avvenuta con successo."
          });
          return;
        }

      );
          }
            if (req.session.tipo == "Admin"){
             Admin_Model.findOneAndUpdate ({email: mail}, {password: passwordHashed}).then(
                function(val) {
                  res.json({
                    message:
                   "Modifica password avvenuta con successo."
                  });
                  return;
                }
      
              );
              }

  };