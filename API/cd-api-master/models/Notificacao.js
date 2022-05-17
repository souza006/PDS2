const { text } = require("express");
var mongoose = require("mongoose");
var slug = require("mongoose-url-slugs");

var NotificacaoSchema = new mongoose.Schema(
  {
    titulo: String,
    slug: {
      type: String,
      lowercase: true,
      slug: "titulo",
      unique: true,
    },
    descricao: String,
  },
  {
    timestamps: true,
  }
);

NotificacaoSchema.index({
  titulo: "text",
  descricao: "text",
});

NotificacaoSchema.plugin(slug("titulo", { field: "slug" }));

NotificacaoSchema.methods.convertJSON = function () {
  return {
    id: this.id,
    slug: this.slug,
    titulo: this.titulo,
    descricao: this.descricao,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

mongoose.model("Notificacao", NotificacaoSchema);
