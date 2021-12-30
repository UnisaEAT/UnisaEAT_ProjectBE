const db = require("../models");
const Cliente_Model = db.model_clienti;

// Create and Save a new Cliente
exports.create = (req, res) => {
  // Validate request
  if (!req.body.clienteID) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Cliente
  const cliente = new Cliente_Model ({
    clienteID: req.body.clienteID,
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
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Cliente_Model.find(condition)
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