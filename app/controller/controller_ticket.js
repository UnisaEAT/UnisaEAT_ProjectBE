var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
const Ticket_Model = db.model_ticket;

// Create and Save a new Messaggio
exports.create = (req, res) => {
  // Validate request
  if (!req.body.titolo) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Ticket
  const ticket = new Ticket_Model ({
    titolo: req.body.titolo,
    problema: req.body.problema,
    soluzione: "",
    data: new Date(),
    senderID: new ObjectId()
  });

  // Save Ticket in the database
  ticket
    .save(ticket)
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

// Retrieve all Ticket from the database.
exports.findAll = (req, res) => {
  

  Ticket_Model.find({})
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