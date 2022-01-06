module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            nome: String,
            descrizione: String,
            disponibilita: Number,
            immagine: Object,
            categoria: String,
            ingredienti: String,
            numeroOrdinazioni: Number
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Pasto = mongoose.model("pasto", schema, "pasto");
    return Pasto;
};
