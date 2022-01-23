const e = require('express')
const db = require('../models')
const Personale_Model = db.model_personale
const hash = require('./hash.js')

// Crea e salva un nuovo Personale(operatore mensa o personale ADISU)
/**
 * Questo metodo crea e salva  un nuovo Personale(operatore mensa o un personale ADISU)
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} - Restituisce un oggetto false in caso di errore, altrimenti restituisce true
 */
exports.insert = (req, res) => {
  if (!req.body.ruolo) {
    return res.json({ message: 'Devi essere loggato per accedere a questa pagina!' })
  }

  if (req.body.ruolo != 'admin' && req.body.ruolo != 'personale adisu') {
    return res.json({ message: 'Non puoi accedere a questa pagina!' })
  }

  // Validazione della request
  const nome = req.body.nome
  const cognome = req.body.cognome
  const password = req.body.password
  const email = req.body.email
  const numeroTelefono = req.body.numeroTelefono
  const dataDiNascita = req.body.dataDiNascita
  const indirizzo = req.body.indirizzo
  const confermapassword = req.body.confermapassword
  // Create a Personale
  const personale = new Personale_Model({
    nome: req.body.nome,
    cognome: req.body.cognome,
    password: req.body.password,
    email: req.body.email,
    numeroTelefono: req.body.numeroTelefono,
    dataDiNascita: req.body.dataDiNascita,
    ruolo: null,
    disponibilita: true,
    indirizzo: req.body.indirizzo
  })

  const tipo = req.body.ruolo

  if (tipo == 'admin') {
    personale.ruolo = 'personale adisu'
  } else if (tipo == 'personale adisu') {
    personale.ruolo = 'operatore mensa'
  }

  // validazione del nome
  if (!nome) {
    res.json({ name: 'nome', message: 'Questo campo è obbligatorio!' })
    return
  }
  if (nome.length != 0) {
    if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(nome)) || nome.length <= 1) {
      res.json({ name: 'nome', message: 'Formato nome non corretto!' })
      return
    }
  }

  // validazione del cognome
  if (!cognome) {
    res.json({ name: 'cognome', message: 'Questo campo è obbligatorio!' })
    return
  }
  if (cognome.length != 0) {
    if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cognome)) || cognome.length <= 1) {
      res.json({ name: 'cognome', message: 'Formato cognome non corretto!' })
      return
    }
  }

  // validazione dell'indirizzo
  if (!indirizzo) {
    res.json({ name: 'indirizzo', message: 'Questo campo è obbligatorio!' })
    return
  }
  if (indirizzo.length != 0) {
    if (!(/^[a-zA-Z][^\n<>!?[\]{}|^~%#:;$%?\0-\cZ]+$/.test(indirizzo)) || indirizzo.length <= 1) {
      res.json({ name: 'indirizzo', message: 'Formato indirizzo non corretto!' })
      return
    }
  }

  // validazione del numero di telefono

  if (numeroTelefono.length != 0) {
    if (numeroTelefono.length < 10 || numeroTelefono.length > 15) {
      res.json({ name: 'numeroTelefono', message: 'Lunghezza numero di telefono non corretta!' })
      return
    } else if (!(/^[0-9\-\+]{9,15}$/.test(numeroTelefono)) || numeroTelefono.length < 10 || numeroTelefono.length > 15) {
      res.json({ name: 'numeroTelefono', message: 'Formato numero di telefono non corretto!' })
      return
    }
  }

  // validazione della data di nascita
  if (!dataDiNascita) {
    res.json({ name: 'dataDiNascita', message: 'Questo campo è obbligatorio!' })
    return
  }
  if (dataDiNascita.length == 10) {
    if (!(/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.](19|20)\d\d/.test(dataDiNascita))) {
      res.json({ name: 'dataDiNascita', message: 'Formato data di nascita non corretto!' })
      return
    }
  }

  // validazione dell'email
  if (!email) {
    res.json({ name: 'email', message: 'Questo campo è obbligatorio!' })
    return
  }
  if (email.length != 0) {
    if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) || email.length < 8) {
      res.json({ name: 'email', message: 'Formato email non corretto!' })
      return
    }
  }

  // validazione della password
  if (!password) {
    res.json({ name: 'password', message: 'Questo campo è obbligatorio!' })
    return
  }
  if (password.length != 0) {
    if ((password.length <= 8) || (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(password)))) {
      res.json({ name: 'password', message: 'Formato password non corretto!' })
      return
    }
  }
  // validazione della conferma della password
  if (!confermapassword) {
    res.json({ name: 'confermapassword', message: 'Questo campo è obbligatorio!' })
    return
  }
  if (confermapassword.length != 0) {
    if ((confermapassword.length <= 8) || (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(confermapassword)))) {
      res.json({ name: 'confermapassword', message: 'Formato conferma password non corretto!' })
      return
    }
  }
  if (confermapassword != password) {
    res.json({ name: 'confermapassword', message: 'Conferma passowrd non corrisponde alla password inserita!' })
    return
  }

  const passwordHashed = hash.hashPassword(password)
  personale.password = passwordHashed

  // Prima di inserire si effettua un controllo sull'email (che è unica nel DB)
  // Nel caso non esiste tale email si ritorna un errore
  // Nel caso in cui ,invece, tale email esiste, si prosegue con l'inserimento
  Personale_Model.find({ email: email }, function (err, docs) {
    if (docs == 0) {
      personale
        .save(personale)
        .then(data => {
          res.json({ message: true })
        })
        .catch(err => {
          res.json({
            message: err.message || 'Some error occurred while retriving personale.'
          })
        })
    } else {
      res.json({ message: false })
    }

    if (err) {
      res.json({ message: 'Error retrieving personale with email=' + email })
    }
  })
}

// Prendi tutti i Personali dal Database dato un ruolo
/**
 *Questo metodo ritorna una lista facendo una ricerca in base al ruolo
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} - Restituisce un array contente il personale con un determinato ruolo, ritorna false in caso di array vuoto
 */
exports.findByRuolo = (req, res) => {
  // variabile di prova da cancellare
  let tipo = req.body.ruolo

  if (tipo == 'admin') {
    tipo = 'personale adisu'
  } else {
    tipo = 'operatore mensa'
  }
  // Trova un personale tramite il ruolo(operatore mensa o personale ADISU)
  Personale_Model.find({ ruolo: tipo })
    .then(data => {
      if (data == null) {
        res.json({ message: false })
      } else {
        res.json(data)
      }
    })
    .catch(err => {
      res.json({ message: err.message || 'Some error occurred while retrieving personale adisu.' })
    })
}

// Rimozione di un Personale data un email ricevuta dal lato Front-End
/**
 * Questo metodo cerca e rimuove un personale con una data email in quanto è unica nel DB
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} - Restituisce false nel caso in cui non trova il personale con quell'email, altrimenti restituisce true
 */
exports.findByEmailAndRemove = (req, res) => {
  Personale_Model.findOneAndDelete({ email: req.body.email })
    .then(data => {
      if (data == null) {
        res.json({ message: false })
      } else res.json({ message: true })
    })
    .catch(err => {
      res.json({
        message: err.message || 'Qualche errore durante la rimozione del personale adisu'
      })
    })
}

/* Metodo per prendere le info del personale (NON VIENE USATO)
/*exports.findByEmail = (req, res) => {
var email = req.body.email;
  Personale_Model.find({email : email}) //vedere con alex come passare l'email in questo campo
    .then(data => {
      if(data==null){
      res.json({message:false})}
      else res.json(data);
    })
    .catch(err => {
      res.json({
        message:
          err.message || "Some error occurred while retrieving personale adisu."
      });
    }); */
