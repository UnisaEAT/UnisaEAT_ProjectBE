const db = require("../models");
const Conversazione_Model = db.model_conversazione;

// crea una nuova conversazione
// devono essere passati dal fe la mail ed il ruolo di sender e receiver
exports.create = (req, res) => {

    const sender = req.body.sender;
    const receiver = req.body.receiver;

    if (sender && receiver) {
        
        const conversazione = new Conversazione_Model({
            membri: [sender, receiver]
        })

        conversazione.save(conversazione).then(data => {
            return res.json(true);
        })
        .catch(err => {
            return res.json({error:"Some error occurred while creating conversazione."});
        });

        // trovo l'id delle mail di sender e receiver
        //IN QUESTO CODICE VIENE SALVATO L'ID DEGLI UTENTI DELLA CONVERSAZIONE
        //poiché in sessione lato fe viene salvata la mail, per semplicità è meglio conservare le mail
        /*if(sender.ruolo == "cliente"){
            Cliente_Model.find({email:sender.email}, function(err, docs) {
                if (err) throw err;
                let senderObj = {id: docs[0]._id, ruolo:"cliente"};

                Personale_Model.find({email:receiver.email}, function(err, docs) {
                    if (err) throw err;
                    let receiverObj = {id: docs[0]._id, ruolo:"personale adisu"};

                    const conversazione = new Conversazione_Model({
                        membri: [senderObj, receiverObj]
                    })

                    conversazione.save(conversazione).then(data => {
                        res.json(true);
                    })
                    .catch(err => {
                        res.json({error:"Some error occurred while retriving personale."});
                    });

                })

            })
        }
        else {
            Cliente_Model.find({email:receiver.email}, function(err, docs) {
                if (err) throw err;
                let receiverObj = {id: docs[0]._id, ruolo: "cliente"};

                Personale_Model.find({email:sender.email}, function(err, docs) {
                    if (err) throw err;
                    let senderObj = {id: docs[0]._id, ruolo: "personale adisu"};

                    const conversazione = new Conversazione_Model({
                        membri: [senderObj, receiverObj]
                    })

                    conversazione.save(conversazione).then(data => {
                        res.json(true);
                    })
                    .catch(err => {
                        res.json({error:"Some error occurred while retriving personale."});
                    });
                    
                })

            })
        }*/

    }
    else {
        return res.json({error:"Sender o Receiver vuoti"})
    }
}

//restituisce tutte le conversazioni di un utente
//l'fe passa l'utente {email, ruolo} di cui vuole ottenere tutte le conversazioni
exports.getConversazioni = (req, res) => {

    const user = req.body.user;

    if(!user) {
        return res.json({"error":"Nessun utente loggato"});
    }

    Conversazione_Model.find({'membri': {$in:[user]}}, function (err, docs) {
        if (err) throw err;
        res.json(docs);
    })
}

// restituisce una conversazione tra due utenti
// l'fe passa gli utenti {email, ruolo} di cui vuole ottenere la conversazione
exports.getConversazione = (req, res) => {
    const user1 = req.body.user1;
    const user2 = req.body.user2;

    if(!user1 && !user2) {
        return res.json({"error":"Specificare gli utenti di cui si vuole ottenere la conversazione"});
    }

    Conversazione_Model.find({'membri': {$all :[user1, user2]}}, function (err, docs) {
        if(err) throw err;
        res.json(docs);
    })
}