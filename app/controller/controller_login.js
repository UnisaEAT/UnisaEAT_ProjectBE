const e = require("express");
const db = require("../models");
const Personale_Model = db.model_personale;
const Cliente_Model = db.model_cliente;
const Admin_Model = db.model_admin

var hash = require('./hash.js');

exports.login = (req, res) => {
    //prendiamo l'email e la password dal body
    var email = req.body.email
    var password = req.body.password

    //validazione dell'email
    if (!email) {
        res.json({
            message: "Email non può essere vuoto"
        });
        return;
    }
    if (email.length != 0) {
        if (!(/^[a-zA-Z0-9.%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/.test(email)) || (email.length < 8)) {
            res.json({
                message: "Espressione regolare email non rispettata"
            });
            return;
        }
    }

    //validazione della password
    if (!password) {
        res.json({
            message: "Passowrd non può essere vuoto"
        });
        return;
    }
    if (password.length != 0) {
        if ((password.length <= 8) || (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(password)))) {
            res.json({
                message: "Espressione regolare passowrd non rispettata"
            });
            return;
        }
    }


    Personale_Model.find({ email: email }, function(err, docs) {
        if (err) throw err;
        let check = docs[0];
        console.log(docs[0]);

        if ((check != null) && (docs[0].ruolo == "operatore mensa") && (hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {
            res.json(check)
                // crezione sessione operatore mensa
            req.session.email = docs[0].email
            req.session.ruolo = "operatore mensa"
            return;
        } else if ((check != null) && (docs[0].ruolo == "personale adisu") && (hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {

            // creazione sessione personale adisu
            req.session.email = docs[0].email
            req.session.ruolo = "personale adisu"
            res.json(check)

        } else if (check == null) {
            Cliente_Model.find({ email: email }, function(err, docs) {
                if (err) throw err;
                let check = docs[0];
                console.log(docs[0]);
                if ((check != null) && (hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {


                    //creazione sessions cliente
                    req.session.email = docs[0].email
                    req.session.ruolo = "cliente"
                    res.json(check)
                } else if (check == null) {
                    Admin_Model.find({ email: email }, function(err, docs) {
                        if (err) throw err;
                        let check = docs[0];
                        console.log(docs[0]);
                        if ((check != null) && (hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {

                            // creazione sessione admin
                            req.session.email = docs[0].email
                            req.session.ruolo = "admin"
                            res.json(check)
                        } else {
                            res.json({ message: "Campi del login errati" })
                        }

                    })
                }
                return;

            })


        }
    })
};

exports.authChecker = (req, res) => {
    const sessUser = req.session.email;
    if (sessUser) {
        return res.json({ email: req.session.email, tipo: req.session.tipo });
    } else {
        return res.json({ message: "Unauthorized" });
    }
};