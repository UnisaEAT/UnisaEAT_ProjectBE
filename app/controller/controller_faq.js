const db = require("../models");
const Faq_Model = db.model_faq;

// Create and Save a new Faq
exports.create = (req, res) => {
  // Validate request
  if (!req.body.domanda) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Faq
  const faq = new Faq_Model ({
    domanda: req.body.domanda,
    risposta: req.body.risposta
  });

  // Save Faq in the database
  faq
    .save(faq)
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

// Retrieve all Faq from the database.
exports.findAll = (req, res) => {
  

  Faq_Model.find({})
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