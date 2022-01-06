const db = require("../models");
const Admin_Model = db.model_admin;

// Crea e salva un nuovo Admin
exports.create = (req, res) => {
    // Validate request
    if (!req.body.nome) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Crea un admin
    const admin = new Admin_Model({
        nome: req.body.nome,
        cognome: req.body.cognome,
        password: null,
        email: req.body.email
    });

    // Salva un Admin sul database
    admin
        .save(admin)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Prendi tutti gli Admin dal database.
exports.findAll = (req, res) => {


    Admin_Model.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving clienti."
            });
        });

};