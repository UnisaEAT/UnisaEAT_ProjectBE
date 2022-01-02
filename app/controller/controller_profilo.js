var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
//Personale
var Personale_Model = db.model_personale;
//Cliente
var Cliente_Model=db.model_clienti;
//Admin
var Admin_Model=db.model_admin;
//Verificare sessione
 
 
exports.findByEmail = (req, res) => {
    var tipo = "Admin";
    var mail = "m.judo@studenti.unisa.it";
    /*req.session.utente.id = new ObjectId("61c4518cee6b7b3e89608755")
    var id= req.session.utente.id ORA SI E' DECISO PER EMAIL
    EX - getPROFILO
    Vedere se bisogna consegnare con Propt e non più send
    */
 
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
 
      var mail = "g.citro@studenti.unisa.it"
      req.session.tipo="Admin"
      var oldPassword = req.body.inputOldPassword
      var password = req.body.inputPassword
      var passwordConfirm = req.body.inputConfirmPassword
      if ( (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(oldPassword)) || (oldPassword.length <= 8) || (oldPassword==null))
      ) {
 
        res.json({
          message: "Errore Password vecchia."
      });return;
    }
 
    if ((password == null) || (password.length <= 8) || (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(password)))
    ) {
        res.json({
          message:"Errore Password."
      });return;
    }
 
    if (passwordConfirm != password) {   
        res.json({
          message: "Errore Password di conferma."
      });return;
 }
 
//Non corrisponde a quello sul DB CHECKPASSWORD - vedere come fare find per i tipi
 
//var vecio = hash.hashPassword(oldPassword) 
if (req.session.tipo == "Cliente"){
Cliente_Model.find({email:mail}, function (err,docs)
{
if (err) throw err;
let hashato=docs[0].password;
 
  if (checkPassword(hashato.hash, hashato.salt, oldPassword)==false) {
    res.json({
      message: "Password non corrisponde nel DB."
  });return;
  }
  })
}
if (req.session.tipo == "Admin"){
  Admin_Model.find({email:mail}, function (err,docs)
  {
  if (err) throw err;
  let hashato=docs[0].password;
 
    if(checkPassword(hashato.hash, hashato.salt, oldPassword)==false) {
      res.json({
        message: "Password non corrisponde nel DB."
    });return;
    }
    })
  }
  if (req.session.tipo == "Personale"){
    Personale_Model.find({email:mail}, function (err,docs)
    {
    if (err) throw err;
    let hashato=docs[0].password;
 
      if (checkPassword(hashato.hash, hashato.salt, oldPassword)==false) {
        res.json({
          message: "Password non corrisponde nel DB."
      });return;
      }
      })
    }
 
 
 var passwordHashed = hash.hashPassword(password) 
 
  console.log(req.session.tipo)
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
     else if (req.session.tipo == "Cliente"){
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
            else if (req.session.tipo == "Admin"){
             Admin_Model.findOneAndUpdate ({email: mail}, {password: passwordHashed}).then(
 
                  res.json({
                    message:
                   "Modifica password avvenuta con successo."
                  })
 
              );return;
              }
 
  };