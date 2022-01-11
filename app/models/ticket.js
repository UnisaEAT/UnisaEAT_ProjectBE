//Model faq.js
module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        
        titolo: String,
        problema: String,
        soluzione: String,
        date: Date
      }
    );
  
    schema.method("toJSON", function() {
      const {_id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Ticket = mongoose.model("ticket", schema, "ticket");
    return Ticket;
  };