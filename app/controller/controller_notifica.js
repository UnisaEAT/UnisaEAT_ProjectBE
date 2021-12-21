var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
const Notifica_Model = db.model_notifica;

// Create and Save a new Notifica
exports.create = (req, res) => {
  // Validate request
  if (!req.body.testo) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Notifica
  const notifica = new Notifica_Model ({
    receiverID: null,
    testo: req.body.testo,
    tipo: "",
    titolo: req.body.titolo,
    visualizzazione: false
  });

  // Save Notifica in the database
  notifica
    .save(notifica)
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

// Retrieve all Notifica from the database.
exports.findAll = (req, res) => {
  

  Notifica_Model.find({})
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