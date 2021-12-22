const db = require("../models");
const Tesserino_Model = db.model_tesserino;

// Create and Save a new Tesserino
exports.create = (req, res) => {
  // Validate request
  if (false) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tesserino
  const tesserino = new Tesserino_Model ({
    saldo: 0,
    dataScadenza: new Date()
  });

  // Save Tesserino in the database
  tesserino
    .save(tesserino)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tesserino."
      });
    });
};

// Retrieve all Tesserino from the database.
exports.findAll = (req, res) => {
  

  Tesserino_Model.find({})
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