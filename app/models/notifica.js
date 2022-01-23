const ObjectId = require('mongodb').ObjectID
module.exports = mongoose => {
  // Schema Notifica
  /**
 * Questo metodo crea uno schema Mongoose per la notifica
 * @param {Object} - mongoose 
 * @returns {Object} - restituisce lo schema della notifica
 */
  const schema = mongoose.Schema(
    {
      receiverEmail: String,
      testo: String,
      tipo: String,
      titolo: String,
      visualizzazione: Boolean
    }
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Notifica = mongoose.model('notifica', schema, 'notifica')
  return Notifica
}
