const ObjectId = require('mongodb').ObjectID
const db = require('../models')
const Messaggio_Model = db.model_messaggio

// crea un nuovo messaggio
// l'fe mi passa: l'id della conversazione, il sender {email, ruolo}, il testo, la data (new Date())
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

exports.deleteMessaggio = (req, res) => {
  const idMessaggio = req.body.idMessaggio

  Messaggio_Model.findOneAndDelete({ _id: idMessaggio }, function (err, docs) {
    if (err) throw err
    return res.json(true)
  })
}

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

exports.getAllConversationMessages = (req, res) => {
  const conversazioneId = req.body.conversazioneId

  Messaggio_Model.find({ conversazioneId: new ObjectId(conversazioneId) }, function (err, docs) {
    if (err) throw err
    return res.json(docs)
  })
}
