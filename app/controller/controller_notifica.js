const e = require('express')
const db = require('../models')
const Notifica_Model = db.model_notifica

// VISUALIZZARE LA LISTA DELLE NOTIFICHE
exports.visualizzaLista = (req, res) => {
  Notifica_Model.find({ receiverEmail: req.body.email })
    .then(data => {
      if (data) {
        res.json(data)
      }
    })
    .catch(err => {
      res.json('Some error while retriving notifiche')
    })
}

// METODO PER LA RIMOZIONE DI UNA NOTIFICA DALLA LISTA DELLE NOTIFICHE
exports.rimuoviNotifica = (req, res) => {
  Notifica_Model.findByIdAndRemove({ _id: req.body.idnot })
    .then(data => {
      res.json('Notifica eliminata con successo')
    })
    .catch(err => {
      res.json('Some error while deleting notifica')
    })
}
