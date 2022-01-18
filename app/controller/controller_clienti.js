var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
const Cliente_Model = db.model_cliente;

// Crea e salva un nuovo Cliente
exports.create = (req, res) => {
    // Validazione request
    if (!req.body.nome) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Crea un nuovo Cliente
    const cliente = new Cliente_Model({
        nome: req.body.nome,
        cognome: req.body.cognome,
        password: null,
        citta: req.body.citta,
        email: req.body.email,
        indirizzo: req.body.indirizzo,
        tesserino: null
    });

    // Salva un Cliente nel database
    cliente
        .save(cliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Prendi tutti i Clienti dal database.
exports.findAll = (req, res) => {


    Cliente_Model.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving clienti."
            });
        });
};


//CLIENTE
const session = require('express-session')
var hash = require('./hash.js')

/**
 * This method updates the external tutor's informations
 * @param {Object} req - The HTTP request
 * @param {Object} res - The HTTP response
 * @returns {Boolean}  - It returns true if the update was successfull, else false
 */


//Selezione di un Cliente
exports.selectCliente = (req, res) => {
    var id = req.session.utente.id
    Cliente_Model.findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving clienti."
            });
        });
};