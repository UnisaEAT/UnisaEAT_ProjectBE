const db = require("../models");
const Pasto_Model = db.model_pasto;

// Create and Save a new Pasto
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Pasto
  const pasto = new Pasto_Model ({
    nome: req.body.nome,
    descrizione: req.body.descrizione,
    disponibilita: req.body.disponibilita,
    immagine: null,
    categoria: req.body.categoria,
    ingredienti: req.body.ingredienti,
    numeroOrdinazioni: 0
  });

  // Save Pasto in the database
  pasto
    .save(pasto)
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
  

  Pasto_Model.find({})
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