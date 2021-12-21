const db = require("../models");
const Statistiche_Model = db.model_statistiche;

// Create and Save a new Statistica
exports.create = (req, res) => {
  // Validate request
  if (/*!req.body.titolo*/false) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Statistica
  const statistica = new Statistiche_Model ({
    titolo: null,
    descrizione: null,
    dataInizio: null,
    dataFine: null,
    pastiPiuOrdinati: null,
    pastiMenoOrdinati: null
  });

  // Save statistica in the database
  statistica
    .save(statistica)
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

// Retrieve all Statistiche from the database.
exports.findAll = (req, res) => {
  

  Statistiche_Model.find({})
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