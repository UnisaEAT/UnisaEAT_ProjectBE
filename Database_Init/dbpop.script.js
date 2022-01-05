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
           // const clienteData = fs.readFileSync('../Database_Init/JSON/Cliente.json')
           // const personaleData = fs.readFileSync('../Database_Init/JSON/Personale.json')
           // const adminData = fs.readFileSync('../Database_Init/JSON/Admin.json')
           const faqdata = fs.readFileSync(__dirname + '\\JSON\\faq.json')

            //const client = JSON.parse(clienteData)
            //const personale = JSON.parse(personaleData)
            //const admin = JSON.parse(adminData)
            const faq = JSON.parse(faqdata)

         /*   dbo.collection('cliente').insertMany(client, function(err, result) {
                if (err) throw err
                console.log('abbiamo inserito  ' + result.insertedCount + 'cliente')
                dbo.collection('personale').insertMany(personale, function(err, result) {
                    if (err) throw err
                    console.log('abbiamo inserito  ' + result.insertedCount + 'che rigiuardano il personale')*/
                    dbo.collection('faq').insertMany(faq, function(err, result) {
                        if (err) throw err
                        console.log('abbiamo inserito  ' + result.insertedCount + 'faq')
                        if (err) throw err
                        console.log('Succesfully created the collection UnisaEAT_db.')
                        resolve()
                    })
                })
            })
    
  
  
    

}