const e = require("express");
const db = require("../models");
const Notifiche_Model = db.model_notifica;

//VISUALIZZARE LA LISTA DELLE NOTIFICHE 
exports.visualizzaLista =(req,res) =>{
    Notifiche_Model.find({reciverEmail:req.body.email})
    .then(data=>{
        if(data){
            res.json(data);
            return;
                }
    })
   .catch(err =>{
       res.json("Some error while retriving notifiche");
       return;
   }) 
};

//METODO PER LA RIMOZIONE DI UNA NOTIFICA DALLA LISTA DELLE NOTIFICHE
exports.rimuoviNotifica =(req,res) =>{
   Notifiche_Model.findByIdAndRemove({_id:req.body.idnot})
    .then(data =>{
        res.json("Notifica eliminata con successo");
        return;
    })
    .catch(err =>{
        res.json("Some error while deleting notifica");
        return;
    })
};

exports.salvaNotifica=(req,res) =>{
   var not=new Notifiche_Model({
       titolo:"",//il titolo che inserirò nelle opportune classi
       testo:"",//testo opportuno
       reciverEmail:"",//email di chi riceverà la notifica
       tipo:"",//tipo?
       visualizzazione:""//capire a che serve 
   });

   not.save(not).then(data=>{res.json("op riuscita")})
}