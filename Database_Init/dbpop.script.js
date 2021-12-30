var MongoClient = require('mongodb').MongoClient
var hash = require('../app/controller/hash')
// Database URL
const url = 'mongodb://localhost:27017/UnisaEAT_db'
// Database name
const dbName = 'UnisaEAT_db'

const path = require('path');

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
            const Clientedata = fs.readFileSync(__dirname+"\\JSON\\Cliente.json")

            const client = JSON.parse(Clientedata)

            for (var i = 0; client[i] != null; i++) {
                client[i].password = hash.hashPassword(client[i].password)
            }
            
            dbo.collection('cliente').insertMany(client, function(err, result) {
                if (err) throw err
                console.log('abbiamo inserito  ' + result.insertedCount + 'clienti')
                console.log('Succesfully created the collection UnisaEAT_db.')
                resolve()
            })
        })
    })
}