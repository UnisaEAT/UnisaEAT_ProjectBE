/**
 * Questo metodo crea uno schema Mongoose per il menù
 * @param {Object} - mongoose 
 * @returns {Object} - restituisce lo schema del menù
 */
module.exports = mongoose => {
  // Schema Menu
  const schema = mongoose.Schema(
    {
      pasti: Array,
      tipo: String,
      data: Date
    }
  )

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Menu = mongoose.model('menu', schema, 'menu')
  return Menu
}
