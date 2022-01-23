const e = require('express')
const db = require('../models')
const Notifica_Model = db.model_notifica

/**
 * Questo metodo restituisce tutte le notifiche di un utente
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Array} - Restituisce l'array di notifiche di un utente
 */
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

/**
 * Questo metodo permette di rimuovere una notifica
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {String} - Restituisce una stringa che avvisa della corretta o mancata rimozione
 */
exports.rimuoviNotifica = (req, res) => {
  Notifica_Model.findByIdAndRemove({ _id: req.body.idnot })
    .then(data => {
      res.json('Notifica eliminata con successo')
    })
    .catch(err => {
      res.json('Some error while deleting notifica')
    })
}
