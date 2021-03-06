const ObjectId = require('mongodb').ObjectID
const db = require('../models')
const Tesserino_Model = db.model_tesserino
const Cliente_Model = db.model_cliente
const Notifica_Model = db.model_notifica

/*
  Viene eseguita quando l'utente vuole accedere alla pagina di richiesta del tesserino

  Se l'utente non è un cliente viene negato l'accesso.
  Se l'utente ha già un tesserino viene negato l'accesso,
  altrimenti viene restituito al chiamante false (non ha un tesserino)

  Se viene restituito {message:true} il cliente ha un tesserino
  Se viene restituito {message:false} il cliente non ha un tesserino
*/
/**
 * Controlla se l'utente ha già un tesserino
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} - Restituisce un{message:true} se il cliente ha un tesserino altrimenti restituisce {message:false}
 */
exports.hasTesserino = (req, res) => {
  const ruolo = req.body.ruolo
  const email = req.body.email

  if (ruolo != 'cliente') {
    res.json({ message: 'Only customers can access this page!' })
    return
  }

  Cliente_Model.find({ email: email }, function (err, docs) {
    if (err) throw err
    if (docs[0].tesserino != null) {
      res.json({ message: true })
    } else {
      res.json({ message: false })
    }
  })
}

/*
  Viene eseguita quando l'utente vuole accedere alla pagina di rinnovo del tesserino

  Se l'utente non è un cliente viene negato l'accesso.
  Se l'utente non ha un tesserino viene negato l'accesso.
  Se il tesserino dell'utente non è scaduto viene negato l'accesso
  altrimenti viene restituito true (il tesserino del cliente è scaduto)

  Se viene restituito {message : true} allora il tesserino è scaduto
  Se viene restituito {message : false} allora il tesserino non è scaduto
*/
/**
 * Questo metodo controlla se il tesserino dell'utente è scaduto
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} - Viene restituito {message : true} allora il tesserino è scaduto e viene restituito {message : false} quando il tesserino non è scaduto
*/
exports.isExpired = (req, res) => {
  const ruolo = req.body.ruolo
  const email = req.body.email

  if (ruolo != 'cliente') {
    res.json({ message: 'Only customers can access this page!' })
    return
  }

  Cliente_Model.find({ email: email }, function (err, docs) {
    if (err) throw err
    const tesserinoID = docs[0].tesserino
    if (tesserinoID == null) {
      res.json({ message: "You don't have a Tesserino!" })
    } else {
      Tesserino_Model.findById(tesserinoID).then(
        function (data) {
          const dataScadenza = data.dataScadenza
          const dataAttuale = new Date()

          if (dataAttuale < dataScadenza) {
            res.json({ message: false })
            return
          }
          res.json({ message: true })
        },
        function (err) {
          res.json({ messagge: 'Error: ' + err })
        }
      )
    }
  })
}

// Create and Save a new Tesserino
/*
  In seguito alla compilazione del form per la richiesta del tesserino
  viene creato un nuovo tesserino all'interno del DB.
  Bisogna prima controllare che il cliente loggato non abbia già un tesserino
  Bisogna poi controllare la correttezza dei campi del form.
  Se il form è corretto inserisco il tesserino nel db e aggiorno il campo tesserino del cliente loggato

  Viene restituito {message:true} se il create è andato a buon fine
 */
/**
 * Questo metodo crea e salva un tesserino
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} - Viene restituito {message:true} se il create è andato a buon fine
*/
  
exports.create = (req, res) => {
  const ruolo = req.body.ruoloSessione
  const email = req.body.emailSessione

  if (ruolo == '') {
    res.json({ message: 'Devi effettuare il login per poter accedere a questa pagina!' })
    return
  }

  if (ruolo != 'cliente') {
    res.json({ message: 'Solo i clienti possono accedere a questa pagina!' })
    return
  }

  Cliente_Model.find({ email: email }, function (err, docs) {
    if (err) throw err
    if (docs[0].tesserino != null) {
      res.json({ message: 'You already have a Tesserino!' })
      return
    }
    const nome = req.body.nome
    const cognome = req.body.cognome
    const email = req.body.email
    const confermaEmail = req.body.confermaEmail
    const dataDiNascita = req.body.dataDiNascita
    const provinciaDiNascita = req.body.provinciaDiNascita
    const comuneDiNascita = req.body.comuneDiNascita
    const cittadinanza = req.body.cittadinanza
    const indirizzo = req.body.indirizzo
    const provincia = req.body.provincia
    const comune = req.body.comune // campo città nel db
    const cap = req.body.cap
    const telefono = req.body.telefono

    if (!cognome) {
      res.json({ name: 'cognome', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cognome)) || cognome.length <= 1) {
      res.json({ name: 'cognome', message: 'Formato cognome non corretto!' })
      return
    } else {
      if (docs[0].cognome != cognome) {
        res.json({ name: 'cognome', message: 'Cognome not found!' })
        return
      }
    }

    if (!nome) {
      res.json({ name: 'nome', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(nome)) || nome.length <= 1) {
      res.json({ name: 'nome', message: 'Formato nome non corretto!' })
      return
    } else {
      if (docs[0].nome != nome) {
        res.json({ name: 'nome', message: 'Nome not found!' })
        return
      }
    }

    if (!dataDiNascita) {
      res.json({ name: 'dataDiNascita', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)\d\d/.test(dataDiNascita))) {
      res.json({ name: 'dataDiNascita', message: 'Formato data non corretto!' })
      return
    } else {
      if (docs[0].dataDiNascita != dataDiNascita) {
        res.json({ name: 'dataDiNascita', message: 'Data di nascita not found!' })
        return
      }
    }

    if (!provinciaDiNascita) {
      res.json({ name: 'provinciaDiNascita', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(provinciaDiNascita)) || provinciaDiNascita.length <= 1) {
      res.json({ name: 'provinciaDiNascita', message: 'Formato provincia di nascita non corretto!' })
      return
    } else {
      if (docs[0].provinciaDiNascita != provinciaDiNascita) {
        res.json({ name: 'provinciaDiNascita', message: 'Provincia di nascita not found!' })
        return
      }
    }

    if (!comuneDiNascita) {
      res.json({ name: 'comuneDiNascita', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(comuneDiNascita)) || comuneDiNascita.length <= 1) {
      res.json({ name: 'comuneDiNascita', message: 'Formato comune di nascita non corretto!' })
      return
    } else {
      if (docs[0].comuneDiNascita != comuneDiNascita) {
        res.json({ name: 'comuneDiNascita', message: 'Comune di nascita not found!' })
        return
      }
    }

    if (!cittadinanza) {
      res.json({ name: 'cittadinanza', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cittadinanza)) || cittadinanza.length <= 1) {
      res.json({ name: 'cittadinanza', message: 'Formato cittadinanza non corretto!' })
      return
    } else {
      if (docs[0].cittadinanza != cittadinanza) {
        res.json({ name: 'cittadinanza', message: 'Cittadinanza not found!' })
        return
      }
    }

    if (!indirizzo) {
      res.json({ name: 'indirizzo', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n<>!?[\]{}|^~%#:;$%?\0-\cZ]+$/.test(indirizzo)) || indirizzo.length <= 1) {
      res.json({ name: 'indirizzo', message: 'Formato indirizzo non corretto!' })
      return
    } else {
      if (docs[0].indirizzo != indirizzo) {
        res.json({ name: 'indirizzo', message: 'Indirizzo not found!' })
        return
      }
    }

    if (!provincia) {
      res.json({ name: 'provincia', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(provincia)) || provincia.length <= 1) {
      res.json({ name: 'provincia', message: 'Formato provincia non corretto!' })
      return
    } else {
      if (docs[0].provincia != provincia) {
        res.json({ name: 'provincia', message: 'Provincia not found!' })
        return
      }
    }

    if (!comune) {
      res.json({ name: 'comune', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(comune)) || comune.length <= 1) {
      res.json({ name: 'comune', message: 'Formato comune non corretto!' })
      return
    } else {
      if (docs[0].citta != comune) {
        res.json({ name: 'comune', message: 'Comune not found!' })
        return
      }
    }

    if (!cap) {
      res.json({ name: 'cap', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^\d{5}$/.test(cap))) {
      res.json({ name: 'cap', message: 'Formato cap non corretto!' })
      return
    } else {
      if (docs[0].cap != cap) {
        res.json({ name: 'cap', message: 'Cap not found!' })
        return
      }
    }

    if (telefono.length != 0) {
      if (telefono.length < 10 || telefono.length > 15) {
        res.json({ name: 'telefono', message: 'Lunghezza numero di cellulare non corretta!' })
        return
      } else if (!(/^[0-9\-\+]{9,15}$/.test(telefono))) {
        res.json({ name: 'telefono', message: 'Formato cellulare non corretto!' })
        return
      }
    } else {
      if (docs[0].telefono != telefono) {
        res.json({ name: 'telefono', message: 'Telefono not found!' })
        return
      }
    }

    if (!email) {
      res.json({ name: 'email', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) || email.length < 8) {
      res.json({ name: 'email', message: 'Formato email non corretto!' })
      return
    } else {
      if (docs[0].email != email) {
        res.json({ name: 'email', message: 'Email not found!' })
        return
      }
    }

    if (!confermaEmail) {
      res.json({ name: 'confermaEmail', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(confermaEmail)) || confermaEmail.length < 8) {
      res.json({ name: 'confermaEmail', message: 'Formato conferma email non corretto!' })
      return
    } else {
      if (confermaEmail != email) {
        res.json({ name: 'confermaEmail', message: 'Conferma email non corrisponde all’email inserita!' })
        return
      }
    }

    // calcolo data di scadenza
    // uguale alla data attuale + 1 anno
    const date = new Date()
    date.setDate(date.getDate() + 365)

    // Create a Tesserino
    const tesserino = new Tesserino_Model({
      saldo: 0,
      dataScadenza: date
    })

    // Salva un tesserino nel database
    tesserino
      .save(tesserino)
      .then(data => {
        Cliente_Model.findOneAndUpdate({ email: email }, { tesserino: new ObjectId(data._id) }).then(
          function (value) {
            const notifica = new Notifica_Model({
              titolo: 'Richiesta tesserino avvenuta!',
              testo: 'La richiesta del tesserino da parte di ' + email + ' è avvenuta con successo!',
              receiverEmail: email,
              tipo: 'Notifica Tesserino',
              visualizzazione: true
            })
            // salva la notifica nel database
            notifica
              .save(notifica)
              .then(data => {
                res.json({ message: true })
              })
          }
        )
      })
      .catch(err => {
        res.json({
          message:
                        err.message || 'Some error occurred while creating the Tesserino.'
        })
      })
  })
}

// Aggiorna dataScadenza tesserino
/*
  In seguito al rinnovo del tesserino si aggiorna la data di scadenza, che sarà la data attuale + 1 anno

  Se il cliente loggato non ha un tesserino l'operazione non viene effettuata
  Se il tesserino del cliente loggato non è scaduto (la data di scadenza è minore della data attuale) l'operazione non viene effettuata
  Se il tesserino del cliente loggato è scaduto viene aggiornata la data di scadenza nel db

  Restituisce false se il tesserino non è scaduto, true se è stato rinnovato
 */
/**
 * Questo metodo aggiorna la data di scadenza del tesserino 
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} -  Restituisce false se il tesserino non è scaduto, true se è stato rinnovato
*/
exports.updateDataScadenza = (req, res) => {
  const ruolo = req.body.ruoloSessione
  const email = req.body.emailSessione

  if (ruolo == '') {
    res.json({ message: 'Devi effettuare il login per poter accedere a questa pagina!' })
    return
  }

  if (ruolo != 'cliente') {
    res.json({ message: 'Solo i clienti possono accedere a questa pagina!' })
    return
  }

  Cliente_Model.find({ email: email }, function (err, docs) {
    if (err) throw err
    if (docs[0].tesserino == null) {
      res.json({ message: "You don't have a Tesserino!" })
      return
    }

    const nome = req.body.nome
    const cognome = req.body.cognome
    const email = req.body.email
    const confermaEmail = req.body.confermaEmail
    const dataDiNascita = req.body.dataDiNascita
    const provinciaDiNascita = req.body.provinciaDiNascita
    const comuneDiNascita = req.body.comuneDiNascita
    const cittadinanza = req.body.cittadinanza
    const indirizzo = req.body.indirizzo
    const provincia = req.body.provincia
    const comune = req.body.comune // campo città nel db
    const cap = req.body.cap
    const telefono = req.body.telefono

    if (!cognome) {
      res.json({ name: 'cognome', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cognome)) || cognome.length <= 1) {
      res.json({ name: 'cognome', message: 'Formato cognome non corretto!' })
      return
    } else {
      if (docs[0].cognome != cognome) {
        res.json({ name: 'cognome', message: 'Cognome not found!' })
        return
      }
    }

    if (!nome) {
      res.json({ name: 'nome', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(nome)) || nome.length <= 1) {
      res.json({ name: 'nome', message: 'Formato nome non corretto!' })
      return
    } else {
      if (docs[0].nome != nome) {
        res.json({ name: 'nome', message: 'Nome not found!' })
        return
      }
    }

    if (!dataDiNascita) {
      res.json({ name: 'dataDiNascita', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[012])[\/](19|20)\d\d/.test(dataDiNascita))) {
      res.json({ name: 'dataDiNascita', message: 'Formato data non corretto!' })
      return
    } else {
      if (docs[0].dataDiNascita != dataDiNascita) {
        res.json({ name: 'dataDiNascita', message: 'Data di nascita not found!' })
        return
      }
    }

    if (!provinciaDiNascita) {
      res.json({ name: 'provinciaDiNascita', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(provinciaDiNascita)) || provinciaDiNascita.length <= 1) {
      res.json({ name: 'provinciaDiNascita', message: 'Formato provincia di nascita non corretto!' })
      return
    } else {
      if (docs[0].provinciaDiNascita != provinciaDiNascita) {
        res.json({ name: 'provinciaDiNascita', message: 'Provincia di nascita not found!' })
        return
      }
    }

    if (!comuneDiNascita) {
      res.json({ name: 'comuneDiNascita', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(comuneDiNascita)) || comuneDiNascita.length <= 1) {
      res.json({ name: 'comuneDiNascita', message: 'Formato comune di nascita non corretto!' })
      return
    } else {
      if (docs[0].comuneDiNascita != comuneDiNascita) {
        res.json({ name: 'comuneDiNascita', message: 'Comune di nascita not found!' })
        return
      }
    }

    if (!cittadinanza) {
      res.json({ name: 'cittadinanza', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cittadinanza)) || cittadinanza.length <= 1) {
      res.json({ name: 'cittadinanza', message: 'Formato cittadinanza non corretto!' })
      return
    } else {
      if (docs[0].cittadinanza != cittadinanza) {
        res.json({ name: 'cittadinanza', message: 'Cittadinanza not found!' })
        return
      }
    }

    if (!indirizzo) {
      res.json({ name: 'indirizzo', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n<>!?[\]{}|^~%#:;$%?\0-\cZ]+$/.test(indirizzo)) || indirizzo.length <= 1) {
      res.json({ name: 'indirizzo', message: 'Formato indirizzo non corretto!' })
      return
    } else {
      if (docs[0].indirizzo != indirizzo) {
        res.json({ name: 'indirizzo', message: 'Indirizzo not found!' })
        return
      }
    }

    if (!provincia) {
      res.json({ name: 'provincia', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(provincia)) || provincia.length <= 1) {
      res.json({ name: 'provincia', message: 'Formato provincia non corretto!' })
      return
    } else {
      if (docs[0].provincia != provincia) {
        res.json({ name: 'provincia', message: 'Provincia not found!' })
        return
      }
    }

    if (!comune) {
      res.json({ name: 'comune', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(comune)) || comune.length <= 1) {
      res.json({ name: 'comune', message: 'Formato comune non corretto!' })
      return
    } else {
      if (docs[0].citta != comune) {
        res.json({ name: 'comune', message: 'Comune not found!' })
        return
      }
    }

    if (!cap) {
      res.json({ name: 'cap', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^\d{5}$/.test(cap))) {
      res.json({ name: 'cap', message: 'Formato cap non corretto!' })
      return
    } else {
      if (docs[0].cap != cap) {
        res.json({ name: 'cap', message: 'Cap not found!' })
        return
      }
    }

    if (telefono.length != 0) {
      if (telefono.length < 10 || telefono.length > 15) {
        res.json({ name: 'telefono', message: 'Lunghezza numero di cellulare non corretta!' })
        return
      } else if (!(/^[0-9\-\+]{9,15}$/.test(telefono))) {
        res.json({ name: 'telefono', message: 'Formato cellulare non corretto!' })
        return
      }
    } else {
      if (docs[0].telefono != telefono) {
        res.json({ name: 'telefono', message: 'Telefono not found!' })
        return
      }
    }

    if (!email) {
      res.json({ name: 'email', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) || email.length < 8) {
      res.json({ name: 'email', message: 'Formato email non corretto!' })
      return
    } else {
      if (docs[0].email != email) {
        res.json({ name: 'email', message: 'Email not found!' })
        return
      }
    }

    if (!confermaEmail) {
      res.json({ name: 'confermaEmail', message: 'Questo campo è obbligatorio!' })
      return
    } else if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(confermaEmail)) || confermaEmail.length < 8) {
      res.json({ name: 'confermaEmail', message: 'Formato conferma email non corretto!' })
      return
    } else {
      if (confermaEmail != email) {
        res.json({ name: 'confermaEmail', message: 'Conferma email non corrisponde all’email inserita!' })
        return
      }
    }

    const tesserinoID = docs[0].tesserino

    Tesserino_Model.findById(tesserinoID).then(
      function (data) {
        const dataScadenza = data.dataScadenza
        const dataAttuale = new Date()

        if (dataAttuale < dataScadenza) {
          // non è scaduto e non deve essere rinnovato
          res.json(false)
        } else {
          // è scaduto e va rinnovato
          // calcolo data di scadenza
          // uguale alla data attuale + 1 anno
          const date = new Date()
          date.setDate(date.getDate() + 365)

          Tesserino_Model.findByIdAndUpdate(tesserinoID, { dataScadenza: date }, function (err, docs) {
            if (err) throw err

            const notifica = new Notifica_Model({
              titolo: 'Rinnovo tesserino avvenuto!',
              testo: 'La richiesta del rinnovo del tesserino da parte di ' + email + ' è avvenuta con successo!',
              receiverEmail: email,
              tipo: 'Notifica Tesserino',
              visualizzazione: true
            })

            // salvo la notifica
            notifica
              .save(notifica)
              .then(data => {
                res.json(true)
              })
          })
        }
      },
      function (err) {
        res.json({ messagge: 'Error: ' + err })
      }
    )
  })
}

// Get info tesserino
/*
  se il cliente non è loggato l'operazione viene vietata
  altrimenti viene controllato se il cliente possiede un tesserino.
  Se lo possiede viene inviato al front end l'intero tesserino

  Nel caso di messaggi di errore, l'oggetto inviato sarà {message:"messaggio"}
  Quindi se response.hasOwnProperty("message") is true allora non è l'oggetto tesserino
*/
/**
 * Questo metodo restituisice tutte le info di un tesserino
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} -  Nel caso di errori, l'oggetto sarà {message:"messaggio"}, almentri verrà restituito un tesserino
*/
exports.getInfoTesserino = (req, res) => {
  const ruolo = req.body.ruolo
  const email = req.body.email

  if (ruolo != 'cliente') {
    res.json({ message: 'Only customers can access this page!' })
    return
  }

  Cliente_Model.find({ email: email }, function (err, docs) {
    if (err) throw err
    const tesserinoID = docs[0].tesserino // sarà una stringa, non un ObjectID
    if (tesserinoID == null) {
      res.json({ message: "You don't have a Tesserino!" })
      return
    }

    Tesserino_Model.findById(tesserinoID).then(
      function (data) {
        const foundTesserino = {
          ...data._doc
        }
        foundTesserino.dataScadenza = data.dataScadenza.toISOString().substring(0, 10)
        res.json(foundTesserino)
      },
      function (err) {
        res.json(err)
      }
    )
  })
}

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
/**
 * Questo metodo serve per ricaricare un tesserino
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} -  Nel caso di errori, l'oggetto sarà {message:"stringa di errore"}, almentri sarà {message:true}
*/
exports.ricaricaTesserino = (req, res) => {
  const ruolo = req.body.ruolo
  const email = req.body.email

  if (ruolo == '') {
    res.json({ message: 'Devi effettuare il login per accedere a questa pagina!' })
    return
  }

  if (ruolo != 'cliente') {
    res.json({ message: 'Solo i clienti possono accedere a questa pagina!' })
    return
  }

  // Trova un Cliente tramite l'email
  Cliente_Model.find({ email: email }, function (err, docs) {
    if (err) throw err
    const tesserinoID = docs[0].tesserino // sarà una stringa, non un ObjectID
    if (tesserinoID == null) {
      res.json({ message: "You don't have a Tesserino!" })
      return
    }

    // Trova un tesserino tramite il suo ID
    Tesserino_Model.findById(tesserinoID).then(
      function (data) {
        const dataScadenza = data.dataScadenza
        const dataAttuale = new Date()
        const saldo = parseFloat(data.saldo)

        if (dataAttuale > dataScadenza) {
          res.json({ message: 'Your tesserino is expired!' })
          return
        }

        // valida la request se il tesserino non è scaduto
        const intestatario = req.body.intestatario
        const tipoCarta = req.body.tipoCarta
        const numeroCarta = req.body.numeroCarta
        const dataScadenzaCarta = req.body.dataScadenzaCarta
        const cvv = req.body.cvv
        let importo = req.body.importo

        if (!intestatario) {
          res.json({ name: 'intestatario', message: 'Questo campo è obbligatorio!' })
          return
        }

        if (intestatario.length != 0) {
          if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(intestatario)) || intestatario.length <= 1) {
            res.json({ name: 'intestatario', message: 'Formato Intestatario non corretto!' })
            return
          }
        }

        if (!tipoCarta) {
          res.json({ name: 'tipoCarta', message: 'Tipo carta can not be empty' })
          return
        }

        if (!numeroCarta) {
          res.json({ name: 'numeroCarta', message: 'Numero carta can not be empty' })
          return
        }

        if (numeroCarta.length != 0) {
          if (numeroCarta.length <= 12 || numeroCarta.length > 16) {
            res.json({ name: 'numeroCarta', message: 'Numero della carta di credito errato!' })
            return
          }
        }

        if (tipoCarta == 'Mastercard') {
          if (numeroCarta.length != 0) {
            if (!(/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$/.test(numeroCarta))) {
              res.json({ name: 'numeroCarta', message: 'Formato numero carta errato!' })
              return
            }
          }
        } else if (tipoCarta == 'Visa') {
          if (numeroCarta.length != 0) {
            if (!(/^4[0-9]{6,}$/.test(numeroCarta))) {
              res.json({ name: 'numeroCarta', message: 'Formato numero carta errato!' })
              return
            }
          }
        } else {
          // è AmericanExpress
          if (numeroCarta.length != 0) {
            if (!(/^3[47][0-9]{5,}$/.test(numeroCarta))) {
              res.json({ name: 'numeroCarta', message: 'Formato numero carta errato!' })
              return
            }
          }
        }

        if (!dataScadenzaCarta) {
          res.json({ name: 'dataScadenzaCarta', message: 'Questo campo è obbligatorio!' })
          return
        }

        if (dataScadenzaCarta.length != 0) {
          if (!(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(dataScadenzaCarta)) || (dataScadenzaCarta.length != 5 && dataScadenzaCarta.length != 7)) {
            res.json({ name: 'dataScadenzaCarta', message: 'Formato data scadenza errato!' })
            return
            // mm/gg sintassi
          }
        }

        if (!cvv) {
          res.json({ name: 'cvv', message: 'Questo campo è obbligatorio!' })
          return
        }

        if (cvv.length != 0) {
          if (!(/^[0-9]{3,4}$/.test(cvv)) || (cvv.length != 3 && cvv.length != 4)) {
            res.json({ name: 'cvv', message: 'Formato CVV errato!' })
            return
          }
        }

        if (!importo) {
          res.json({ name: 'importo', message: 'Questo campo è obbligatorio!' })
          return
        }

        if (importo.length != 0) {
          if (!(/(^\d{1,3})(\.\d{1,2})?$/.test(importo)) || importo.length > 6) {
            res.json({ name: 'importo', message: 'Formato importo errato!' })
            return
          }
        }

        // aggiorno saldo
        importo = parseFloat(importo)
        Tesserino_Model.findByIdAndUpdate(tesserinoID, { saldo: saldo + importo }, function (err, docs) {
          if (err) throw err

          const notifica = new Notifica_Model({
            titolo: 'Ricarica tesserino avvenuta!',
            testo: 'La ricarica del tesserino da parte di ' + email + ' è avvenuta con successo!',
            receiverEmail: email,
            tipo: 'Notifica Tesserino',
            visualizzazione: true
          })
          notifica
            .save(notifica)
            .then(data => {
              res.json({ message: true })
            })
        })
      },
      function (err) {
        res.json(err)
      }
    )
  })
}
