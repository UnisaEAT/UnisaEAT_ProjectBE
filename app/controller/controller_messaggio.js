const ObjectId = require('mongodb').ObjectID
const db = require('../models')
const Messaggio_Model = db.model_messaggio

/**
 * Questo metodo permette di creare un messaggio
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} - Restituisce un oggetto messaggio se l'inserimento è andato a buon fine, altrimenti {error:String} in caso di errore
 */
exports.create = (req, res) => {
  const message = req.body

  if (!message) {
    return res.json({ error: 'Nessun messaggio inviato' })
  }

  if (!message.sender.email || !message.sender.ruolo) {
    return res.json({ error: 'Devi effettuare il login per inviare un messaggio!' })
  }

  if (message.sender.ruolo != 'cliente' && message.sender.ruolo != 'personale adisu') {
    return res.json({ error: 'Non sei autorizzato ad inviare messaggi!' })
  }

  if (message.testo.length == 0 || message.testo.length > 1000) {
    return res.json({ error: true, message: 'Lunghezza del messaggio non corretta!' })
  }

  const messaggio = new Messaggio_Model({
    conversazioneId: message.conversazioneId,
    sender: message.sender,
    testo: message.testo,
    dataInvio: message.dataInvio
  })

  messaggio.save(messaggio).then(data => {
    return res.json(data)
  })
    .catch(err => {
      return res.json({ error: 'Some error occurred while creating messaggio.' })
    })
}

/**
 * Questo metodo permette di eliminare un messaggio
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Boolean} - Restituisce true se l'eliminazione è andata a buon fine, altrimenti lancia un'eccezione
 */
exports.deleteMessaggio = (req, res) => {
  const idMessaggio = req.body.idMessaggio

  Messaggio_Model.findOneAndDelete({ _id: idMessaggio }, function (err, docs) {
    if (err) throw err
    return res.json(true)
  })
}

/**
 * Questo metodo permette di modificare un messaggio
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {(Boolean|Object)} - Restituisce true se la modifica è andata a buon fine, altrimenti un oggetto {error:String} contenente il messaggio di errore
 */
exports.modifyMessaggio = (req, res) => {
  const idMessaggio = req.body.idMessaggio
  const nuovoTesto = req.body.nuovoTesto
  const emailSessione = req.body.email
  const ruoloSessione = req.body.ruolo

  if (!emailSessione || !ruoloSessione) {
    return res.json({ error: 'Devi essere loggato per modificare un messaggio!' })
  }

  if (ruoloSessione != 'cliente' && ruoloSessione != 'personale adisu') {
    return res.json({ error: 'Non sei autorizzato a modificare messaggi!' })
  }

  if (nuovoTesto.length == 0 || nuovoTesto.length > 1000) {
    return res.json({ error: true, message: 'Lunghezza del messaggio non corretta!' })
  }

  Messaggio_Model.findByIdAndUpdate({ _id: idMessaggio }, { testo: nuovoTesto }, function (err, docs) {
    if (err) throw err
    return res.json(true)
  })
}

/**
 * Questo metodo restituisce tutti i messaggi di una conversazione
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Array} - Restituisce un array di messaggi, altrimenti lancia un'eccezione
 */
exports.getAllConversationMessages = (req, res) => {
  const conversazioneId = req.body.conversazioneId

  Messaggio_Model.find({ conversazioneId: new ObjectId(conversazioneId) }, function (err, docs) {
    if (err) throw err
    return res.json(docs)
  })
}
