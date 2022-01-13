const e = require("express");
const db = require("../models");
const Ticket_Model = db.model_ticket; //FARE IL MODEL 

// Create and Save a new

exports.insert = (req, res) => {
  // Validate request
  if (!req.body.titolo) {
    res.json({ name:"titolo", message: "Il titolo non può essere vuoto!" });
    return;
  }
  if (!req.body.problema) {
    res.json({ name:"problema", message: "Il problema non può essere vuoto!" });
    return;
  }
	let titolo= req.body.titolo
	let problema= req.body.problema
  let dat= new Date()
  dat.setUTCHours(0,0,0,0)
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
    if (!(/^[A-Z0-9][\w\W]{19,99}\.$/.test(titolo)) || titolo.length <= 20 || titolo.length > 100) {
      res.json({ name:"titolo", message: "Espressione regolare non rispettata" });
      return;}
    }

   if (!problema) {
    res.json({ name:"problema", message: "Non può essere vuoto" });
    return;}
    if (problema.length != 0) {
      if (!(/^[A-Z0-9][\w\W]{19,699}\.$/.test(problema)) || problema.length <= 20 || problema.length > 700) {
        res.json({name:"problema", message: "Espressione regolare non rispettata" });
        return;}
      }



/* PRIMA DI INSERIRE EFFETTUO UN CONTROLLO SULL'EMAIL CHE E' UNICA NEL DB, NEL CASO ESISTA RITORNO ERRORE NEL CASO IN CUI NON ESISTE PROSEGUO CON L'INSERIMENTO  */
  Ticket_Model.find({titolo : titolo},function (err,docs){
    if (docs==0){
      ticket.save(ticket)
    .then(data => {
      res.json({message: true});
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

Ticket_Model.find({email:mail})
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
  var titolo = req.body.titolo
  var soluzione= req.body.soluzione
  if (!soluzione) {
    res.json({ name:"soluzione", message: "Non può essere vuoto" });
    return;}
     if (soluzione.length != 0) {
      if (!(/^[A-Z0-9][\w\W]{19,699}\.$/.test(soluzione)) || soluzione.length <= 20 || soluzione.length > 700) {
        res.json({ name:"soluzione", message: "Espressione regolare non rispettata" });
        return;}
      }

 Ticket_Model.findOneAndUpdate({titolo : titolo}, {soluzione: soluzione})
    .then(
	function (value){
	res.json({message:true})
}
)	
    .catch(err => {
      res.json({
        message:
          err.message || "Some error occurred while retrieving ticket."
      });
    });


};
