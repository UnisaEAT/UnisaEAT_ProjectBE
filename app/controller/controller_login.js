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

    //validazione della password
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

    //codice nuovo
    Personale_Model.find({email:email}, function(err, docs) {
        if (err) throw err;
        if(docs.length!=0) {
            //la mail corrisponde ad un personale, si fa il check della password
            if((hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {
                //la password corrisponde, restituisco l'utente loggato
                res.json({email:docs[0].email, ruolo:docs[0].ruolo})
                return;
            }
            else {
                //la password non corrisponde
                res.json({message:"Campi del login errati"})
                return;

            }
        }
        else {
            //la mail non corrisponde ad un personale. Si controllano le altre collection
            //Controllo cliente
            Cliente_Model.find({email:email}, function (err, docs) {
                if (err) throw err;
                if(docs.length!=0){
                    //la mail corrisponde ad un cliente, si fa il check della password
                    if((hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {
                        //la password corrisponde, restituisco l'utente loggato
                        res.json({email:docs[0].email, ruolo:"cliente"})
                        return;
                    }
                    else {
                        //la password non corrisponde
                        res.json({message:"Campi del login errati"})
                        return;
        
                    }
                }
                else
                {
                    //la mail non corrisponde ad un cliente.
                    //Controllo admin
                    Admin_Model.find({email:email}, function (err, docs) {
                        if (err) throw err;
                        if(docs.length!=0) {
                            //la mail corrisponde ad un admin, si fa il check della password
                            if((hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {
                                //la password corrisponde, restituisco l'utente loggato
                                res.json({email:docs[0].email, ruolo:"admin"})
                                return;
                            }
                            else {
                                //la password non corrisponde
                                res.json({message:"Campi del login errati"})
                                return;
                
                            }
                        }
                        else {
                            //la mail non esiste in nessun collection
                            res.json({message:"Campi del login errati"})
                            return;
                        }
                    })
                }

            })
        }

    })
    
    //codice vecchio 
    /*Personale_Model.find({ email: email }, function(err, docs) {
        if (err) throw err;
        let check = docs[0];
        console.log(docs[0]);

        if ((check != null) && (docs[0].ruolo == "operatore mensa") && (hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {
            
            // crezione sessione operatore mensa
            req.session.email = docs[0].email
            req.session.ruolo = "operatore mensa"
            res.json({"email":docs[0].email, "ruolo":"operatore mensa"})
            return;

        } else if ((check != null) && (docs[0].ruolo == "personale adisu") && (hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {

            // creazione sessione personale adisu
            req.session.email = docs[0].email
            req.session.ruolo = "personale adisu"
            res.json({"email":docs[0].email, "ruolo":"personale adisu"})
            return;

        } else if (check == null) {
            Cliente_Model.find({ email: email }, function(err, docs) {
                if (err) throw err;
                let check = docs[0];
                console.log(docs[0]);
                if ((check != null) && (hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {


                    //creazione sessions cliente
                    req.session.email = docs[0].email
                    req.session.ruolo = "cliente"

                    res.json({"email":docs[0].email, "ruolo":"cliente"})
                    return;
                } else if (check == null) {
                    Admin_Model.find({ email: email }, function(err, docs) {
                        if (err) throw err;
                        let check = docs[0];
                        console.log(docs[0]);
                        if ((check != null) && (hash.checkPassword(docs[0].password.hash, docs[0].password.salt, password))) {

                            // creazione sessione admin
                            req.session.email = docs[0].email
                            req.session.ruolo = "admin"
                            res.json({"email":docs[0].email, "ruolo":"admin"})
                            return;
                        } else {
                            res.json({ 
                                message: "Campi del login errati", 
                            })
                            return;
                        }

                    })
                }
                return;

            })


        }
    })*/
};

/*exports.authChecker = (req, res) => {
    const sessUser = req.session.email;
    console.log(sessUser)
    if (sessUser) {
        return res.json({ email: req.session.email, ruolo: req.session.ruolo });
    } else {
        return res.json({ message: "Unauthorized" });
    }
};*/