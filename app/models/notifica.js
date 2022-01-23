const ObjectId = require('mongodb').ObjectID
module.exports = mongoose => {
  // Schema Notifica
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
