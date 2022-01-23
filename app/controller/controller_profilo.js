const ObjectId = require('mongodb').ObjectID
const db = require('../models')
const Personale_Model = db.model_personale // Personale
const Cliente_Model = db.model_cliente // Cliente
const Admin_Model = db.model_admin // Admin
const session = require('express-session') // Verificare sessione
const hash = require('./hash.js')

// findByEmail dell'utente
exports.findByEmail = (req, res) => {
  const tipo = req.body.ruolo
  const mail = req.body.email

  // if Personale, Cliente, Admin
  if ((tipo == 'personale adisu') || (tipo == 'operatore mensa')) {
    // Email andrà modificato una volta implementata la sessione nei Login
    Personale_Model.find({ email: mail }) // ID
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.json({
          name: 'ruolo',
          message:

                        err.message || 'Some error occurred while retrieving profile.'
        })
      })
  }
  if (tipo == 'cliente') {
    Cliente_Model.find({ email: mail }) // ID
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.json({
          name: 'ruolo',
          message: err.message || 'Some error occurred while retrieving profile.'
        })
      })
  }
  if (tipo == 'admin') {
    Admin_Model.find({ email: mail }) // ID
      .then(data => {
        res.json(data)
      })
      .catch(err => {
        res.json({
          name: 'ruolo',
          message: err.message || 'Some error occurred while retrieving profile.'
        })
      })
  }
}

exports.updatePassword = function (req, res) {
  if (!req.body.ruolo || !req.body.email) {
    return res.json({ message: 'Devi essere loggato per accedere a questa pagina!' })
  }

  if (req.body.ruolo == 'cliente') {
    return res.json({ message: 'Non puoi accedere a questa pagina!' })
  }

  const mail = req.body.email
  const oldPassword = req.body.inputOldPassword
  const password = req.body.inputPassword
  const passwordConfirm = req.body.inputConfirmPassword

  if ((!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(oldPassword)) || (oldPassword == null))) {
    if (oldPassword.length <= 8) { res.json({ name: 'inputOldPassword', message: 'Lunghezza password non corretta' }) }

    res.json({
      name: 'inputOldPassword',
      message: 'Il formato della vecchia password non è corretto.'
    })
    return
  }

  if (password.length <= 8) { res.json({ name: 'inputPassword', message: 'Lunghezza password non corretta' }) }

  if ((password == null) || (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(password)))) {
    res.json({
      name: 'inputPassword',
      message: 'Il formato della nuova password non è corretto'
    })
    return
  }

  if (passwordConfirm.length <= 8) { res.json({ name: 'inputConfirmPassword', message: 'Lunghezza password non corretta' }) }

  if ((passwordConfirm == null) || (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(passwordConfirm)))) {
    res.json({ name: 'inputConfirmPassword', message: 'Il formato della nuova password non è corretto' })
  }

  if (passwordConfirm != password) {
    res.json({
      name: 'inputConfirmPassword',
      message: 'la password inserita non corrisponde a quella del campo precedente'
    })

    return
  }

  // Non corrisponde a quello sul DB CHECKPASSWORD - vedere come fare find per i tipi

  // var vecio = hash.hashPassword(oldPassword)
  /* if (req.session.ruolo == "cliente") {

      Cliente_Model.find({email:mail}, function (err,docs) {
        if (err) throw err;
        console.log(docs)
        let hashato=docs[0].password;

        if (hash.checkPassword(hashato.hash, hashato.salt, oldPassword)==false) {
          res.json({message: "la vecchia password non corrisponde."});
          return;
        }
      })
    }
    else if (req.session.ruolo == "admin"){
      Admin_Model.find({email:mail}, function (err,docs) {
        if (err) throw err;
        let hashato=docs[0].password;

        if(hash.checkPassword(hashato.hash, hashato.salt, oldPassword)==false) {
          res.json({message: "la vecchia password non corrisponde."});
          return;
        }
      })
    }
    else {
      Personale_Model.find({email:mail}, function (err,docs) {
        if (err) throw err;
        let hashato=docs[0].password;

        if (hash.checkPassword(hashato.hash, hashato.salt, oldPassword)==false) {
          res.json({message: "la vecchia password non corrisponde."});
          return;
        }
      })
    } */

  const passwordHashed = hash.hashPassword(password)

  if (req.body.ruolo == 'personale adisu' || req.body.ruolo == 'operatore mensa') {
    Personale_Model.find({ email: mail }, function (err, docs) {
      if (err) throw err
      const hashato = docs[0].password

      if (hash.checkPassword(hashato.hash, hashato.salt, oldPassword) == false) {
        res.json({ name: 'inputOldPassword', message: 'la vecchia password non corrisponde.' })
      } else {
        Personale_Model.findOneAndUpdate({ email: mail }, { password: passwordHashed }).then(
          function (val) {
            res.json({ name: 'password', message: 'Modifica password avvenuta con successo.' })
          }
        )
      }
    })
  } else if (req.body.ruolo == 'admin') {
    Admin_Model.find({ email: mail }, function (err, docs) {
      if (err) throw err
      const hashato = docs[0].password

      if (hash.checkPassword(hashato.hash, hashato.salt, oldPassword) == false) {
        res.json({ name: 'inputOldPassword', message: 'la vecchia password non corrisponde.' })
      } else {
        Admin_Model.findOneAndUpdate({ email: mail }, { password: passwordHashed }).then(
          function (val) {
            res.json({ name: 'password', message: 'Modifica password avvenuta con successo.' })
          }
        )
      }
    })
  }
}
