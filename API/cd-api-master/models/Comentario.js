const { text } = require("express");
var mongoose = require("mongoose");
var slug = require("mongoose-url-slugs");
var Usuario = mongoose.model("Usuario");

var ComentarioSchema = new mongoose.Schema(
  {
    titulo: String,
    slug: {
      type: String,
      lowercase: true,
      slug: "titulo",
      unique: true,
    },
    corpo: String,
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    autor_name: String,
  },
  {
    timestamps: true,
  }
);

ComentarioSchema.index({
  corpo: "text",
});

ComentarioSchema.plugin(slug("titulo", { field: "slug" }));

ComentarioSchema.methods.convertJSON = function () {
  return {
    slug: this.slug,
    titulo: this.titulo,
    corpo: this.corpo,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    autor: this.autor.convertJSON(),
  };
};

mongoose.model("Comentario", ComentarioSchema);
