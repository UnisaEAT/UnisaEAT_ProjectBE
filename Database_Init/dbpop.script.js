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


function insert() {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, db) {
            if (err) reject(err)
            console.log('connessione al server avvenuta!')
            var dbo = db.db(dbName)

            const fs = require('fs')
            const personaleData = fs.readFileSync(__dirname+'\\JSON\\Personale.json')
           
            const personale = JSON.parse(personaleData)
            
            for (var j = 0; personale[j] != null; j++) {
                personale[j].password = hash.hashPassword(personale[j].password)
            }
            
            dbo.collection('personale').insertMany(personale, function(err, result) {
                if (err) throw err
                console.log('abbiamo inserito  ' + result.insertedCount + ' personale')
                console.log('Succesfully created the collection UnisaEAT_db.')
                resolve()
            })
        })
    })
}