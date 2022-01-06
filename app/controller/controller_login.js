const e = require("express");
const db = require("../models");
const Personale_Model = db.model_personale;
const Cliente_Model = db.model_cliente;
const Admin_Model = db.model_admin

var hash = require('./hash.js');

exports.login = (req, res) => {

    //Prendiamo l'email e la password dal body
    var email = req.body.email
    var password = req.body.password

    //Validazione dell'email
    if (!email) {
        res.json({
            name: "email",
            message: "Email non può essere vuoto"
        });
        return;
    }
    if (email.length != 0) {
        if (!(/^[a-zA-Z0-9.%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/.test(email)) || (email.length < 8)) {
            res.json({
                name: "email",
                message: "Espressione regolare email non rispettata",
            });
            return;
        }
    }

    //Validazione della password
    if (!password) {
        res.json({
            name: "password",
            message: "Passoword non può essere vuoto",
        });
        return;
    }
    if (password.length != 0) {
        if ((password.length <= 8) || (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(password)))) {
            res.json({
                name: "password",
                message: "Espressione regolare passoword non rispettata",
            });
            return;
        }
    }

    //Si controlla se l'email corrisponde a quella di un Personale(operatore mensa o personale ADISU)
    Personale_Model.find({email: email}, function (err, docs) {
        if (err) throw err;
        if (docs.length != 0) {
            //la mail corrisponde ad un personale, si fa il check della password
            if ((hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {
                //la password corrisponde, restituisco l'utente loggato
                res.json({email: docs[0].email, ruolo: docs[0].ruolo})
                return;
            } else {
                //la password non corrisponde
                res.json({message: "Campi del login errati"})
                return;

            }
        } else {
            //la mail non corrisponde ad un Personale. Si controllano le altre collection
            //Si controlla se l'email corrisponde a quella di un Cliente
            Cliente_Model.find({email: email}, function (err, docs) {
                if (err) throw err;
                if (docs.length != 0) {
                    //la mail corrisponde ad un cliente, si fa il check della password
                    if ((hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {
                        //la password corrisponde, restituisco l'utente loggato
                        res.json({email: docs[0].email, ruolo: "cliente"})
                        return;
                    } else {
                        //la password non corrisponde
                        res.json({message: "Campi del login errati"})
                        return;

                    }
                } else {
                    //la mail non corrisponde ad un Cliente. Si controllano le altre collection
                    //Si controlla se l'email corrisponde a quella di un Admin
                    Admin_Model.find({email: email}, function (err, docs) {
                        if (err) throw err;
                        if (docs.length != 0) {
                            //la mail corrisponde ad un admin, si fa il check della password
                            if ((hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {
                                //la password corrisponde, restituisco l'utente loggato
                                res.json({email: docs[0].email, ruolo: "admin"})
                                return;
                            } else {
                                //la password non corrisponde
                                res.json({message: "Campi del login errati"})
                                return;

                            }
                        } else {
                            //la mail non esiste in nessuna collection
                            res.json({message: "Campi del login errati"})
                            return;
                        }
                    })
                }

            })
        }

    })

};