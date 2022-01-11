//Model faq.js
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        domanda: String,
        risposta: String
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Faq = mongoose.model("faq", schema, "faq");
    return Faq;
  };