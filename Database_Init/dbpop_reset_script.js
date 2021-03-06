const MongoClient = require('mongodb').MongoClient

// URL del Database
const url = 'mongodb://localhost:27017/UnisaEAT_db'

// Nome del Database utilizzato su MongoDB
const dbName = 'UnisaEAT_db'

const del = dropDb()
del.then(function (result) {
  process.exit()
})

function dropDb () {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, function (err, db) {
      if (err) reject(err)
      console.log('Connected successfully to server!')
      const dbo = db.db(dbName)

      dbo.dropDatabase(function (err, result) {
        if (err) throw err
        console.log('Risultato = ' + result)
        db.close()
        resolve()
      })
    })
  })
}
