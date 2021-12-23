var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
const Tesserino_Model = db.model_tesserino;
const Cliente_Model = db.model_clienti;

// Create and Save a new Tesserino
/*
  In seguito alla compilazione del form per la richiesta del tesserino
  viene creato un nuovo tesserino all'interno del DB.
  Bisogna prima controllare che il cliente loggato non abbia già un tesserino
  Bisogna poi controllare la correttezza dei campi del form.
  Se il form è corretto inserisco il tesserino nel db e aggiorno il campo tesserino del cliente loggato
 */
exports.create = (req, res) => {
  // Validate request

  //variabili di prova da cancellare
  req.session.tipo = "cliente";
  req.session.email = "n.cappello@studenti.unisa.it";

  if(req.session.tipo != "cliente")
  {
    res.status(400).send({ message: "Only customers can access this page!" });
    return;
  }

  Cliente_Model.find({email:req.session.email}, function (err, docs) {
    if (err) throw err;
    if(docs[0].tesserino!=null)
    {
      res.status(400).send({ message: "You already have a Tesserino!" });
      return;
    }
    let nome = req.body.nome;
    let cognome = req.body.cognome;
    let email = req.body.email;
    let confermaEmail = req.body.confermaEmail;
    let dataDiNascita = req.body.dataDiNascita;
    let comuneDiNascita = req.body.comuneDiNascita;
    let cittadinanza = req.body.cittadinanza;
    let indirizzo = req.body.indirizzo;
    let provincia = req.body.provincia;
    let comune = req.body.comune; //campo città nel db
    let cap = req.body.cap;
    let telefono = req.body.telefono;

    if (!nome) {
      res.status(400).send({ message: "Nome can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(nome)) || nome.length <= 1) {
      res.status(400).send({ message: "Nome has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].nome != nome) {
        res.status(400).send({ message: "Nome not found!" });
        return;
      }
    }

    if (!cognome) {
      res.status(400).send({ message: "Cognome can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cognome)) || cognome.length <= 1) {
      res.status(400).send({ message: "Cognome has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].cognome != cognome) {
        res.status(400).send({ message: "Cognome not found!" });
        return;
      }
    }

    if (!email) {
      res.status(400).send({ message: "Email can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) || email.length <8 ) {
      res.status(400).send({ message: "Email has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].email != email) {
        res.status(400).send({ message: "Email not found!" });
        return;
      }
    }

    if (!confermaEmail) {
      res.status(400).send({ message: "Conferma Email can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(confermaEmail)) || confermaEmail.length <8 ) {
      res.status(400).send({ message: "Conferma Email has invalid sintax!" });
      return;
    }
    else {
      if(confermaEmail != email) {
        res.status(400).send({ message: "Email and Conferma Email not equals!" });
        return;
      }
    }

    if (!dataDiNascita) {
      res.status(400).send({ message: "Data di nascita can not be empty!" });
      return;
    }
    else if (!(/^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)\d\d/.test(dataDiNascita))) {
      res.status(400).send({ message: "Data di nascita has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].dataDiNascita != dataDiNascita) {
        res.status(400).send({ message: "Data di nascita not found!" });
        return;
      }
    }

    if (!comuneDiNascita) {
      res.status(400).send({ message: "Comune di nascita can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(comuneDiNascita)) || comuneDiNascita.length <= 1) {
      res.status(400).send({ message: "Comune di nascita has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].comuneDiNascita != comuneDiNascita) {
        res.status(400).send({ message: "Comune di nascita not found!" });
        return;
      }
    }

    if (!cittadinanza) {
      res.status(400).send({ message: "Cittadinanza can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cittadinanza)) || cittadinanza.length <= 1) {
      res.status(400).send({ message: "Cittadinanza has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].cittadinanza != cittadinanza) {
        res.status(400).send({ message: "Cittadinanza not found!" });
        return;
      }
    }

    if (!indirizzo) {
      res.status(400).send({ message: "Indirizzo can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n<>!?[\]{}|^~%#:;$%?\0-\cZ]+$/.test(indirizzo)) || indirizzo.length <= 1) {
      res.status(400).send({ message: "Indirizzo has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].indirizzo != indirizzo) {
        res.status(400).send({ message: "Indirizzo not found!" });
        return;
      }
    }

    if (!provincia) {
      res.status(400).send({ message: "Provincia can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(provincia)) || provincia.length <= 1) {
      res.status(400).send({ message: "Provincia has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].provincia != provincia) {
        res.status(400).send({ message: "Provincia not found!" });
        return;
      }
    }

    if (!comune) {
      res.status(400).send({ message: "Comune can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(comune)) || comune.length <= 1) {
      res.status(400).send({ message: "Comune has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].citta != comune) {
        res.status(400).send({ message: "Comune not found!" });
        return;
      }
    }

    if (!cap) {
      res.status(400).send({ message: "Cap can not be empty!" });
      return;
    }
    else if (!(/^\d{5}$/.test(cap))) {
      res.status(400).send({ message: "Cap has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].cap != cap) {
        res.status(400).send({ message: "Cap not found!" });
        return;
      }
    }

    if (telefono.length != 0) {
      if (!(/^[0-9\-\+]{9,15}$/.test(telefono)) || telefono.length <10 || telefono.length >15) {
        res.status(400).send({ message: "Telefono has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].telefono != telefono) {
          res.status(400).send({ message: "Telefono not found!" });
          return;
        }
      }  
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

    //fare il save con callback

    // Save Tesserino in the database
    tesserino
      .save(tesserino)
      .then(data => {
        Cliente_Model.findOneAndUpdate({email:req.session.email}, {tesserino:new ObjectId(data._id)}).then(
          function(value) {res.send(data);}
        )
        //res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tesserino."
        });
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