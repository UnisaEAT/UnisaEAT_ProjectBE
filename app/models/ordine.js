const ObjectId = require('mongodb').ObjectID
module.exports = mongoose => {
  // Schema Ordine
    /**
 * Questo metodo crea uno schema Mongoose per l'ordine
 * @param {Object} - mongoose 
 * @returns {Object} - restituisce lo schema dell'ordine
 */
  const schema = mongoose.Schema(
    {
      prezzo: Number,
      dataOrdine: Date,
      boolPranzo: Boolean,
      listaPasti: Array,
      acquirente: ObjectId
    }
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Ordine = mongoose.model('ordine', schema, 'ordine')
  return Ordine
}
