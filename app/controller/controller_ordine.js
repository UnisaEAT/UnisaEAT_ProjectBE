var ObjectId = require('mongodb').ObjectID;
const db = require("../models");
const Ordine_Model = db.model_ordine;
const Pasto_Model = db.model_pasto;
const Menu_Model = db.model_menu;
const Cliente_Model = db.model_cliente
const Tesserino_Model = db.model_tesserino;
const Notifica_Model = db.model_notifica;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {error:"messaggio di errore"} in caso di errore; {pranzo:arrayPasti, cena:ArrayPasti}
 */
exports.visualizzaPasti = (req, res) => {
  
  let ruolo = req.body.ruolo; 

  //controllo che l'utente loggato sia un cliente
  if(ruolo != "cliente") {
    res.json({error: "Solo i clienti possono accedere a questa pagina"})
    return;
  }

  let dataOdierna = new Date();
  dataOdierna.setUTCHours(0,0,0,0);

  //prendo dal db il menù giornaliero
  Menu_Model.find({data:dataOdierna}, function (err, docs) {
    if(err) throw err;
    
    if(docs.length==0) {
      //non esiste ancora il menù giornaliero
      res.json({error: "Menu' giornaliero non disponibile"})
      return;
    }
    else if(docs.length==1){
      //c'è un solo menù disponibile
      if(docs[0].tipo=="pranzo"){
        res.json({pranzo:docs[0].pasti, cena:null});
        return;
      }
      else {
        res.json({pranzo:null, cena:docs[0].pasti});
        return;
      }
    }
    else {
      //sono disponibili sia il menù di pranzo che di cena
      if(docs[0].tipo=="pranzo"){
        res.json({pranzo:docs[0].pasti, cena:docs[1].pasti});
        return;
      }
      else {
        res.json({pranzo:docs[1].pasti, cena:docs[0].pasti});
        return;
      }
    }
  })
}

/**
 * Controlla se il cliente loggato abbia effettuato degli ordini nella giornata odierna
 *  
 *  @return {pranzo:boolean, cena:boolean}
 */
exports.hasOrdini = (req, res) => {

  /*
    Se l'utente loggato non è un cliente l'accesso alla pagina viene negato, altrimenti
    Prendo dalla sessione l'email dell'utente loggato, lo cerco nel db per ricavarne l'id
    Cerco tutti gli ordini che hanno come acquirente l'id dell'utente loggato e la data odierna
    Se non esiste nessun ordine allora pranzo e cena sono settati a false
    Se siste un solo ordine si controlla se è per pranzo o cena
    Se ne esistono due sia pranzo che cena sono true
  */

  let email = req.body.email;
  let ruolo = req.body.ruolo;

  if (ruolo != "cliente") {
    return res.json({error: "Non autorizzato"})
  }

  Cliente_Model.find({email:email}, function(err, docs) {
    if (err) throw err;
    let idCliente = docs[0]._id;
    let dataOdierna = new Date();
    dataOdierna.setUTCHours(0,0,0,0);

    Ordine_Model.find({acquirente:idCliente, dataOrdine:dataOdierna}, function(err, docs) {
      if (err) throw err;
      if(docs.length == 0) {
        //non esiste nessun ordine
        return res.json({pranzo:false, cena:false})
      }
      else if(docs.length == 1) {
        //esiste un solo ordine
        if(docs[0].boolPranzo){
          return res.json({pranzo:true, cena:false})
        }
        else {
          return res.json({pranzo:false, cena:true})
        }
      }
      else {
        return res.json({pranzo:true, cena:true})
      }
    })
  })
}

exports.create = (req, res) => {

  let emailSessione = req.body.email;
  let prezzoOrdine = req.body.prezzo;
  let boolPranzo = req.body.boolPranzo;
  let arrayIdPasti = req.body.idPasti;
  console.log(arrayIdPasti)

  Cliente_Model.find({email:emailSessione}, function (err, docs) {
    if (err) throw err;
    let idTesserino = docs[0].tesserino;
    let idCliente = docs[0]._id
    if(idTesserino == null) {
      return res.json({error: "Non possiedi un tesserino"})
    }

    Tesserino_Model.findById(idTesserino, function (err, docs) {
      if (err) throw err;
      let saldo = docs.saldo
      if (saldo<prezzoOrdine) {
        return res.json({error:"Saldo non sufficiente"})
      }
      
      //creo l'ordine e aggiorno il saldo del tesserino
      let dataOdierna = new Date();
      dataOdierna.setUTCHours(0,0,0,0);

      //trasformo gli id dei pasti in objectID
      arrayIdPasti.forEach(function (el, index, arr) {
        arr[index] = new ObjectId(el);
      })

      const ordine = new Ordine_Model ({
        prezzo: prezzoOrdine,
        dataOrdine: dataOdierna,
        boolPranzo: boolPranzo,
        listaPasti: arrayIdPasti,
        acquirente: new ObjectId(idCliente)
      });

      ordine.save(ordine).then(data => {
        Tesserino_Model.findById(idTesserino, function(err, docs) {
          if (err) throw err;
          let nuovoSaldo = docs.saldo - prezzoOrdine;
          Tesserino_Model.findByIdAndUpdate(idTesserino, {saldo:nuovoSaldo}, function(err, docs) {
            if (err) throw err;

            var notifica=new Notifica_Model({
              titolo:"Ordinazione del pasto avvenuta!",
              testo:"La richiesta del pasto da parte di "+emailSessione+" è avvenuta con successo!",
              reciverEmail:emailSessione,
              tipo:"Notifica pasto",
              visualizzazione:true
            })

            //salva la notifica nel database
            notifica
            .save(notifica)
            .then(data=>{
                console.log(data)
                return res.json(true);
            })

          })
        })
      })
      .catch(err => {
        throw (err)
      });
    })

  })
  
};

// Retrieve all Ordini from the database.
// restituire tutti gli ordini del cliente, ma invece dell'id del pasto ci va messo l'intero oggetto pasto
exports.getOrdiniByCliente = (req, res) => {

  const ruolo = req.body.ruolo;
  const email = req.body.email;

  if(ruolo != "cliente") {
    return res.json({error:"Non autorizzato"})
  }

  Cliente_Model.find({email:email}, function(err, docs) {
    if (err) throw err;
    let idCliente = new ObjectId(docs[0]._id);

    Ordine_Model.find({acquirente:idCliente}).sort({dataOrdine:-1}).exec(function(err, docs) {
      if (err) throw err;

      if(docs.length == 0) {
        return res.json({error: "Nessun ordine effettuato"})
      }

      const cloneDocs = JSON.parse(JSON.stringify(docs)) //array ordine clonato, senza riferimenti
      
      Pasto_Model.find({}, function (err, docs) {
        if (err) throw err;

        //sostituisco gli id dei pasti con gli oggetti pasti veri e propri
        cloneDocs.forEach((element, index, array) => {
          let date = new Date(array[index].dataOrdine);
          let dataToString = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
          array[index].dataOrdine = dataToString
          
          element.listaPasti.forEach((el, index, arr) => {
          let result = docs.find(function (pasto) {return pasto._id == el})
          arr[index] = JSON.parse(JSON.stringify(result))
          })
        });

        return res.json(cloneDocs);
      })
    })
  })
};