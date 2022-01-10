var ObjectId = require('mongodb').ObjectID;
module.exports = mongoose => {
    //Schema Messaggio
    var schema = mongoose.Schema(
        {
            conversazioneId: ObjectId,
            senderId: ObjectId,
            testo: String,
            dataInvio: Date
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Messaggio = mongoose.model("messaggio", schema, "messaggio");
    return Messaggio;
};
