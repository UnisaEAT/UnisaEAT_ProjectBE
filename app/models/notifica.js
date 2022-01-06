var ObjectId = require('mongodb').ObjectID;
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            receiverID: ObjectId,
            testo: String,
            tipo: String,
            titolo: String,
            visualizzazione: Boolean
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Notifica = mongoose.model("notifica", schema, "notifica");
    return Notifica;
};