var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var secret = "clarim";

var Notificacao = mongoose.model("Notificacao");

var UsuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    seguindo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
    seguidores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
    ],
    artigosCurtidos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artigo",
      },
    ],
    artigosFavoritados: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artigo",
      },
    ],
    notificacoes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notificacao",
      },
    ],
    password: String,
    bio: String,
    imagem: String,
  },
  {
    timestamps: true,
  }
);

UsuarioSchema.methods.gerarTokenJWT = function () {
  return jwt.sign(
    {
      id: this._id,
      username: this.username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60, //1 hora
    },
    secret
  );
};

UsuarioSchema.methods.convertJSONAuth = function () {
  return {
    username: this.username,
    email: this.email,
    token: this.gerarTokenJWT(),
    bio: this.bio,
    artigosCurtidos: this.artigosCurtidos,
    artigosFavoritados: this.artigosFavoritados,
    seguidores: this.seguidores,
    seguindo: this.seguindo,
    notificacoes: this.notificacoes,
    imagem:
      this.imagem ||
      "https://www.pikpng.com/pngl/b/446-4465452_people-icon-png-font-awesome-user-svg-clipart.png",
  };
};

UsuarioSchema.methods.convertJSON = function () {
  return {
    username: this.username,
    email: this.email,
    //password: this.password,
    bio: this.bio,
    artigosCurtidos: this.artigosCurtidos,
    artigosFavoritados: this.artigosFavoritados,
    seguindo: this.seguindo,
    seguidores: this.seguidores,
    notificacoes: this.notificacoes,
    imagem:
      this.imagem ||
      "https://www.pikpng.com/pngl/b/446-4465452_people-icon-png-font-awesome-user-svg-clipart.png",
  };
};

UsuarioSchema.methods.listarFavoritos = function () {
  var artigosTeste = [];
  this.artigosFavoritados.forEach((artigo) => {
    artigosTeste.push(artigo.convertJSON());
  });
  return {
    //artigosFavoritados: this.artigosFavoritados[0].convertJSON(),
    artigosFavoritados: artigosTeste,
    quantidade: this.artigosFavoritados.length,
  };
};

UsuarioSchema.methods.curtirArtigo = function (id) {
  if (this.artigosCurtidos.indexOf(id) === -1) {
    this.artigosCurtidos.push(id);
    console.log("metodo curtir");
  }
  return this.save();
};

UsuarioSchema.methods.descurtirArtigo = function (id) {
  console.log("metodo descurtir");
  this.artigosCurtidos.remove(id);
  return this.save();
};

UsuarioSchema.methods.favoritarArtigo = function (id) {
  if (this.artigosFavoritados.indexOf(id) === -1) {
    this.artigosFavoritados.push(id);
    console.log("Artigo Favoritado");
  }
  return this.save();
};

UsuarioSchema.methods.desfavoritarArtigo = function (id) {
  this.artigosFavoritados.remove(id);
  console.log("Artigo Desfavoritado.");
  return this.save();
};

UsuarioSchema.methods.follow = function (autor) {
  this.seguindo.push(autor);
  autor.seguidores.push(this);
  return this;
};

UsuarioSchema.methods.unfollow = function (autor) {
  autor.seguidores.remove(this);
  this.seguindo.remove(autor);
  return this;
};

UsuarioSchema.methods.notificate = function (notification) {
  this.notificacoes.push(notification);
  return this.save();
};

mongoose.model("Usuario", UsuarioSchema);
