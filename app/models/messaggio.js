const ObjectId = require('mongodb').ObjectID

/**
 * Questo metodo crea uno schema Mongoose per il messaggio
 * @param {Object} - mongoose 
 * @returns {Object} - restituisce lo schema del messaggio
 */
module.exports = mongoose => {
  // Schema Messaggio
  // L'object sender è un oggetto di questo tipo: {email, ruolo}
  const schema = mongoose.Schema(
    {
      conversazioneId: ObjectId,
      sender: Object,
      testo: String,
      dataInvio: Date
    }
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Messaggio = mongoose.model('messaggio', schema, 'messaggio')
  return Messaggio
}
