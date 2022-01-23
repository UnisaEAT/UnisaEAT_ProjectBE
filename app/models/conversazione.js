/**
 * Questo metodo crea uno schema Mongoose per la conversazione
 * @param {Object} - mongoose 
 * @returns {Object} - restituisce lo schema della conversazione
 */
module.exports = mongoose => {
  // Schema Conversazione
  // membri sarà un Array di due oggetti: uno cliente e l'altro personale (email e ruolo)
  const schema = mongoose.Schema(
    {
      membri: Array
    }
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Conversazione = mongoose.model('conversazione', schema, 'conversazione')
  return Conversazione
}
