const ObjectId = require('mongodb').ObjectID

/**
 * Questo metodo crea uno schema Mongoose per il Cliente
 * @param {Object} - mongoose 
 * @returns {Object} - restituisce lo schema del Cliente
 */
module.exports = mongoose => {
  // Schema Cliente
  const schema = mongoose.Schema(
    {
      nome: String,
      cognome: String,
      password: Object,
      citta: String,
      email: String,
      indirizzo: String,
      tesserino: ObjectId,
      dataDiNascita: String,
      provinciaDiNascita: String,
      comuneDiNascita: String,
      cittadinanza: String,
      provincia: String,
      cap: String,
      telefono: String
    }
  )

  schema.method('toJSON', function () {
    const {
      __v,
      _id,
      ...object
    } = this.toObject()
    object.id = _id
    return object
  })

  const Cliente = mongoose.model('cliente', schema, 'cliente')
  return Cliente
}
