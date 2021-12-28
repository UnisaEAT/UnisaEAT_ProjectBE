var MongoClient = require('mongodb').MongoClient

// Database URL
const url = 'mongodb://localhost:27017/UnisaEAT_db'

// Database name
const dbName = 'UnisaEAT_db'

var del = dropDb()
del.then(function(result) {
    process.exit()
})

function dropDb() {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, db) {
            if (err) reject(err)
            console.log('Connected successfully to server!')
            var dbo = db.db(dbName)

            dbo.collection('cliente').deleteMany({}, function(err, result) {
                if (err) throw err
                console.log('cancellazione di  ' + result.deletedCount + 'clienti')
                dbo.collection('tesserino').deleteMany({}, function (err, result){
                    if (err) throw err
                    console.log('cancellazione di  ' + result.deletedCount + 'tesserini')
                    resolve();
                })
                
            })
        })
    })
}