const db = require('../models')
const Menu_Model = db.model_menu
const Pasto_Model = db.model_pasto

/**
 * Questo metodo restituisce tutti i pasti presenti nel database
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Array} - Restituisce un array di tutti i pasti presenti nel database
 */
exports.scelatamenu = (req, res) => {
  Pasto_Model.find({})
    .then(data => {
      if (data == null) {
        res.json({ message: false })
      } else {
        res.json(data)
      }
    })
    .catch(err => {
      res.json({ message: err.message || 'Some error occurred while retrieving pasto.' })
    })
}


/**
 * Questo metodo restituisce il menù odierno, disponibile a pranzo o a cena
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} - Restituisce un oggetto menù 
 */
exports.visualizzamenu = (req, res) => {
  const tipoMenu = req.body.tipo
  const dataOdierna = new Date()
  dataOdierna.setUTCHours(0, 0, 0, 0)
  Menu_Model.find({ tipo: tipoMenu })
    .then(data => {
      if (data[0] == null) {
        res.json({ message: false })
      } else if (data[0].data.getTime() == dataOdierna.getTime()) {
        res.json(data)
      } else {
        res.json({ message: false })
      }// ritorna false poiché il menu inserito è un menu vecchio
    })
    .catch(err => {
      res.json({ message: err.message || 'Some error occurred while retrieving menu.' })
    })
}

/**
 * Questo metodo permette di inserire il menù odierno
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} - Restituisce un oggetto {message:true} se l'inserimento è andato a buon fine, altrimenti {message:String} in caso di errore
 */
exports.inseriscimenu = async (req, res) => {
  const tipoMenu = req.body.tipo
  const dataOdierna = new Date()
  const listaPasti = req.body.pasti
  dataOdierna.setUTCHours(0, 0, 0, 0)
  const menu = new Menu_Model({
    pasti: req.body.pasti,
    tipo: req.body.tipo,
    data: dataOdierna
  })
  Menu_Model.find({ tipo: tipoMenu })
    .then(data => {
      if (data[0]) {
        if (data[0].data.getTime() == dataOdierna.getTime()) {
          res.json({ message: 'Impossibile inserire il menu perché già presente un menu per questa data' })
        } else {
          Menu_Model.findOneAndUpdate({ tipo: tipoMenu }, { $set: { data: dataOdierna, pasti: listaPasti } }, { useFindAndModify: false }, function (err, docs) {
            if (err) { res.json({ message: 'Some errore occurred while saving menu' }) } else {
              res.json({ message: true })
            }
          })
        }
      } else {
        menu
          .save(menu)
          .then(data => {
            res.json({ message: true })
          })
          .catch(err => {
            res.json({ message: err.message || 'Some error occurred while saving menu.' })
          })
      }
    })
    .catch(err => {
      res.json({ message: err.message || 'Some error occurred while retriving menu.' })
    })
}

/**
 * Questo metodo permette di modificare il menù odierno
 * @param {Object} req - L'oggetto request 
 * @param {Object} res - L'oggetto response
 * @returns {Object} -  Restituisce un oggetto {message:true} se la modifica è andata a buon fine, altrimenti {message:String} in caso di errore
 */
exports.modificamenu = async (req, res) => {
  const tipoMenu = req.body.tipo
  const dataOdierna = new Date()
  const listaPasti = req.body.pasti
  dataOdierna.setUTCHours(0, 0, 0, 0)
  Menu_Model.find({ tipo: tipoMenu })
    .then(data => {
      if (data[0]) {
        if (data[0].data.getTime() == dataOdierna.getTime()) {
          Menu_Model.findOneAndUpdate({ tipo: tipoMenu }, { $set: { pasti: listaPasti } }, { useFindAndModify: false }, function (err, docs) {
            if (err) { res.json({ message: 'Some errore occurred while update menu' }) } else {
              res.json({ message: true })
            }
          })
        } else {
          res.json({ message: 'Impossibile modificare il menu perché non è presente un menu per questa data' })
        }
      }
    })
    .catch(err => {
      res.json({ message: err.message || 'Some error occurred while retriving menu.' })
    })
}
