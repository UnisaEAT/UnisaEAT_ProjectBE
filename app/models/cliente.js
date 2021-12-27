var ObjectId = require('mongodb').ObjectID;

module.exports = mongoose => {

    var schema = mongoose.Schema({
        _nome: String,

        get nome() {
            return this._nome;
        },
        set nome(value) {
            this._nome = value;
        },

        _cognome: String,

        get cognome() {
            return this._cognome;
        },
        set cognome(value) {
            this._cognome = value;
        },

        _password: Object,

        get password() {
            return this._password;
        },
        set password(value) {
            this._password = value;
        },

        _citta: String,

        get citta() {
            return this._citta;
        },
        set citta(value) {
            this._citta = value;
        },
        _email: String,

        get email() {
            return this._email;
        },
        set email(value) {
            this._email = value;
        },

        _indirizzo: String,

        get indirizzo() {
            return this._indirizzo;
        },
        set indirizzo(value) {
            this._indirizzo = value;
        },
        _tesserino: ObjectId,

        get tesserino() {
            return this._tesserino;
        },
        set tesserino(value) {
            this._tesserino = value;
        },




    });







    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });


    const Cliente = mongoose.model("cliente", schema, "cliente");
    return Cliente;



};