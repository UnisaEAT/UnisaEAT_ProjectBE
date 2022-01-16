module.exports = app => {
    const messaggio = require("../controller/controller_messaggio");

    var router = require("express").Router();

    // Crea un nuovo messaggio
    router.post("/create", messaggio.create);

    //restituisce tutti i messaggi di una conversazione
    router.post("/getMessages", messaggio.getAllConversationMessages)

    //elimina un messaggio
    router.post("/deleteMessage", messaggio.deleteMessaggio);

    //modifica un messaggio
    router.post("/modifyMessage", messaggio.modifyMessaggio);

    app.use('/api/messaggio', router);

};