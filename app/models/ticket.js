var ObjectId = require('mongodb').ObjectID;
module.exports = mongoose => {
    //Schema Ticket
    var schema = mongoose.Schema(
        {
            titolo: String,
            problema: String,
            soluzione: String,
            data: Date,
            senderID: ObjectId
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Ticket = mongoose.model("ticket", schema, "ticket");
    return Ticket;
};
  