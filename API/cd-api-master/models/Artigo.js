const { text } = require("express");
var mongoose = require("mongoose");
var slug = require("mongoose-url-slugs");
var Usuario = mongoose.model("Usuario");
var Comentario = mongoose.model("Comentario");

var ArtigoSchema = new mongoose.Schema(
  {
    titulo: String,
    slug: {
      type: String,
      lowercase: true,
      slug: "titulo",
      unique: true,
    },
    descricao: String,
    corpo: String,
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    imagem:String,
    curtidasCont: {
      type: Number,
      default: 0,
    },
    listaTags: [
      {
        type: String,
      },
    ],
    comentarios: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comentario",
      },
    ],
  },
  {
    timestamps: true,
  }
);

ArtigoSchema.index({
  titulo: "text",
  descricao: "text",
  corpo: "text",
});

ArtigoSchema.plugin(slug("titulo", { field: "slug" }));
ArtigoSchema.methods.convertJSON = function () {
  return {
    id: this.id,
    slug: this.slug,
    titulo: this.titulo,
    descricao: this.descricao,
    corpo: this.corpo,
    imagem:this.imagem,
    curtidasCont: this.curtidasCont,
    listaTags: this.listaTags,
    comentarios: this.comentarios,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    autor: this.autor.convertJSON(),
  };
};

ArtigoSchema.methods.insertComment = function (comment) {
  this.comentarios.push(comment);
  console.log("------salvo com sucesso-------------");
  return this.save();
};

ArtigoSchema.methods.atualizarCurtidasArtigo = function () {
  var artigo = this;
  return Usuario.count({
    artigosCurtidos: {
      $in: [artigo._id],
    },
  }).then(function (qtdCurtidas) {
    console.log(
      "Quantidade de Curtidas de " + artigo.titulo + ": " + qtdCurtidas
    );
    artigo.curtidasCont = qtdCurtidas;

    return artigo.save();
  });
};

mongoose.model("Artigo", ArtigoSchema);
