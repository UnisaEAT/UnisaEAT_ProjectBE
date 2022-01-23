// Model Ticket.js
module.exports = mongoose => {
  // Schema Ticket
    /**
 * Questo metodo crea uno schema Mongoose per il ticket
 * @param {Object} - mongoose 
 * @returns {Object} - restituisce lo schema del ticket
 */
  const schema = mongoose.Schema(
    {

      titolo: String,
      problema: String,
      soluzione: String,
      email: String,
      date: Date
    }
  )

  schema.method('toJSON', function () {
    const { _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Ticket = mongoose.model('ticket', schema, 'ticket')
  return Ticket
}
