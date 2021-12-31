const db = require("../models");
const Admin_Model = db.model_admin;

// Create and Save a new Admin
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create an Admin
  const admin = new Admin_Model ({
    nome: req.body.nome,
    cognome: req.body.cognome,
    password: null,
   email: req.body.email
  });

  // Save Admin in the database
  admin
    .save(admin)
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

// Retrieve all Admin from the database.
exports.findAll = (req, res) => {
  

  Admin_Model.find({})
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

//ADMIN

const session = require('express-session')
var hash = require('./hash.js')

/**
 * This method updates the external tutor's informations
 * @param {Object} req - The HTTP request
 * @param {Object} res - The HTTP response
 * @returns {Boolean}  - It returns true if the update was successfull, else false
 */

 exports.selectAdmin = (req, res) => {
  var id= req.session.utente.id
    Admin_Model.findById(id)
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

 exports.getProfilo = function (req, res) {
  return new Promise(function (resolve, reject) {
      //Chiedere questione sessione
  var tipo= req.session.utente.tipo
       var result= Admin_Model.selectAdmin()
get.then(function(result){
   resolve ({Nome:result.nome, Cognome: result.cognome, 
    tipo, Indirizzo: result.indirizzo, Email: result.email })
})
  });
};
//Per modifica profilo dovremmo avere direttamente setPassword - inserire .selectAdmin