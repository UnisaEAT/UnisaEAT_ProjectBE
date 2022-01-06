var ObjectId = require('mongodb').ObjectID;
module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            senderID: ObjectId,
            receiverID: ObjectId,
            testo: String,
            data: Date
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
