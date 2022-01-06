module.exports = mongoose => {
    //Schema Tesserino
    var schema = mongoose.Schema(
        {
            saldo: Number,
            dataScadenza: Date
        }
    );

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Tesserino = mongoose.model("tesserino", schema, "tesserino");
    return Tesserino;
};
