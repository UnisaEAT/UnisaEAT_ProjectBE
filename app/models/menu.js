module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
        nome: String,
        pasti: Array
    }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Menu = mongoose.model("menu", schema, "menu");
  return Menu;
};