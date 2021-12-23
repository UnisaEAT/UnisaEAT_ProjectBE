var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
const Cliente_Model = db.model_clienti;

// Create and Save a new Cliente
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Cliente
  const cliente = new Cliente_Model ({
    nome: req.body.nome,
    cognome: req.body.cognome,
    password: null,
    citta: req.body.citta,
    email: req.body.email,
    indirizzo: req.body.indirizzo,
    tesserino: null 
  });

  // Save Cliente in the database
  cliente
    .save(cliente)
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

// Retrieve all Clienti from the database.
exports.findAll = (req, res) => {
  

  Cliente_Model.find({})
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


//CLIENTE

const session = require('express-session')
var hash = require('./hash.js')

/**
 * This method updates the external tutor's informations
 * @param {Object} req - The HTTP request
 * @param {Object} res - The HTTP response
 * @returns {Boolean}  - It returns true if the update was successfull, else false
 */

 exports.selectCliente = (req, res) => {
  var id= req.session.utente.id
    Cliente_Model.findById(id)
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
       var result= Cliente_Model.selectCliente()
get.then(function(result){
   resolve ({Nome:result.nome, Cognome: result.cognome, 
    tipo, Indirizzo: result.indirizzo, Email: result.email })
})
  });
};
//Per modifica profilo dovremmo avere direttamente setPassword - inserire .selectAdmin