var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
//Personale
var Personale_Model = db.model_personale;
//Cliente
var Cliente_Model = db.model_clienti;
//Admin
var Admin_Model = db.model_admin;
//Verificare sessione
const session = require('express-session')
var hash = require('./hash.js')


exports.findByEmail = (req, res) => {

    //mettere i ruoli in minuscolo (admin, personale adisu, operatore mensa)
    var tipo = "Admin";
    var mail = "m.judo@studenti.unisa.it";

    /*req.session.utente.id = new ObjectId("61c4518cee6b7b3e89608755")
    var id= req.session.utente.id ORA SI E' DECISO PER EMAIL
    EX - getPROFILO
    Vedere se bisogna consegnare con Propt e non più send
    */

//if Personale, Cliente, Admin
    if (tipo == "Personale") {
//Email andrà modificato una volta implementata la sessione nei Login
        Personale_Model.findOne({email: mail}) //ID
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({
                    message:
                        err.message || "Some error occurred while retrieving profile."
                });
            });
    }
    if (tipo == "Cliente") {
        Cliente_Model.find({email: mail}) //ID
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({
                    message:
                        err.message || "Some error occurred while retrieving profile."
                });
            });
    }
    if (tipo == "Admin") {
        Admin_Model.find({email: mail}) //ID
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.json({
                    message:
                        err.message || "Some error occurred while retrieving profile."
                });
            });
    }
};

exports.updatePassword = function (req, res) {

    //var mail = "g.citro@studenti.unisa.it"
    var mail = "c.citro@studenti.unisa.it"
    //mettere ruolo invece di tipo
    //password corretta: Gerardocitro1!

    req.session.ruolo = "operatore mensa"
    var oldPassword = req.body.inputOldPassword
    var password = req.body.inputPassword
    var passwordConfirm = req.body.inputConfirmPassword

    if ((!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(oldPassword)) || (oldPassword.length <= 8) || (oldPassword == null))) {
        res.json({message: "Errore Password vecchia."});
        return;
    }

    if ((password == null) || (password.length <= 8) || (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(password)))) {
        res.json({message: "Errore Password."});
        return;
    }

    if (passwordConfirm != password) {
        res.json({message: "Errore Password di conferma."});
        return;
    }

    //Non corrisponde a quello sul DB CHECKPASSWORD - vedere come fare find per i tipi

    //var vecio = hash.hashPassword(oldPassword)
    /*if (req.session.ruolo == "cliente") {

      Cliente_Model.find({email:mail}, function (err,docs) {
        if (err) throw err;
        console.log(docs)
        let hashato=docs[0].password;

        if (hash.checkPassword(hashato.hash, hashato.salt, oldPassword)==false) {
          res.json({message: "Password non corrisponde nel DB."});
          return;
        }
      })
    }
    else if (req.session.ruolo == "admin"){
      Admin_Model.find({email:mail}, function (err,docs) {
        if (err) throw err;
        let hashato=docs[0].password;

        if(hash.checkPassword(hashato.hash, hashato.salt, oldPassword)==false) {
          res.json({message: "Password non corrisponde nel DB."});
          return;
        }
      })
    }
    else {
      Personale_Model.find({email:mail}, function (err,docs) {
        if (err) throw err;
        let hashato=docs[0].password;

        if (hash.checkPassword(hashato.hash, hashato.salt, oldPassword)==false) {
          res.json({message: "Password non corrisponde nel DB."});
          return;
        }
      })
    }*/


    var passwordHashed = hash.hashPassword(password)

    console.log(req.session.ruolo)
    if (req.session.ruolo == "personale adisu" || req.session.ruolo == "operatore mensa") {

        Personale_Model.find({email: mail}, function (err, docs) {
            if (err) throw err;
            let hashato = docs[0].password;

            if (hash.checkPassword(hashato.hash, hashato.salt, oldPassword) == false) {
                res.json({message: "Password non corrisponde nel DB."});
                return;
            } else {
                Personale_Model.findOneAndUpdate({email: mail}, {password: passwordHashed}).then(
                    function (val) {
                        res.json({message: "Modifica password avvenuta con successo."});
                        return;
                    }
                );
            }
        })
    } else if (req.session.ruolo == "cliente") {
        Cliente_Model.find({email: mail}, function (err, docs) {
            if (err) throw err;
            let hashato = docs[0].password;

            if (hash.checkPassword(hashato.hash, hashato.salt, oldPassword) == false) {
                res.json({message: "Password non corrisponde nel DB."});
                return;
            } else {
                Cliente_Model.findOneAndUpdate({email: mail}, {password: passwordHashed}).then(
                    function (val) {
                        res.json({message: "Modifica password avvenuta con successo."});
                        return;
                    }
                );
            }
        })
    } else if (req.session.ruolo == "admin") {
        Admin_Model.find({email: mail}, function (err, docs) {
            if (err) throw err;
            let hashato = docs[0].password;

            if (hash.checkPassword(hashato.hash, hashato.salt, oldPassword) == false) {
                res.json({message: "Password non corrisponde nel DB."});
                return;
            } else {
                Admin_Model.findOneAndUpdate({email: mail}, {password: passwordHashed}).then(
                    function (val) {
                        res.json({message: "Modifica password avvenuta con successo."});
                        return;
                    }
                );
            }
        })
    }
};