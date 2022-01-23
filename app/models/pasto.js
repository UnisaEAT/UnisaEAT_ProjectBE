module.exports = mongoose => {
  // Schema Pasto
/**
 * Questo metodo crea uno schema Mongoose per il pasto
 * @param {Object} - mongoose 
 * @returns {Object} - restituisce lo schema del pasto
 */
  const schema = mongoose.Schema(
    {
      nome: String,
      descrizione: String,
      categoria: String,
      ingredienti: String,
      numeroOrdinazioni: Number
    }
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Pasto = mongoose.model('pasto', schema, 'pasto')
  return Pasto
}
