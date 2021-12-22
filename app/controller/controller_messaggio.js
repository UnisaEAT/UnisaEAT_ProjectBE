var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
const Messaggio_Model = db.model_messaggio;

// Create and Save a new Messaggio
exports.create = (req, res) => {
  // Validate request
  if (!req.body.testo) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Messaggio
  const messaggio = new Messaggio_Model ({
    senderID: null,
    receiverID: null,
    testo: req.body.testo,
    data: null
  });

  // Save Messaggio in the database
  messaggio
    .save(messaggio)
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
  

  Messaggio_Model.find({})
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