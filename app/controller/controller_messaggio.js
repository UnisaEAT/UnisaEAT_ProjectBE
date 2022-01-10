var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
const Messaggio_Model = db.model_messaggio;

// crea un nuovo messaggio
// l'fe mi passa: l'id della conversazione, il sender {email, ruolo}, il testo, la data (new Date())
exports.create = (req, res) => {
    const message = req.body;


    if(!message) {
        return res.json({"error":"Nessun messaggio inviato"})
    }

    const messaggio = new Messaggio_Model({
        conversazioneId : message.conversazioneId,
        sender: message.sender,
        testo: message.testo,
        dataInvio: message.dataInvio
    })

    messaggio.save(messaggio).then(data =>{
        return res.json(data);
    })
    .catch(err => {
        return res.json({error:"Some error occurred while creating messaggio."});
    });
}

exports.deleteMessaggio = (req, res) => {
    const idMessaggio = req.body.idMessaggio;

    Messaggio_Model.findOneAndDelete({_id:idMessaggio}, function(err, docs) {
        if(err) throw err;
        return res.json(true);
    })
}

exports.modifyMessaggio = (req, res) => {
    const idMessaggio = req.body.idMessaggio;
    const nuovoTesto = req.body.nuovoTesto;

    Messaggio_Model.findByIdAndUpdate({_id:idMessaggio}, {testo:nuovoTesto}, function(err, docs) {
        if (err) throw err;
        return res.json(true);
    })
}

exports.getAllConversationMessages = (req, res) =>{
    const conversazioneId = req.body.conversazioneId;

    Messaggio_Model.find({conversazioneId:conversazioneId}, function(err, docs){
        if (err) throw err;
        return res.json(docs);
    })

}