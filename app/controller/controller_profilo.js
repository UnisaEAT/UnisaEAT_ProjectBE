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
         req.session.tipo = "Personale"
        var mail = "giannipepp@gmail.com"
      var oldPassword = req.body.inputOldPassword
      var password = req.body.inputPassword
      var passwordConfirm = req.body.inputConfirmPassword
 
    if ((oldPassword == null) || (oldPassword.length <= 7) || (!/^[A-Za-z0-9]+$/.test(oldPassword))) {
       
          res.status(500).send({
            message: "Errore Password vecchia."
        });return;
      }
  
      if ((password == null) || (password.length <= 7) || (!/^[A-Za-z0-9]+$/.test(password))) {
          res.status(500).send({
            message:"Errore Password."
        });return;
      }
  
      if (passwordConfirm != password) {   
          res.status(500).send({
            message: "Errore Password di conferma."
        });return;
   }
   //Hash.checkPassword(hash,salt,OldPassword)->Prendo salt e hash dal DB senza copiarlo manualmente ogni volta?
   //var hashprova="37dd9a125e587c4c7850e25b3312c4d0fcda27d0fd38290b43eb8425a16b6f0a02d670a9c55a87e6c4450cf07443c4f0e1241e8cd5415e64dbff362f50ad54b09e3d359b719a2813ef313eb7f36f0b6910ea7e7e214c5fbf27a00070106635cc960744ccb64b2c3fb9a23b27402dce389620260cc869a8776e5255b13df89e1eccc38009c9f3ea0f0eb4b4f37976d5060324de12022c635b5b25456e4d631c03f407a78d5e8d9e5bd5fb7da78e3eff585627e7fc759aa97c4291804b8aacc792c6b3913440e7383af5677171b626843a8f5efec8c9844fe1d352d9a88509537c92012022ff53bc448e1a55f84492a4ea40f770615b2e6e181f5ab1ec5aced2e94249acd5d5cc87fd70ad4b6f938a958e19c4cfb02e1eab22faea8cc17e310e6a58b9cd0154273ea4e623e033b52bed982f36a4082a1002725fd7427e0fdefac7f15152df30415cf4773e2a44a761df48d438d2ee26e550dff0b154e16ab49e519c012d53c8c34fd870ba134187c620ec0ce839f66904fd20a6cca7f4f0cd05a01c7bd13b3dc3165032d5ca7fb2ae0830740fd8ded3bb8c3efa1cef6eecb47ed0d5afefc23d14bc0cb936cf07477e9585409f98af789f137d2aaecc245f564c9a08a0414adeceecfafa62eeb06269279bb330890572e57f79b9198dbd4c5b5f73cd8af05c92f844c8a7acec3a03c0f5cb22144eeee57d628d6316498525b350e5"
  // var saltprova="DmZ9uDHu+ExKHhxYIp0DHmjFd1HpXlAEeZEjTXBCkkEDI5m+IFaQ8H9BT8suHCdGOx8rvGSS/9/5bYVgMn+WkW+fGgUaPi6k9rI1maVcIqbNxABrZ1Nk4XVQ5CIzB30zuFL4JrEDTGlCdQGXx9QxZkhU9hpgliNKfBp8cpviM4q2Pf3F/mrHCSOmEY/h7szssYRTzxUhXyHI/KDAprk9ygl/BcPm4SpJIGZpFo3WbXv5xO/lnmteTzA3N9mWt6EDfXIUwy2f+R6vcVnMjjOBz/HEpRPQGOgy5SQuUWJjchxXGJCpmM5cAhYg7hepQyQUNhZ6ofyR0P1Tk2+Wg4UC2w=="
   var passwordHashed = hash.hashPassword(password) 
   
   //passwordHashed lo usiamo anche per vedere se Hash è quello? Salt?
  if (req.session.tipo == "Personale"){
        Personale_Model.findOneAndUpdate ({email: mail}, {password: passwordHashed}).then(
          function(val) {
            res.status(500).send({
              message:
             "Tutto ok."
            });
            return;
          }
        );       
      }
     if (req.session.tipo == "Cliente"){
      Cliente_Model.findOneAndUpdate ({email: mail}, {password: passwordHashed}).then(
        function(val) {
          res.status(500).send({
            message:
           "Tutto ok."
          });
          return;
        }

      );
          }
            if (req.session.tipo == "Admin"){
             Admin_Model.findOneAndUpdate ({email: mail}, {password: passwordHashed}).then(
                function(val) {
                  res.status(500).send({
                    message:
                   "Tutto ok."
                  });
                  return;
                }
      
              );
              }

  };