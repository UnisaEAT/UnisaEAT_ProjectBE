module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      titolo: String,
      descrizione: String,
      dataInizio: Date,
      dataFine: Date,
      pastiPiuOrdinati: Array,
      pastiMenoOrdinati: Array
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Statistiche = mongoose.model("statistiche", schema, "statistiche");
  return Statistiche;
};
