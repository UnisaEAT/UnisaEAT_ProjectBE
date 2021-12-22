var MongoClient = require('mongodb').MongoClient
var hash = require('../controller/hash')

// Database URL
const url = 'mongodb://localhost:27017/UnisaEat'
    // Database name
const dbName = 'unisaEat'

var ins = insert()
ins.then(function(result) {
    process.exit()
})


function insert() {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) reject(err)
            console.log('connessione al server avvenuta!')
            var dbo = db.db(dbName)

            const fs = require('fs')
            const Clientedata = fs.readFileSync('Database_Init/JSON/Cliente.json')
            const personaledata = fs.readFileSync('Database_Init/JSON/Personale.json')
            const admindata = fs.readFileSync('Database_Init/JSON/Admin.json')

            const client = JSON.parse(Clientedata)
            const personale = JSON.parse(personaledata)
            const admin = JSON.parse(admindata)

            for (var i = 0; client[i] != null; i++) {
                client[i].Password = hash.hashPassword(client[i].Password)
            }

            for (var j = 0; personale[j] != null; j++) {
                personale[j].Password = hash.hashPassword(personale[j].Password)
            }
            for (var k = 0; admin[k] != null; k++) {
                admin[k].Password = hash.hashPassword(admin[k].Password)
            }

            dbo.collection('Clienti').insertMany(client, function(err, result) {
                if (err) throw err
                console.log('abbiamo inserito  ' + result.insertedCount + 'clienti')


                dbo.collection('Personale').insertMany(personale, function(err, result) {
                    if (err) throw err
                    console.log('abbiamo inserito  ' + result.insertedCount + 'che rigiuardano il personale')

                    dbo.collection('Admin').insertMany(admin, function(err, result) {
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