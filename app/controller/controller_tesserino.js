var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
const Tesserino_Model = db.model_tesserino;
const Cliente_Model = db.model_clienti;


/*
  Viene eseguita quando l'utente vuole accedere alla pagina di richiesta del tesserino

  Se l'utente non è un cliente viene negato l'accesso.
  Se l'utente ha già un tesserino viene negato l'accesso,
  altrimenti viene restituito al chiamante false (non ha un tesserino)

  Se viene restituito {message:true} il cliente ha un tesserino
  Se viene restituito {message:false} il cliente non ha un tesserino
*/
exports.hasTesserino = (req, res) => {
  //variabili di prova da cancellare
  /*req.session.ruolo = "cliente";
  req.session.email = "n.cappello@studenti.unisa.it";
  */

  if(req.session.ruolo != "cliente")
  {
    res.json({message : "Only customers can access this page!"});
    return;
  }

  Cliente_Model.find({email:req.session.email}, function (err, docs) {
    if (err) throw err;
    if(docs[0].tesserino!=null)
    {
      res.json({message : true});
      return;
    }
    else
    {
      res.json({message : false});
      return;
    }
  });
}; 

/*
  Viene eseguita quando l'utente vuole accedere alla pagina di rinnovo del tesserino

  Se l'utente non è un cliente viene negato l'accesso.
  Se l'utente non ha un tesserino viene negato l'accesso.
  Se il tesserino dell'utente non è scaduto viene negato l'accesso
  altrimenti viene restituito true (il tesserino del cliente è scaduto)

  Se viene restituito {message : true} allora il tesserino è scaduto
  Se viene restituito {message : false} allora il tesserino non è scaduto
*/
exports.isExpired = (req, res) => {
  //variabili di prova da cancellare
  /*req.session.ruolo = "cliente";
  req.session.email = "n.cappello@studenti.unisa.it";
  */

  if(req.session.ruolo != "cliente")
  {
    res.json({message : "Only customers can access this page!"});
    return;
  }

  Cliente_Model.find({email:req.session.email}, function (err, docs) {
    if (err) throw err;
    let tesserinoID = docs[0].tesserino; 
    if(tesserinoID == null)
    {
      res.json({message : "You don't have a Tesserino!"});
      return;
    }
    else
    {
      Tesserino_Model.findById(tesserinoID).then(
        function (data) {

          let dataScadenza = data.dataScadenza;
          let dataAttuale = new Date();

          if(dataAttuale<dataScadenza) {
            res.json({ message: false});
            return;
          }
          res.json({message : true});
          return;

        },
        function (err) {
          res.json({messagge : "Error: " + err});
        }
      )
    }
  });
}; 

// Create and Save a new Tesserino
/*
  In seguito alla compilazione del form per la richiesta del tesserino
  viene creato un nuovo tesserino all'interno del DB.
  Bisogna prima controllare che il cliente loggato non abbia già un tesserino
  Bisogna poi controllare la correttezza dei campi del form.
  Se il form è corretto inserisco il tesserino nel db e aggiorno il campo tesserino del cliente loggato

  Viene restituito {message:true} se il create è andato a buon fine
 */ 
exports.create = (req, res) => {
  // Validate request

  //variabili di prova da cancellare
  req.session.ruolo = "cliente";
  req.session.email = "c.buono@studenti.unisa.it";
  

  if(req.session.ruolo != "cliente")
  {
    res.json({ message: "Only customers can access this page!" });
    return;
  }

  Cliente_Model.find({email:req.session.email}, function (err, docs) {
    if (err) throw err;
    if(docs[0].tesserino!=null)
    {
      res.json({ message: "You already have a Tesserino!" });
      return;
    }
    let nome = req.body.nome;
    let cognome = req.body.cognome;
    let email = req.body.email;
    let confermaEmail = req.body.confermaEmail;
    let dataDiNascita = req.body.dataDiNascita;
    let provinciaDiNascita = req.body.provinciaDiNascita;
    let comuneDiNascita = req.body.comuneDiNascita;
    let cittadinanza = req.body.cittadinanza;
    let indirizzo = req.body.indirizzo;
    let provincia = req.body.provincia;
    let comune = req.body.comune; //campo città nel db
    let cap = req.body.cap;
    let telefono = req.body.telefono;

    if (!nome) {
      res.json({ name:"nome", message: "Nome can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(nome)) || nome.length <= 1) {
      res.json({ name:"nome", message: "Nome has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].nome != nome) {
        res.json({ name:"nome", message: "Nome not found!" });
        return;
      }
    }

    if (!cognome) {
      res.json({ name:"cognome", message: "Cognome can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cognome)) || cognome.length <= 1) {
      res.json({ name:"cognome", message: "Cognome has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].cognome != cognome) {
        res.json({ name:"cognome", message: "Cognome not found!" });
        return;
      }
    }

    if (!email) {
      res.json({ name:"email", message: "Email can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) || email.length <8 ) {
      res.json({ name:"email", message: "Email has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].email != email) {
        res.json({ name:"email", message: "Email not found!" });
        return;
      }
    }

    if (!confermaEmail) {
      res.json({ name:"confermaEmail", message: "Conferma Email can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(confermaEmail)) || confermaEmail.length <8 ) {
      res.json({ name:"confermaEmail", message: "Conferma Email has invalid sintax!" });
      return;
    }
    else {
      if(confermaEmail != email) {
        res.json({ name:"confermaEmail", message: "Email and Conferma Email not equals!" });
        return;
      }
    }

    if (!dataDiNascita) {
      res.json({ name:"dataDiNascita", message: "Data di nascita can not be empty!" });
      return;
    }
    else if (!(/^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)\d\d/.test(dataDiNascita))) {
      res.json({ name:"dataDiNascita", message: "Data di nascita has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].dataDiNascita != dataDiNascita) {
        res.json({ name:"dataDiNascita", message: "Data di nascita not found!" });
        return;
      }
    }

    if (!provinciaDiNascita) {
      res.json({ name:"provinciaDiNascita", message: "Provincia di nascita can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(provinciaDiNascita)) || provinciaDiNascita.length <= 1) {
      res.json({ name:"provinciaDiNascita", message: "Provincia di nascita has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].provinciaDiNascita != provinciaDiNascita) {
        res.json({ name:"provinciaDiNascita", message: "Provincia di nascita not found!" });
        return;
      }
    }

    if (!comuneDiNascita) {
      res.json({ name:"comuneDiNascita", message: "Comune di nascita can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(comuneDiNascita)) || comuneDiNascita.length <= 1) {
      res.json({ name:"comuneDiNascita", message: "Comune di nascita has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].comuneDiNascita != comuneDiNascita) {
        res.json({ name:"comuneDiNascita", message: "Comune di nascita not found!" });
        return;
      }
    }

    if (!cittadinanza) {
      res.json({ name:"cittadinanza", message: "Cittadinanza can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cittadinanza)) || cittadinanza.length <= 1) {
      res.json({ name:"cittadinanza", message: "Cittadinanza has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].cittadinanza != cittadinanza) {
        res.json({ name:"cittadinanza", message: "Cittadinanza not found!" });
        return;
      }
    }

    if (!indirizzo) {
      res.json({ name:"indirizzo", message: "Indirizzo can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n<>!?[\]{}|^~%#:;$%?\0-\cZ]+$/.test(indirizzo)) || indirizzo.length <= 1) {
      res.json({ name:"indirizzo", message: "Indirizzo has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].indirizzo != indirizzo) {
        res.json({ name:"indirizzo", message: "Indirizzo not found!" });
        return;
      }
    }

    if (!provincia) {
      res.json({ name:"provincia", message: "Provincia can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(provincia)) || provincia.length <= 1) {
      res.json({ name:"provincia", message: "Provincia has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].provincia != provincia) {
        res.json({ name:"provincia", message: "Provincia not found!" });
        return;
      }
    }

    if (!comune) {
      res.json({ name:"comune", message: "Comune can not be empty!" });
      return;
    }
    else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(comune)) || comune.length <= 1) {
      res.json({ name:"comune", message: "Comune has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].citta != comune) {
        res.json({ name:"comune", message: "Comune not found!" });
        return;
      }
    }

    if (!cap) {
      res.json({ name:"cap", message: "Cap can not be empty!" });
      return;
    }
    else if (!(/^\d{5}$/.test(cap))) {
      res.json({ name:"cap", message: "Cap has invalid sintax!" });
      return;
    }
    else {
      if(docs[0].cap != cap) {
        res.json({ name:"cap", message: "Cap not found!" });
        return;
      }
    }

    if (telefono.length != 0) {
      if (!(/^[0-9\-\+]{9,15}$/.test(telefono)) || telefono.length <10 || telefono.length >15) {
        res.json({ name:"telefono", message: "Telefono has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].telefono != telefono) {
          res.json({ name:"telefono", message: "Telefono not found!" });
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


    // Save Tesserino in the database
    tesserino
      .save(tesserino)
      .then(data => {
        Cliente_Model.findOneAndUpdate({email:req.session.email}, {tesserino:new ObjectId(data._id)}).then(
          function(value) {
            res.json({message : true});
            return;
          }
        )
      })
      .catch(err => {
        res.json({
          message:
            err.message || "Some error occurred while creating the Tesserino."
        });
      });

  });
};

// Update dataScadenza tesserino
/*
  In seguito al rinnovo del tesserino si aggiorna la data di scadenza, che sarà la data attuale + 1 anno

  Se il cliente loggato non ha un tesserino l'operazione non viene effettuata
  Se il tesserino del cliente loggato non è scaduto (la data di scadenza è minore della data attuale) l'operazione non viene effettuata
  Se il tesserino del cliente loggato è scaduto viene aggiornata la data di scadenza nel db 
 */
  exports.updateDataScadenza = (req, res) => {
    // Validate request
  
    //variabili di prova da cancellare
    /*req.session.ruolo = "cliente";
    req.session.email = "n.cappello@studenti.unisa.it";
    */

    if(req.session.ruolo != "cliente")
    {
      res.json({ message: "Only customers can access this page!" });
      return;
    }
  
    Cliente_Model.find({email:req.session.email}, function (err, docs) {
      if (err) throw err; 
      if(docs[0].tesserino==null)
      {
        res.json({ message: "You don't have a Tesserino!" });
        return;
      }

      let nome = req.body.nome;
      let cognome = req.body.cognome;
      let email = req.body.email;
      let confermaEmail = req.body.confermaEmail;
      let dataDiNascita = req.body.dataDiNascita;
      let provinciaDiNascita = req.body.provinciaDiNascita;
      let comuneDiNascita = req.body.comuneDiNascita;
      let cittadinanza = req.body.cittadinanza;
      let indirizzo = req.body.indirizzo;
      let provincia = req.body.provincia;
      let comune = req.body.comune; //campo città nel db
      let cap = req.body.cap;
      let telefono = req.body.telefono;
  
      if (!nome) {
        res.json({ name:"nome", message: "Nome can not be empty!" });
        return;
      }
      else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(nome)) || nome.length <= 1) {
        res.json({ name:"nome", message: "Nome has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].nome != nome) {
          res.json({ name:"nome", message: "Nome not found!" });
          return;
        }
      }
  
      if (!cognome) {
        res.json({ name:"cognome", message: "Cognome can not be empty!" });
        return;
      }
      else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cognome)) || cognome.length <= 1) {
        res.json({ name:"cognome", message: "Cognome has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].cognome != cognome) {
          res.json({ name:"cognome", message: "Cognome not found!" });
          return;
        }
      }
  
      if (!email) {
        res.json({ name:"email", message: "Email can not be empty!" });
        return;
      }
      else if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) || email.length <8 ) {
        res.json({ name:"email", message: "Email has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].email != email) {
          res.json({ name:"email", message: "Email not found!" });
          return;
        }
      }
  
      if (!confermaEmail) {
        res.json({ name:"confermaEmail", message: "Conferma Email can not be empty!" });
        return;
      }
      else if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(confermaEmail)) || confermaEmail.length <8 ) {
        res.json({ name:"confermaEmail", message: "Conferma Email has invalid sintax!" });
        return;
      }
      else {
        if(confermaEmail != email) {
          res.json({ name:"confermaEmail", message: "Email and Conferma Email not equals!" });
          return;
        }
      }
  
      if (!dataDiNascita) {
        res.json({ name:"dataDiNascita", message: "Data di nascita can not be empty!" });
        return;
      }
      else if (!(/^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)\d\d/.test(dataDiNascita))) {
        res.json({ name:"dataDiNascita", message: "Data di nascita has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].dataDiNascita != dataDiNascita) {
          res.json({ name:"dataDiNascita", message: "Data di nascita not found!" });
          return;
        }
      }
      
      if (!provinciaDiNascita) {
        res.json({ name:"provinciaDiNascita", message: "Provincia di nascita can not be empty!" });
        return;
      }
      else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(provinciaDiNascita)) || provinciaDiNascita.length <= 1) {
        res.json({ name:"provinciaDiNascita", message: "Provincia di nascita has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].provinciaDiNascita != provinciaDiNascita) {
          res.json({ name:"provinciaDiNascita", message: "Provincia di nascita not found!" });
          return;
        }
      }

      if (!comuneDiNascita) {
        res.json({ name:"comuneDiNascita", message: "Comune di nascita can not be empty!" });
        return;
      }
      else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(comuneDiNascita)) || comuneDiNascita.length <= 1) {
        res.json({ name:"comuneDiNascita", message: "Comune di nascita has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].comuneDiNascita != comuneDiNascita) {
          res.json({ name:"comuneDiNascita", message: "Comune di nascita not found!" });
          return;
        }
      }
  
      if (!cittadinanza) {
        res.json({ name:"cittadinanza", message: "Cittadinanza can not be empty!" });
        return;
      }
      else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cittadinanza)) || cittadinanza.length <= 1) {
        res.json({ name:"cittadinanza", message: "Cittadinanza has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].cittadinanza != cittadinanza) {
          res.json({ name:"cittadinanza", message: "Cittadinanza not found!" });
          return;
        }
      }
  
      if (!indirizzo) {
        res.json({ name:"indirizzo", message: "Indirizzo can not be empty!" });
        return;
      }
      else if (!(/^[a-zA-Z][^\n<>!?[\]{}|^~%#:;$%?\0-\cZ]+$/.test(indirizzo)) || indirizzo.length <= 1) {
        res.json({ name:"indirizzo", message: "Indirizzo has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].indirizzo != indirizzo) {
          res.json({ name:"indirizzo", message: "Indirizzo not found!" });
          return;
        }
      }
  
      if (!provincia) {
        res.json({ name:"provincia", message: "Provincia can not be empty!" });
        return;
      }
      else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(provincia)) || provincia.length <= 1) {
        res.json({ name:"provincia", message: "Provincia has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].provincia != provincia) {
          res.json({ name:"provincia", message: "Provincia not found!" });
          return;
        }
      }
  
      if (!comune) {
        res.json({ name:"comune", message: "Comune can not be empty!" });
        return;
      }
      else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(comune)) || comune.length <= 1) {
        res.json({ name:"comune", message: "Comune has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].citta != comune) {
          res.json({ name:"comune", message: "Comune not found!" });
          return;
        }
      }
  
      if (!cap) {
        res.json({ name:"cap", message: "Cap can not be empty!" });
        return;
      }
      else if (!(/^\d{5}$/.test(cap))) {
        res.json({ name:"cap", message: "Cap has invalid sintax!" });
        return;
      }
      else {
        if(docs[0].cap != cap) {
          res.json({ name:"cap", message: "Cap not found!" });
          return;
        }
      }
  
      if (telefono.length != 0) {
        if (!(/^[0-9\-\+]{9,15}$/.test(telefono)) || telefono.length <10 || telefono.length >15) {
          res.json({ name:"telefono", message: "Telefono has invalid sintax!" });
          return;
        }
        else {
          if(docs[0].telefono != telefono) {
            res.json({ name:"telefono", message: "Telefono not found!" });
            return;
          }
        }  
      }
  
       //calcolo data di scadenza
      //uguale alla data attuale + 1 anno
      let date = new Date();
      date.setDate(date.getDate() + 365); 
      let tesserinoID = docs[0].tesserino;

      Tesserino_Model.findByIdAndUpdate(tesserinoID, {dataScadenza:date}, function (err, docs){
        if (err) throw err;
        res.json(true);
        return;
      })
  
    });
  };

// Get info tesserino
/*
  se il cliente non è loggato l'operazione viene vietata
  altrimenti viene controllato se il cliente possiede un tesserino.
  Se lo possiede viene inviato al front end l'intero tesserino

  Nel caso di messaggi di errore, l'oggetto inviato sarà {message:"messaggio"}
  Quindi se response.hasOwnProperty("message") is true allora non è l'oggetto tesserino
*/
  exports.getInfoTesserino = (req, res) => {
    //variabili di prova da cancellare
    /*req.session.ruolo = "cliente";
    req.session.email = "n.cappello@studenti.unisa.it";
    */

    if(req.session.ruolo != "cliente")
    {
      res.json({ message: "Only customers can access this page!" });
      return;
    }
  
    Cliente_Model.find({email:req.session.email}, function (err, docs) {
      if (err) throw err;
      let tesserinoID = docs[0].tesserino; //sarà una stringa, non un ObjectID
      if(tesserinoID==null)
      {
        res.json({ message: "You don't have a Tesserino!" });
        return;
      }

      Tesserino_Model.findById(tesserinoID).then(
        function (data) {
          let foundTesserino = {
            ...data._doc
          }
          foundTesserino.dataScadenza = data.dataScadenza.toISOString().substring(0, 10)
          res.json(foundTesserino);
          return;
        },
        function (err) {
          res.json(err);
        }
      )
    });
  };
  
// Ricarica tesserino
/*
  se il cliente non è loggato l'operazione viene vietata
  se il cliente non possiede un tesserino l'operazione viene vietata
  se il cliente possiede un tesserino ma è scaduto l'operazione viene vietata
  altrimenti avviene la validazione del form di ricarica.
  Se il form è corretto viene aggiornato il saldo nel database

  Se l'operazione va a buon fine viene restituito {message:true}
  altrimenti {message:"Stringa di errore"}
*/
exports.ricaricaTesserino = (req, res) => {
  //variabili di prova da cancellare
  /*req.session.ruolo = "cliente";
  req.session.email = "n.cappello@studenti.unisa.it";
  */

  if(req.session.ruolo != "cliente")
  {
    res.json({ message: "Only customers can access this page!" });
    return;
  }

  Cliente_Model.find({email:req.session.email}, function (err, docs) {
    if (err) throw err;
    let tesserinoID = docs[0].tesserino; //sarà una stringa, non un ObjectID
    if(tesserinoID==null)
    {
      res.json({ message: "You don't have a Tesserino!" });
      return;
    }

    Tesserino_Model.findById(tesserinoID).then(
      function (data) {
        let dataScadenza = data.dataScadenza;
        let dataAttuale = new Date();
        let saldo = parseFloat(data.saldo);

        if(dataAttuale>dataScadenza) {
          res.json({ message: "Your tesserino is expired!"});
          return;
        }

        //validate request if tesserino is not expired
        let intestatario = req.body.intestatario;
        let tipoCarta = req.body.tipoCarta;
        let numeroCarta = req.body.numeroCarta;
        let dataScadenzaCarta = req.body.dataScadenzaCarta;
        let cvv = req.body.cvv;
        let importo = req.body.importo;

        if(!intestatario) {
          res.json({ name:"intestatario", message : "Intestatario can not be empty"});
          return;
        }

        if(!tipoCarta) {
          res.json({name:"tipoCarta", message : "Tipo carta can not be empty"});
          return;
        }

        if(!numeroCarta) {
          res.json({ name:"numeroCarta", message : "Numero carta can not be empty"});
          return;
        }

        if(!dataScadenzaCarta) {
          res.json({name:"dataScadenzaCarta", message : "Data scadenza carta can not be empty"});
          return;
        }

        if(!cvv) {
          res.json({name:"cvv", message : "Cvv can not be empty"});
          return;
        }

        if(!importo) {
          res.json({name:"importo", message : "Importo can not be empty"});
          return;
        }

        if (intestatario.length != 0) {
          if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(intestatario)) || intestatario.length <= 1) {
            res.json({name:"intestatario", message: "Intestatario has invalid syntax!"});
            return;
          }
        }
        
        if(tipoCarta == "Mastercard") {
          if (numeroCarta.length != 0) {
            if (!(/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$/.test(numeroCarta)) || numeroCarta.length <= 12 || numeroCarta.length > 16) {
              res.json({name:"numeroCarta", message: "Numero carta has invalid syntax!"});
              return;
            }
          }
        }
        else if(tipoCarta == "Visa") {
          if (numeroCarta.length != 0) {
            if (!(/^4[0-9]{6,}$/.test(numeroCarta)) || numeroCarta.length <= 12 || numeroCarta.length > 16) {
              res.json({name:"numeroCarta", message: "Numero carta has invalid syntax!"});
              return;
            }
          }
        }
        else {
          //è AmericanExpress
          if (numeroCarta.length != 0) {
            if (!(/^3[47][0-9]{5,}$/.test(numeroCarta)) || numeroCarta.length <= 12 || numeroCarta.length > 16) {
              res.json({name:"numeroCarta", message: "Numero carta has invalid syntax!"});
              return;
            }
          }
        }
    
        if (dataScadenzaCarta.length != 0) {
          if (!(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(dataScadenzaCarta)) || (dataScadenzaCarta.length != 5 && dataScadenzaCarta.length != 7) ) {
            res.json({ name:"dataScadenzaCarta", message: "Data scadenza carta has invalid syntax!"});
            return;
            //mm/gg sintassi
          }
        }
        
        if (cvv.length != 0) {
          if (!(/^[0-9]{3,4}$/.test(cvv)) || (cvv.length != 3 && cvv.length != 4) ) {
            res.json({name:"cvv", message: "Cvv has invalid syntax!"});
            return;
          }
        }
    
        if (importo.length != 0) {
          if (!(/(^\d{1,3})(\,\d{1,2})?$/.test(importo)) || importo.length > 6) {
            res.json({ name:"importo", message: "Importo has invalid syntax!"});
            return;
          }
        }

        //aggiorno saldo
        importo = parseFloat(importo);
        Tesserino_Model.findByIdAndUpdate(tesserinoID, { saldo: saldo+importo }, function (err, docs) {
          if (err) throw err;
          res.json({ message: true});
          return;
          
        });
        
      },
      function (err) {
        res.json(err);
      }
    )
  });

};