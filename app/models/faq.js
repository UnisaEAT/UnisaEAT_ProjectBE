/**
 * Questo metodo crea uno schema Mongoose per la Faq
 * @param {Object} - mongoose 
 * @returns {Object} - restituisce lo schema della Faq
 */
module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      domanda: String,
      risposta: String
    }
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Faq = mongoose.model('faq', schema, 'faq')
  return Faq
}
