module.exports = mongoose => {
  // Schema Personale
    /**
 * Questo metodo crea uno schema Mongoose per il personale
 * @param {Object} - mongoose 
 * @returns {Object} - restituisce lo schema del personale
 */
  const schema = mongoose.Schema({
    nome: String,
    cognome: String,
    password: Object,
    email: String,
    numeroTelefono: String,
    dataDiNascita: String,
    ruolo: String,
    indirizzo: String
  })

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Personale = mongoose.model('personale', schema, 'personale')
  return Personale
}
