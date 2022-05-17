var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var auth = require("./auth");
var passport = require("passport");

var Usuario = mongoose.model("Usuario");
var Artigo = mongoose.model("Artigo");

router.param("artigo", function (req, res, next, slug) {
  console.log("param artigos");
  Artigo.findOne({
    slug: slug,
  })
    .populate("autor")
    .then(function (artigo) {
      if (!artigo) {
        return res.sendStatus(404);
      }

      req.artigo = artigo;

      return next();
    })
    .catch(next);
});

/* GET users listing. */
router.get("/", auth.optional, function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/auth/registro/", auth.optional, function (req, res, next) {
  var usuario = new Usuario();

  usuario.username = req.body.usuario.username;
  usuario.email = req.body.usuario.email;
  usuario.password = bcrypt.hashSync(req.body.usuario.password);

  usuario
    .save()
    .then(function () {
      return res.json({
        usuario: usuario.convertJSON(),
      });
    })
    .catch(next);
});

router.post("/auth/login/", auth.optional, function (req, res, next) {
  var email = req.body.usuario.email;
  var password = req.body.usuario.password;

  if (typeof email === "undefined") {
    return res.statusCode(422).json({
      errors: {
        email: "O email não pode ficar em branco.",
      },
    });
  }

  if (typeof password === "undefined") {
    return res.statusCode(422).json({
      errors: {
        password: "A senha não pode ficar em branco.",
      },
    });
  }

  passport.authenticate(
    "local",
    { session: false },
    function (err, usuario, info) {
      if (err) {
        return next(err);
      }

      if (usuario) {
        var usuarioAutenticado = usuario;
        usuarioAutenticado.token = usuario.gerarTokenJWT();
        return res.json({
          usuario: usuario.convertJSONAuth(),
        });
      }

      return res.status(422).json(info);
    }
  )(req, res, next);
});

router.get("/usuario/", auth.required, function (req, res, next) {
  Usuario.findById(req.payload.id)
    .populate("seguindo")
    .populate(`seguidores`)
    .populate("notificacoes")
    .populate("artigosFavoritados")
    .exec()
    .then(function (usuario) {
      if (!usuario) {
        console.log("usuario não encontrado");
        return res.status(401).send("Usuario não encontrado!");
      }

      return res.json(usuario.convertJSON());
    })
    .catch(next);
});

router.get("/usuario/favoritos", auth.required, function (req, res, next) {
  Usuario.findById(req.payload.id)
    .populate({
      path: 'artigosFavoritados',
      populate: {
        path: 'autor',
//        model: 'Usuario'
      }
    })
    .exec()
    .then(function (usuario) {
      if (!usuario) {
        console.log("usuario não encontrado");
        return res.status(401).send("Usuario não encontrado!");
      }

      return res.json(usuario.listarFavoritos());    
    })
    .catch(next);
});

router.put("/usuario", auth.required, function (req, res, next) {
  Usuario.findById(req.payload.id)
    .then(function (usuario) {
      if (!usuario) {
        return res.sendStatus(401);
      }

      if (typeof req.body.usuario.username !== "undefined") {
        usuario.username = req.body.usuario.username;
      }
      if (typeof req.body.usuario.email !== "undefined") {
        usuario.email = req.body.usuario.email;
      }
      if (typeof req.body.usuario.bio !== "undefined") {
        usuario.bio = req.body.usuario.bio;
      }
      if (typeof req.body.usuario.imagem !== "undefined") {
        usuario.imagem = req.body.usuario.imagem;
      }
      if (typeof req.body.usuario.password !== "undefined") {
        usuario.password = bcrypt.hashSync(req.body.usuario.password);
      }

      return usuario.save().then(function () {
        return res.json({
          usuario: usuario.convertJSON(),
        });
      });
    })
    .catch(next);
});

module.exports = router;
