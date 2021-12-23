var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
const Personale_Model = db.model_personale;

// Create and Save a new Personale
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Personale
  const personale = new Personale_Model ({
    nome: req.body.nome,
    cognome: req.body.cognome,
    password: null,
    email: req.body.email,
    numeroTelefono: req.body.numeroTelefono,
    dataDiNascita: req.body.dataDiNascita,
    ruolo: null,
    disponibilita: false,
    indirizzo: req.body.indirizzo
  });

  // Save Personale in the database
  personale
    .save(personale)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Personale from the database.
exports.findAll = (req, res) => {
  

  Personale_Model.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clienti."
      });
    });
};

//  PERSONALE
exports.selectPersonale = (req, res) => {
  /*req.session.utente.id = new ObjectId("61c4518cee6b7b3e89608755")
  var id= req.session.utente.id*/

    Personale_Model.find({nome:"Gianni"}) //ID
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clienti."
      });
    });
};

const session = require('express-session')
var hash = require('./hash.js')

/**
 * This method updates the external tutor's informations
 * @param {Object} req - The HTTP request
 * @param {Object} res - The HTTP response
 * @returns {Boolean}  - It returns true if the update was successfull, else false
 */



exports.getProfilo = function (req, res) {
    return new Promise(function (resolve, reject) {
        //Chiedere questione sessione
    var tipo= req.session.utente.tipo
         var result= Personale_Model.selectPersonale()
get.then(function(result){
     resolve ({Nome:result.nome, Cognome: result.cognome, 
      tipo, Indirizzo: result.indirizzo, Email: result.email })
 })
    });
};
//Per modifica profilo dovremmo avere direttamente setPassword - inserire .selectAdmin
exports.updatePassword = function (req, res) {
  return new Promise(function (resolve, reject) {
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

    if (hash.checkPassword(req.session.utente.utente.Password.hash, req.session.utente.utente.Password.salt, oldPassword)) {
      var passwordHashed = hash.hashPassword(password)
//Vedere come fare setPassword
      var checkS = Personale_Model.updatePassword ({}, {password: passwordHashed});

     
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