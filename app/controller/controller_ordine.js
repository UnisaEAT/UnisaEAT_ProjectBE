var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
const Ordine_Model = db.model_ordine;

// Create and Save a new Ordine
exports.create = (req, res) => {
  // Validate request
  if (false/*!req.body.acquirenteID*/) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Ordine
  const ordine = new Ordine_Model ({
    prezzo: 0,
    dataOrdine: new Date(),
    boolPranzo: true,
    stato: "Ordinato",
    listaPasti: null,
    qr: null,
    acquirenteID: new ObjectId()
  });

  // Save Ordine in the database
  ordine
    .save(ordine)
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
  

  Ordine_Model.find({})
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