module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            nome: String,
            cognome: String,
            password: Object,
            email: String,
            numeroTelefono: String,
            dataDiNascita: String,
            ruolo: String,
            disponibilita: Boolean,
            indirizzo: String
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Personale = mongoose.model("personale", schema, "personale");
    return Personale;
};