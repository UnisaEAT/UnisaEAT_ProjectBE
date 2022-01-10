var ObjectId = require('mongodb').ObjectID;
module.exports = mongoose => {
    //Schema Conversazione
    //membri sarà un Array di due oggetti: uno cliente e l'altro personale (email e ruolo)
    var schema = mongoose.Schema(
        {
            membri: Array
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Conversazione = mongoose.model("conversazione", schema, "conversazione");
    return Conversazione;
};
