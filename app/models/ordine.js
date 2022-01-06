var ObjectId = require('mongodb').ObjectID;
module.exports = mongoose => {
    //Schema Ordine
    var schema = mongoose.Schema(
        {
            prezzo: Number,
            dataOrdine: Date,
            boolPranzo: Boolean,
            stato: String,
            listaPasti: Array,
            qr: Object,
            acquirenteID: ObjectId
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Ordine = mongoose.model("ordine", schema, "ordine");
    return Ordine;
};