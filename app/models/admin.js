module.exports = mongoose => {
    var schema = mongoose.Schema({
        nome: String,

        cognome: String,

        password: Object,


        email: String,
    });

    schema.method("toJSON", function () {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Admin = mongoose.model("admin", schema, "admin");
    return Admin;
};