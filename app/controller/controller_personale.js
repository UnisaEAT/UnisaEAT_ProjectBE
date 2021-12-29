const e = require("express");
const db = require("../models");
const Personale_Model = db.model_personale;
var hash = require('./hash.js');

// Create and Save a new Personale
exports.insert = (req, res) => {
  // Validate request
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
    ruolo: null, //AGGIUNGERE LA SESSIONE PER IL RUOLO
    disponibilita: false,
    indirizzo: req.body.indirizzo
  });
  
   
  //validazione del nome
  if (!nome) {
  res.json({ message: "Nome non può essere vuoto" });
  return;}
   if (nome.length != 0) {
    if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(nome)) || nome.length <= 1) {
      res.json({ message: "Espressione regolare nome non rispettata" });
      return;}
    }

   //validazione del cognome
   if (!cognome) {
    res.json({ message: "Cognome non può essere vuoto" });
    return;}
    if (cognome.length != 0) {
      if (!(/^[a-zA-Z][^\n0-9<>!?[\]{}|\\\/^~%#:;,$%?\0-\cZ]+$/.test(cognome)) || cognome.length <= 1) {
        res.json({ message: "Espressione regolare cognome non rispettata" });
        return;}
      }

   //validazione della data di nascita
   if (!dataDiNascita) {
    res.json({ message: "Data di nascita non può essere vuoto" });
    return;}
    if (dataDiNascita.length == 10) {
      if (!(/^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[-\/.](19|20)\d\d/.test(dataDiNascita))) {
        res.json({ message: "Espressione regolare datadinascita non rispettata" });
        return;}
      }

   //validazione del numero di telefono
   if (!numeroTelefono) {
    res.json({ message: "NumeroTelefono non può essere vuoto" });
    return;}
     if (numeroTelefono.length != 0) {
        if (!(/^[0-9\-\+]{9,15}$/.test(numeroTelefono)) || numeroTelefono.length <10 || numeroTelefono.length >15) {
        res.json({ message: "Espressione regolare numero non rispettata" });
        return;}}

    //validazione dell'email    
    if (!email) {
    res.json({ message: "Email non può essere vuoto" });
    return;}
    if (email.length != 0) {
      if (!(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) || email.length <8 ) {
        res.json({ message: "Espressione regolare email non rispettata" });
        return;}}
    
    //validazione dell'indirizzo
    if (!indirizzo) {
      res.json({ message: "Indirizzo non può essere vuoto" });
      return;}
      if (indirizzo.length != 0) {
        if (!(/^[a-zA-Z][^\n<>!?[\]{}|^~%#:;$%?\0-\cZ]+$/.test(indirizzo)) || indirizzo.length <= 1) {
          res.json({ message: "Espressione regolare indirizzo non rispettata" });
          return;}}
      
    //validazione della password
    if (!password) {
      res.json({ message: "Passowrd non può essere vuoto" });
      return;}
      if(password.length != 0){
        if ((password.length <= 8) || (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/.test(password)))) {
          res.json({ message: "Espressione regolare passowrd non rispettata" });
          return;}
        }
    //validazione della conferma della password
    if (!confermapassword) {
      res.json({ message: "ConfermaPassword non può essere vuoto" });
      return;} 
      if (confermapassword != password) {
        res.json({ message: "Espressione regolare confermapassword non rispettata" });
        return;}
 
        var passwordHashed = hash.hashPassword(password);
        personale.password = passwordHashed;
  /* PRIMA DI INSERIRE EFFETTUO UN CONTROLLO SULL'EMAIL CHE E' UNICA NEL DB, NEL CASO ESISTA RITORNO ERRORE NEL CASO IN CUI NON ESISTE PROSEGUO CON L'INSERIMENTO  */
  Personale_Model.find({email : email},function (err,docs){
    if (docs==0){
      personale
.save(personale)
.then(data => {
  res.json({message: true});
})
.catch(err => {
  res.json({message: err.message || "Some error occurred while retriving personale."
  });
});
}
      
    else{
      res.json({ message: false }); }
  
  if(err){
    res.json({ message: "Error retrieving personale with email=" + email });} })
  
};


// Retrieve all Personale from the database.
exports.findByRuolo = (req, res) => {
  

  Personale_Model.find({ruolo : 'personale adisu'/*qua aggiungere il campo per la sessione ruolo */})
    .then(data => {
      if(data==null){
        res.json({message:false})
      }
      else{
      res.json(data);}
    })
    .catch(err => {
      res.json({message: err.message || "Some error occurred while retrieving personale adisu."});
    });
};


//RIMUOVERE UN PERSONALE ADISU DATA UN EMAIL
exports.findByEmailAndRemove = (req, res) => {
  var email = req.body.email;
  Personale_Model.findOneAndDelete({email:email}) //vedere con alex come passare l'email in questo campo
  .then(data => {
    if(data==null){
    res.json({message: false})}
    else res.json({message: true})
  })
  .catch(err => {
    res.json({ message: err.message || "Qualche errore durante la rimozione del personale adisu"
    });
  });
};

// Metodo per prendere le info del personale
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
    });
};