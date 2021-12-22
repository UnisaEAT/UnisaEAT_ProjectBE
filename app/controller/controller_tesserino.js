const db = require("../models");
const Tesserino_Model = db.model_tesserino;
const Cliente_Model = db.model_clienti;

// Create and Save a new Tesserino
/*
  In seguito alla compilazione del form per la richiesta del tesserino
  viene creato un nuovo tesserino all'interno del DB.
  Bisogna prima controllare la correttezza dei campi del form
 */
exports.create = (req, res) => {
  // Validate request

  if(req.session.tipo != "cliente")
  {
    res.status(400).send({ message: "Only customers can access this page!" });
    return;
  }

  /*
    //prendo dal db i dati del cliente loggato
    Cliente_Model.find({email:req.session.email}).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clienti."
      });
    });
  */

  


  
  let nome = req.body.nome;
  let cognome = req.body.cognome;
  let email = req.body.email;
  let confermaEmail = req.body.confermaEmail;
  let dataDiNascita = req.body.dataDiNascita;
  let comuneDiNascita = req.body.comuneDiNascita;
  let cittadinanza = req.body.cittadinanza;
  let indirizzo = req.body.indirizzo;
  let provincia = req.body.provincia;
  let comune = req.body.comune;
  let cap = req.body.cap;
  let telefono = req.body.telefono;

  if (!nome) {
    res.status(400).send({ message: "Nome can not be empty!" });
    return;
  }

  if (!cognome) {
    res.status(400).send({ message: "Cognome can not be empty!" });
    return;
  }

  if (!email) {
    res.status(400).send({ message: "Email can not be empty!" });
    return;
  }

  if (!confermaEmail) {
    res.status(400).send({ message: "Conferma Email can not be empty!" });
    return;
  }

  if (!dataDiNascita) {
    res.status(400).send({ message: "Data di nascita can not be empty!" });
    return;
  }

  if (!comuneDiNascita) {
    res.status(400).send({ message: "Comune di nascita can not be empty!" });
    return;
  }

  if (!cittadinanza) {
    res.status(400).send({ message: "Cittadinanza can not be empty!" });
    return;
  }

  if (!indirizzo) {
    res.status(400).send({ message: "Indirizzo can not be empty!" });
    return;
  }

  if (!provincia) {
    res.status(400).send({ message: "Provincia can not be empty!" });
    return;
  }

  if (!comune) {
    res.status(400).send({ message: "Comune can not be empty!" });
    return;
  }

  if (!cap) {
    res.status(400).send({ message: "Cap can not be empty!" });
    return;
  }
  

  //calcolo data di scadenza
  //uguale alla data attuale + 1 anno
  let date = new Date();
  date.setDate(date.getDate() + 365); 

  // Create a Tesserino
  const tesserino = new Tesserino_Model ({
    saldo: 0,
    dataScadenza: date
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