const e = require("express");
const db = require("../models");
const Ticket_Model = db.model_ticket; //FARE IL MODEL 
const Notifica_Model=db.model_notifica;
// Create and Save a new

exports.insert = (req, res) => {
  // Validate request

  if(!req.body.ruolo || !req.body.email){
    return res.json({message: "Devi effettuare il login per inserire un ticket!"})
  }

  if(req.body.ruolo == "admin"){
    return res.json({message:"Non puoi compilare un ticket!"})
  }

	let titolo= req.body.titolo
	let problema= req.body.problema
  let dat= new Date()
  let mail= req.body.email

// Create 
  const ticket= new Ticket_Model({
    titolo: req.body.titolo,
    problema: req.body.problema,
    soluzione: null,
    date: dat,
    email:mail
  });
  

  if (!titolo) {
  res.json({ name:"titolo", message: "Non può essere vuoto" });
  return;}
   if (titolo.length != 0) {
    if ((titolo.length <= 20 || titolo.length > 100)) {
      res.json({ name:"titolo", message: "Errore lunghezza titolo" });
      return;}
    
    if (!(/^[A-Z0-9][\w\W]{19,99}\.$/.test(titolo))) {
    res.json({ name:"titolo", message: "Errore formato titolo (richiede .)" });
    return;}
   
    }

   if (!problema) {
    res.json({ name:"problema", message: "Non può essere vuoto" });
    return;}
    if (problema.length != 0) {
      if ((problema.length <= 20 || problema.length > 700)) {
        res.json({name:"problema", message: "Errore lunghezza problema" });
       return;}
      
      if (!(/^[A-Z0-9][\w\W]{19,699}\.$/.test(problema))) {
      res.json({name:"problema", message: "Errore formato problema (richiede .)" });
      return;}
      
      }



/* PRIMA DI INSERIRE EFFETTUO UN CONTROLLO SULL'EMAIL CHE E' UNICA NEL DB, NEL CASO ESISTA RITORNO ERRORE NEL CASO IN CUI NON ESISTE PROSEGUO CON L'INSERIMENTO  */
  Ticket_Model.find({titolo : titolo},function (err,docs){
    if (docs==0){
      ticket.save(ticket)
    .then(data => {
      res.json({message: "Compilazione del ticket avvenuta con successo"});
    })
    .catch(err => {
      res.json({message: err.message || "Some error occurred while retriving ticket."
      });
    });
}
      
    else{
      res.json({ message: false }); }
  
  if(err){
    res.json({ message: "Error retrieving ticket=" + ticket});} })
  
}
//Questo era INSERIMENTO


// Metodo per prendere le info - Visualizzazione? -- Controllo per Email
exports.select = (req, res) => {

Ticket_Model.find({soluzione: null })
    .then(data => {
      if(data==null){
      res.json({message:false})}
      else res.json(data);
    })
    .catch(err => {
      res.json({
        message:
          err.message || "Some error occurred while retrieving ticket by email."
      });
    });}
;


exports.utente = (req, res) => {

  Ticket_Model.find({email: req.session.email })
      .then(data => {
        if(data==null){
        res.json({message:false})}
        else res.json(data);
      })
      .catch(err => {
        res.json({
          message:
            err.message || "Some error occurred while retrieving ticket by email."
        });
      });}
  ;
  

//Prova modifica
exports.update = (req, res) => {

  if(!req.body.ruolo || !req.body.email){
    return res.json({message: "Devi effettuare il login per inserire un ticket!"})
  }

  if(req.body.ruolo != "admin"){
    return res.json({message:"Non puoi risolvere un ticket!"})
  }

  let mail=req.body.email
  var titolo = req.body.titolo
  var soluzione= req.body.soluzione
  if (!soluzione) {
    res.json({ name:"soluzione", message: "Non può essere vuoto" });
    return;}
     if (soluzione.length != 0) {
     
      
      if ((soluzione.length <= 20 || soluzione.length > 700)) {
        res.json({ name:"soluzione", message: "Errore lunghezza soluzione" });
        return;}

        if (!(/^[A-Z0-9][\w\W]{19,699}\.$/.test(soluzione))){
          res.json({ name:"soluzione", message: "Errore formato soluzione" });
            return;}
      }

 Ticket_Model.findOneAndUpdate({titolo : titolo}, {soluzione: soluzione})
    .then(
	function (value){
	  var notifica=new Notifica_Model({
      titolo:"Il tuo ticket è stato risolto!",
      testo:"Il ticket inviato da "+ mail+" è stato risolto!",
      receiverEmail:mail,
      tipo:"Notifica Ticket",
      visualizzazione:true
  })
  notifica
  .save(notifica)
  .then(data=>{
      res.json({message:"Soluzione del ticket avvenuta con successo"})
  })
  .catch(err=>{
      res.json({message:"Some error occurred while retrieving notifica"})
  })
}
)	
    .catch(err => {
      res.json({
        message:
          err.message || "Some error occurred while retrieving ticket."
      });
    });
  

};
