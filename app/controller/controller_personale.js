const e = require("express");
const db = require("../models");
const Personale_Model = db.model_personale;
var hash = require('./hash.js');

// Crea e salva un nuovo Personale(operatore mensa o personale ADISU)
exports.insert = (req, res) => {
    // Validazione della request
    let nome = req.body.nome;
    let cognome = req.body.cognome;
    let password = req.body.password;
    let email = req.body.email;
    let numeroTelefono = req.body.numeroTelefono;
    let dataDiNascita = req.body.dataDiNascita;
    let indirizzo = req.body.indirizzo;
    let confermapassword = req.body.confermapassword;
    // Create a Personale
    const personale = new Personale_Model({
        nome: req.body.nome,
        cognome: req.body.cognome,
        password: req.body.password,
        email: req.body.email,
        numeroTelefono: req.body.numeroTelefono,
        dataDiNascita: req.body.dataDiNascita,
        ruolo: null,
        disponibilita: true,
        indirizzo: req.body.indirizzo
    });

    var tipo = "admin"


    if (tipo == "admin") {
        personale.ruolo = "personale adisu"
    } else if (tipo == "personale adisu") {
        personale.ruolo = "operatore mensa"
    }

    //validazione del nome
    if (!nome) {
        res.json({name: "nome", message: "Nome non può essere vuoto"});
        return;
    }
    if (nome.length != 0) {
        if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(nome)) || nome.length <= 1) {
            res.json({name: "nome", message: "Espressione regolare nome non rispettata"});
            return;
        }
    }

    //validazione del cognome
    if (!cognome) {
        res.json({name: "cognome", message: "Cognome non può essere vuoto"});
        return;
    }
    if (cognome.length != 0) {
        if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cognome)) || cognome.length <= 1) {
            res.json({name: "cognome", message: "Espressione regolare cognome non rispettata"});
            return;
        }
    }

    //validazione della data di nascita
    if (!dataDiNascita) {
        res.json({name: "datadinascita", message: "Data di nascita non può essere vuoto"});
        return;
    }
    if (dataDiNascita.length == 10) {
        if (!(/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.](19|20)\d\d/.test(dataDiNascita))) {
            res.json({name: "dataDiNascita", message: "Espressione regolare datadinascita non rispettata"});
            return;
        }
    }

    //validazione del numero di telefono
    if (!numeroTelefono) {
        res.json({name: "numeroTelefono", message: "NumeroTelefono non può essere vuoto"});
        return;
    }
    if (numeroTelefono.length != 0) {
        if (!(/^[0-9\-\+]{9,15}$/.test(numeroTelefono)) || numeroTelefono.length < 10 || numeroTelefono.length > 15) {
            res.json({name: "numeroTelefono", message: "Espressione regolare numero non rispettata"});
            return;
        }
    }

    //validazione dell'email
    if (!email) {
        res.json({name: "email", message: "Email non può essere vuoto"});
        return;
    }
    if (email.length != 0) {
        if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) || email.length < 8) {
            res.json({name: "email", message: "Espressione regolare email non rispettata"});
            return;
        }
    }

    //validazione dell'indirizzo
    if (!indirizzo) {
        res.json({name: "indirizzo", message: "Indirizzo non può essere vuoto"});
        return;
    }
    if (indirizzo.length != 0) {
        if (!(/^[a-zA-Z][^\n<>!?[\]{}|^~%#:;$%?\0-\cZ]+$/.test(indirizzo)) || indirizzo.length <= 1) {
            res.json({name: "indirizzo", message: "Espressione regolare indirizzo non rispettata"});
            return;
        }
    }

    //validazione della password
    if (!password) {
        res.json({name: "password", message: "Passowrd non può essere vuoto"});
        return;
    }
    if (password.length != 0) {
        if ((password.length <= 8) || (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(password)))) {
            res.json({name: "password", message: "Espressione regolare passowrd non rispettata"});
            return;
        }
    }
    //validazione della conferma della password
    if (!confermapassword) {
        res.json({name: "confermapassword", message: "ConfermaPassword non può essere vuoto"});
        return;
    }
    if (confermapassword != password) {
        res.json({name: "confermapassword", message: "ConfermaPassword è diverso dal campo password"});
        return;
    }

    var passwordHashed = hash.hashPassword(password);
    personale.password = passwordHashed;

    //Prima di inserire si effettua un controllo sull'email (che è unica nel DB)
    //Nel caso non esiste tale email si ritorna un errore
    //Nel caso in cui ,invece, tale email esiste, si prosegue con l'inserimento
    Personale_Model.find({email: email}, function (err, docs) {
        if (docs == 0) {
            personale
                .save(personale)
                .then(data => {
                    res.json({message: true});
                })
                .catch(err => {
                    res.json({
                        message: err.message || "Some error occurred while retriving personale."
                    });
                });
        } else {
            res.json({message: false});
        }

        if (err) {
            res.json({message: "Error retrieving personale with email=" + email});
        }
    })

};


// Prendi tutti i Personali dal Database dato un ruolo
exports.findByRuolo = (req, res) => {

    //variabile di prova da cancellare
    var tipo = "personale adisu"

    if (tipo == "admin") {
        tipo = "personale adisu"
    } else {
        tipo = "operatore mensa"
    }
    //Trova un personale tramite il ruolo(operatore mensa o personale ADISU)
    Personale_Model.find({ruolo: tipo})
        .then(data => {
            if (data == null) {
                res.json({message: false})
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            res.json({message: err.message || "Some error occurred while retrieving personale adisu."});
        });
};


//Rimozione di un Personale data un email ricevuta dal lato Front-End
exports.findByEmailAndRemove = (req, res) => {
    Personale_Model.findOneAndDelete({email: req.body.email})
        .then(data => {
            if (data == null) {
                res.json({message: false})
            } else res.json({message: true})
        })
        .catch(err => {
            res.json({
                message: err.message || "Qualche errore durante la rimozione del personale adisu"
            });
        });
};

/*Metodo per prendere le info del personale (NON VIENE USATO)
exports.findByEmail = (req, res) => {
var email = req.body.email;
  Personale_Model.find({email : email}) //vedere con alex come passare l'email in questo campo
    .then(data => {
      if(data==null){
      res.json({message:false})}
      else res.json(data);
    })
    .catch(err => {
      res.json({
        message:
          err.message || "Some error occurred while retrieving personale adisu."
      });
    }); */