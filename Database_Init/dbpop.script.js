var MongoClient = require('mongodb').MongoClient
var hash = require('../app/controller/hash')
var ObjectId = require('mongodb').ObjectID;

// Database URL
const url = 'mongodb://localhost:27017/UnisaEAT_db'
// Database name

const dbName = 'UnisaEAT_db'

var ins = insert()
ins.then(function (result) {
    process.exit()
})

//Funzione che permette di inserire script JSON di attori specifici all'interno del database via riga di comando
//Passo 1-->Spostarsi sulla cartella Database_Init presente all'interno della cartella UnisaEAT_ProjectBE
//Passo 2-->Lanciare il comando "node .\dbpop.script.js" che eseguira il codice scelto.
function insert() {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function (err, db) {
            if (err) reject(err)
            console.log('Connessione al server avvenuta!')
            var dbo = db.db(dbName)

            const fs = require('fs')
            const clienteData = fs.readFileSync(__dirname + '\\JSON\\Cliente.json')
            const personaledata = fs.readFileSync(__dirname + '\\JSON\\Personale.json')
            const adminData = fs.readFileSync(__dirname + '\\JSON\\Admin.json')
            const menuData = fs.readFileSync(__dirname + '\\JSON\\Menu.json')
            const ordineData = fs.readFileSync(__dirname + '\\JSON\\Ordine.json')
            const pastoData = fs.readFileSync(__dirname + '\\JSON\\Pasto.json')
            const tesserinoData = fs.readFileSync(__dirname + '\\JSON\\Tesserino.json')

            const client = JSON.parse(clienteData)
            const personale = JSON.parse(personaledata)
            const admin = JSON.parse(adminData)
            const menu = JSON.parse(menuData)
            const ordine = JSON.parse(ordineData);
            const pasto = JSON.parse(pastoData);
            const tesserino = JSON.parse(tesserinoData);

            for (var i = 0; client[i] != null; i++) {

                if(client[i].hasOwnProperty("_id")){
                    client[i]._id = new ObjectId(client[i]._id.$oid)
                }

                if(client[i].tesserino!=null){
                    client[i].tesserino = new ObjectId(client[i].tesserino.$oid)
                }

                client[i].password = hash.hashPassword(client[i].password)
            }

            for (var j = 0; personale[j] != null; j++) {
                personale[j].password = hash.hashPassword(personale[j].password)
            }

            for (var k = 0; admin[k] != null; k++) {
                admin[k].password = hash.hashPassword(admin[k].password)
            }

            for (var i = 0; menu[i] != null; i++) {
                menu[i]._id = new ObjectId(menu[i]._id.$oid)
                menu[i].data = new Date(menu[i].data.$date)

                menu[i].pasti.forEach(function(el, index, arr) {
                    arr[index].id = new ObjectId(arr[index].id.$oid)
                })
            }

            for (var i = 0; ordine[i] != null; i++) {
                ordine[i]._id = new ObjectId(ordine[i]._id.$oid);
                ordine[i].dataOrdine = new Date (ordine[i].dataOrdine.$date);
                ordine[i].acquirente = new ObjectId (ordine[i].acquirente.$oid);
        
                ordine[i].listaPasti.forEach(function (el, index, arr) {
                    arr[index] = new ObjectId (el.$oid);
                })
            }

            for (var i = 0; pasto[i] != null; i++) {
                pasto[i]._id = new ObjectId(pasto[i]._id.$oid);
            }

            for (var i = 0; tesserino[i] != null; i++) {
                tesserino[i]._id = new ObjectId(tesserino[i]._id.$oid);
                tesserino[i].dataScadenza = new Date (tesserino[i].dataScadenza.$date)
            }

            dbo.collection('cliente').insertMany(client, function (err, result) {
                if (err) throw err
                console.log('abbiamo inserito ' + result.insertedCount + ' clienti')

                dbo.collection('personale').insertMany(personale, function (err, result) {
                    if (err) throw err
                    console.log('abbiamo inserito ' + result.insertedCount + ' membri del personale')

                    dbo.collection('admin').insertMany(admin, function (err, result) {
                        if (err) throw err
                        console.log('abbiamo inserito ' + result.insertedCount + ' admin')

                        dbo.collection('menu').insertMany(menu, function (err, result) {
                            if (err) throw err
                            console.log('abbiamo inserito ' + result.insertedCount + ' menu')

                            dbo.collection('ordine').insertMany(ordine, function(err, result) {
                                if (err) throw err;
                                console.log('abbiamo inserito ' + result.insertedCount + ' ordini')

                                dbo.collection('pasto').insertMany(pasto, function(err, result) {
                                    if (err) throw err;
                                    console.log('abbiamo inserito ' + result.insertedCount + ' pasti')

                                    dbo.collection('tesserino').insertMany(tesserino, function (err, result) {
                                        if (err) throw err;
                                        console.log('abbiamo inserito ' + result.insertedCount + ' tesserini')
                                        
                                        console.log('Succesfully created the collection UnisaEAT_db.')
                                        resolve()
                                    })
                                    
                                })

                                
                            })

                            
                        })
                        
                    })
                })
            })

        })
    })


}