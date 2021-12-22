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