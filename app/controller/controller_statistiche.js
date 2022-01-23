const db = require('../models')
const Statistiche_Model = db.model_statistiche
const Pasto_Model = db.model_pasto

/*
  Il calcolo delle statistiche avviene settimanalmente;
  Quando si effettua il calcolo delle statistiche il numero di ordinazioni dei pasti viene resettato a 0;
  La statistica conterrà la data di inizio e fine, ossia la settimana del calcolo;
  Conterrà un array in cui per ogni pasto ci sarà il numero di ordinazioni effettuate nella settimana.
*/
/*
exports.calcoloStatistiche = function () {
  return new Promise(function (resolve, reject) {
    let inizioStatistica = new Date();
    inizioStatistica.setDate(inizioStatistica.getDate() - 6);

    Pasto_Model.find({}, function (err, docs) {
      if (err)
        reject(err);
      //ordino l'array dal pasto più ordinato a quello meno ordinato
      docs.sort(function (a, b) { return b.numeroOrdinazioni - a.numeroOrdinazioni; });
      let pastiEOrdinazioni = [];

      docs.forEach(function (value, index, array) {
        pastiEOrdinazioni[index] = { "id": value._id, "ordinazioni": value.numeroOrdinazioni };
      });

      const statistica = new Statistiche_Model({
        dataInizio: inizioStatistica,
        dataFine: new Date(),
        pastiEOrdinazioni: pastiEOrdinazioni,
      });

      statistica
        .save(statistica)
        .then(data => {
          //bisogna resettare il numero di ordinazioni per ogni pasto
          Pasto_Model.updateMany({}, { "numeroOrdinazioni": 0 }, function (err, docs) {
            if (err)
              throw err;

          });
          resolve(statistica);
        })
        .catch(err => {
          reject(err);
        });

    });

  });

}
*/

// Restituisce tutte le statistiche
// invece dell'id c'è il campo nome. La data è nel seguente formato: gg/mm/aaaa
exports.findAll = (req, res) => {
  const ruolo = req.body.ruolo

  if (ruolo != 'operatore mensa') {
    return res.json({ message: 'Accesso negato' })
  }

  Statistiche_Model.find({})
    .then(data => {
      const cloneData = JSON.parse(JSON.stringify(data)) // array statistiche clonato, senza riferimenti

      Pasto_Model.find({}, 'nome', function (err, docs) {
        if (err) throw err
        // in docs ho tutti i nomi dei pasti e il loro id

        // sostituisco l'id dei pasti con i loro nomi, per permettere al fe di stampare i nomi
        // sostituisco la data con una stringa data

        let i
        for (i = 0; i < cloneData.length; i++) {
          // sostituisco le date con stringhe
          let date = new Date(cloneData[i].dataInizio)
          let dataToString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
          cloneData[i].dataInizio = dataToString

          date = new Date(cloneData[i].dataFine)
          dataToString = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
          cloneData[i].dataFine = dataToString

          // sostituisco gli id con i nomi. Creo un campo nome ed elimino il campo id
          cloneData[i].pastiEOrdinazioni.forEach(function (item, index, array) {
            let nomePasto = docs.find(function (pasto) { return pasto.id === item.id })
            nomePasto = nomePasto.nome
            item.nome = nomePasto
            delete item.id
          })
        }
        return res.json(cloneData)
      })
    })
    .catch(err => {
      res.json(err)
    })
}
