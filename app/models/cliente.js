module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      clienteID: String,
      nome: String,
      cognome: String,
      password: Object,
      citta: String,
      email: String,
      indirizzo: String,
      tesserino: Object
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Cliente = mongoose.model("cliente", schema);
  return Cliente;
};
