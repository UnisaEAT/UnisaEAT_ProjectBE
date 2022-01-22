const e = require("express");
const db = require("../models");
const Faq_Model = db.model_faq; //FARE IL MODEL DI FAQ

// Create and Save a new - Domanda/Risposta
exports.insertFAQ = (req, res) => {

  if(!req.body.ruolo || !req.body.email) {
    return res.json({message:"Devi aver effettuato l'accesso per accedere a questa pagina!"})
  }

  if(req.body.ruolo != "personale adisu"){
    return res.json({message:"Non puoi accedere a questa pagina!"})
  }

  // Validate request

	let domanda= req.body.domanda
	let risposta= req.body.risposta

// Create Faq
  const faq= new Faq_Model({
    domanda: req.body.domanda,
    risposta: req.body.risposta
  });
  
 //^[A-Z0-9][\w\W]{18,198}\.$ VEDERE STELLINE    Lunghezza < 20 || Lunghezza >200  [errore] (Secondo me non è giusto e basta 0)

 //validazione domanda
  if (!domanda) {
  res.json({ name:"domanda", message: "Domanda non può essere vuoto" });
  return;}

  if (domanda.length <= 17 || domanda.length > 200){ res.json
    ({ name:"domanda", message: "Lunghezza della domanda non corretta" });
    return;}
  if (domanda.length != 0) {
    if (!(/^[A-Z0-9][\w\W]{18,98}\?$/.test(domanda)) ) {
      res.json({name:"domanda", message: "Formato della domanda non corretto (richiede ? oppure una lettera maiuscola iniziale)" });
      return;}
      
    }

  //validazione risposta
   if (!risposta) {
    res.json({ name:"risposta", message: "Risposta non può essere vuoto" });
    return;}

    if (risposta.length <= 17 || risposta.length > 200){ res.json
      ({ name:"risposta", message: "Lunghezza della risposta non corretta" });
      return;}
    if (risposta.length != 0) {
      if (!(/^[A-Z0-9][\w\W]{15,198}\.$/.test(risposta)) ) {
        res.json({name:"risposta", message: "Formato della riposta non corretto (richiede . oppure una lettera maiuscola iniziale)" });
        return;}
        
      }



/* PRIMA DI INSERIRE EFFETTUO UN CONTROLLO SULL'EMAIL CHE E' UNICA NEL DB, NEL CASO ESISTA RITORNO ERRORE NEL CASO IN CUI NON ESISTE PROSEGUO CON L'INSERIMENTO  */
  Faq_Model.find({domanda : domanda},function (err,docs){
    if (docs==0){
      faq.save(faq)
    .then(data => {
      res.json({message: "Inserimento avvenuto con successo."});
    })
    .catch(err => {
      res.json({message: err.message || "Some error occurred while retriving faq."
      });
    });
}
      
    else{
      res.json({ message: false }); }
  
  if(err){
    res.json({ message: "Error retrieving faq with domanda=" + faq});} })
  
}
//Questo era INSERIMENTO



//RIMUOVERE DATA UN EMAIL - utilizziamo la domanda(?)
exports.deleteFAQ = (req, res) => {
  var domanda = req.body.domanda;
  Faq_Model.findOneAndDelete({domanda:domanda}) 
  .then(data => {
    if(data==null){
    res.json({message: false})}
    else res.json({message: true})
  })
  .catch(err => {
    res.json({ message: err.message || "Errore rimozione"
    });
  });
};


// Metodo per prendere le info - Visualizzazione?
exports.selectFAQ = (req, res) => {

  Faq_Model.find({}) 
    .then(data => {
      if(data==null){
      res.json({message:false})}
      else res.json(data);
    })
    .catch(err => {
      res.json({
        message:
          err.message || "Some error occurred while retrieving faq."
      });
    });
};



//Prova modifica
exports.updateFAQ = (req, res) => {

  if(!req.body.ruolo || !req.body.email) {
    return res.json({message:"Devi aver effettuato l'accesso per accedere a questa pagina!"})
  }

  if(req.body.ruolo != "personale adisu"){
    return res.json({message:"Non puoi accedere a questa pagina!"})
  }

var domanda = req.body.domanda;
var newdomanda= req.body.newdomanda;
var newrisposta=req.body.newrisposta;

//validazione domanda

  if (domanda.length != 0) {

    if (newdomanda.length <= 17 || newdomanda.length > 200){ res.json
      ({name: "newdomanda", message: "Lunghezza della domanda non corretta" });
      return;}
    if (!(/^[A-Z0-9][\w\W]{18,98}\?$/.test(newdomanda)) ) {
      res.json({name: "newdomanda",message: "Formato della domanda non corretto (richiede ? oppure la lettera iniziale maiuscola)" });
      return;}
      
    }

  //validazione risposta
   
    
    if (newrisposta.length != 0) {
    
        if (newrisposta.length <= 17 || newrisposta.length > 200){ res.json
        ({ name: "newrisposta",message: "Lunghezza della risposta non corretta" });
        return;}

        if (!(/^[A-Z0-9][\w\W]{15,198}\.$/.test(newrisposta)) ) {
          res.json({name: "newrisposta", message: "Formato della riposta non corretto (richiede . oppure la lettera iniziale maiuscola)" });
          return;}
      }

//Cerco domanda e cambio risposta, cerco risposta e cambio domanda?
  Faq_Model.findOneAndUpdate({domanda : domanda}, {domanda: newdomanda, risposta: newrisposta}) //vedere con alex come passare l'email in questo campo 
    .then(
	function (value){
	res.json({message:"Modifica avvenuta con successo"})
}
)	
    .catch(err => {
      res.json({
        message:
          err.message || "Some error occurred while retrieving faq."
      });
    });


};
