const db = require("../models");
const Personale_Model = db.model_personale;

// Create and Save a new Personale
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  let nome = req.body.nome;
  let cognome = req.body.cognome;
  let password = req.body.password;
  let email = req.body.email;
  let numeroTelefono = req.body.numeroTelefono;
  let dataDiNascita = req.body.dataDiNascita;
  let ruolo = null;
  let disponibilita = false;
  let indirizzo = req.body.indirizzo;
  let confermapassword = req.body.confermapassword;
  // Create a Personale
  const personale = new Personale_Model ({
    nome: req.body.nome,
    cognome: req.body.cognome,
    password: req.body.password,
    email: req.body.email,
    numeroTelefono: req.body.numeroTelefono,
    dataDiNascita: req.body.dataDiNascita,
    ruolo: null,
    disponibilita: false,
    indirizzo: req.body.indirizzo
  });
  
   
  //validazione del nome
  if (!nome) {
  res.status(400).send({ message: "Nome can not be empty!" });
  return;}
   if (nome.length != 0) {
    if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(nome)) || nome.length <= 1) {
      res.status(400).send({ message: "Espressione regolare nome non rispettata" });
      return;}
    }

   //validazione del cognome
   if (!cognome) {
    res.status(400).send({ message: "Cognome can not be empty!" });
    return;}
    if (cognome.length != 0) {
      if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cognome)) || cognome.length <= 1) {
        res.status(400).send({ message: "Espressione regolare cognome non rispettata" });
        return;}
      }

   //validazione della data di nascita
   if (!dataDiNascita) {
    res.status(400).send({ message: "dataDiNascita can not be empty!" });
    return;}
    if (dataDiNascita.length == 10) {
      if (!(/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.](19|20)\d\d/.test(dataDiNascita))) {
        res.status(400).send({ message: "Espressione regolare datadinascita non rispettata" });
        return;}
      }

   //validazione del numero di telefono
   if (!numeroTelefono) {
    res.status(400).send({ message: "NumeroTelefono can not be empty!" });
    return;}
     if (numeroTelefono.length != 0) {
        if (!(/^[0-9\-\+]{9,15}$/.test(numeroTelefono)) || numeroTelefono.length <10 || numeroTelefono.length >15) {
        res.status(400).send({ message: "Espressione regolare numero non rispettata" });
        return;}}

    //validazione dell'email    
    if (!email) {
    res.status(400).send({ message: "Email can not be empty!" });
    return;}
    if (email.length != 0) {
      if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) || email.length <8 ) {
        res.status(400).send({ message: "Espressione regolare email non rispettata" });
        return;}}
    
    //validazione dell'indirizzo
    if (!indirizzo) {
      res.status(400).send({ message: "Indirizzo can not be empty!" });
      return;}
      if (indirizzo.length != 0) {
        if (!(/^[a-zA-Z][^\n<>!?[\]{}|^~%#:;$%?\0-\cZ]+$/.test(indirizzo)) || indirizzo.length <= 1) {
          res.status(400).send({ message: "Espressione regolare indirizzo non rispettata" });
          return;}}
      
    //validazione della password
    if (!password) {
      res.status(400).send({ message: "Passowrd can not be empty!" });
      return;}
      if(password.length != 0){
        if ((password.length <= 8) || (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(password)))) {
          res.status(400).send({ message: "Espressione regolare passowrd non rispettata" });
          return;}
        }
    //validazione della conferma della password
    if (!confermapassword) {
      res.status(400).send({ message: "ConfermaPassword can not be empty!" });
      return;} 
      if (confermapassword != password) {
        res.status(400).send({ message: "Espressione regolare confermapassword non rispettata" });
        return;}
      

  // Save Personale in the database
  personale
    .save(personale)
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

// Retrieve all Personale from the database.
exports.findAll = (req, res) => {
  

  Personale_Model.find({})
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