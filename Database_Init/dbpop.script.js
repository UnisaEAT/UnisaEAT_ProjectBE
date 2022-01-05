var MongoClient = require('mongodb').MongoClient
var hash = require('../app/controller/hash')

// Database URL
const url = 'mongodb://localhost:27017/UnisaEAT_db'
    // Database name
const dbName = 'UnisaEAT_db'

var ins = insert()
ins.then(function(result) {
    process.exit()
})

//database stesso livello di documentation, stesso livello di app copia nella nostra cartella
function insert() {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) reject(err)
            console.log('connessione al server avvenuta!')
            var dbo = db.db(dbName)

            const fs = require('fs')
            const Clientedata = fs.readFileSync(__dirname + '\\JSON\\Cliente.json')
            const personaledata = fs.readFileSync(__dirname + '\\JSON\\Personale.json')
            const admindata = fs.readFileSync(__dirname + '\\JSON\\Admin.json')

            const client = JSON.parse(Clientedata)
            const personale = JSON.parse(personaledata)
            const admin = JSON.parse(admindata)

            for (var i = 0; client[i] != null; i++) {
                client[i].password = hash.hashPassword(client[i].password)
            }

            for (var j = 0; personale[j] != null; j++) {
                personale[j].password = hash.hashPassword(personale[j].password)
            }
            for (var k = 0; admin[k] != null; k++) {
                admin[k].password = hash.hashPassword(admin[k].password)
            }

            dbo.collection('cliente').insertMany(client, function(err, result) {
                if (err) throw err
                console.log('abbiamo inserito  ' + result.insertedCount + ' clienti')


                dbo.collection('personale').insertMany(personale, function(err, result) {
                    if (err) throw err
                    console.log('abbiamo inserito  ' + result.insertedCount + 'che rigiuardano il personale')

                    dbo.collection('admin').insertMany(admin, function(err, result) {
                        if (err) throw err
                        console.log('abbiamo inserito  ' + result.insertedCount + 'admin')

                        if (err) throw err
                        console.log('Succesfully created the collection UnisaEAT_db.')
                        resolve()
                    })
                })
            })

        })
    })


}