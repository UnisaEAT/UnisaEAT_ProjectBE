module.exports = mongoose => {
    //Schema Statistiche
    var schema = mongoose.Schema(
        {
            dataInizio: Date,
            dataFine: Date,
            pastiEOrdinazioni: Array,
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Statistiche = mongoose.model("statistiche", schema, "statistiche");
    return Statistiche;
};
