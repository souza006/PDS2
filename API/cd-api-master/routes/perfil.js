var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var Usuario = mongoose.model('Usuario');
var Artigo = mongoose.model('Artigo');

var auth = require('./auth');

router.param('artigo', function (req, res, next, slug) {
  console.log('param artigos');
  Artigo.findOne({
    slug: slug
  }).populate('autor')
    .then(function (artigo) {
      if (!artigo) {
        return res.sendStatus(404);
      }

      req.artigo = artigo;

      return next();
    }).catch(next);
});

router.get('/:username', auth.optional, function (req, res, next) {
  console.log("ENTROUUUUUUUU")
  Usuario.findOne({ "username": req.params.username }).then(function (usuario) {
    if (!usuario) {
      console.log('usuario não encontrado');
      return res.send('Usuario não encontrado!').end();
    }
    console.log("Dados usuario> " + usuario.username + '-' + usuario.bio + '-' + usuario.imagem);

    return res.json(
      usuario.convertJSON()
    );
  }).catch(next);
});

router.get('/:username/artigos', auth.optional, function (req, res, next) {
  console.log("ENTROU ROTA PERFIL/ARTIGOS")
  var query = {};
  console.log("Autor Username: " + req.params.username);
  Promise.resolve(
    Usuario.findOne({ "username": req.params.username })
  ).then(function (usuario) {
    var autor = usuario;

    console.log("Autor Promise: " + autor.username + " " + autor.id);
    query.autor = autor._id;
    console.log("Query Autor: " + query.autor);

    return Promise.resolve(
      Artigo.find({ "autor": autor._id })
        .sort({
          createdAt: 'desc'
        })
        .populate('autor')
        .exec(),
    ).then(function (artigosPromise) {
      var artigos = artigosPromise;
      return res.json({
        artigos: artigos.map(function (artigo) {
          return artigo.convertJSON();
        }),
      });
    }).catch(next);
  })

});


router.post('/:username/seguir', auth.required, function (req, res, next) {
  Usuario.findOne({ "username": req.params.username }).then(function (autor) {
    Usuario.findById(req.payload.id).then(function (user) {
      user.follow(autor)
      autor.save()
      user.save()

    }).catch(function (err1) {
      console.log(err1)
    })
  }).catch(function (err2) {
    console.log(err2)
  })
  return res.sendStatus(200)
});

router.delete('/:username/seguir', auth.required, function (req, res, next) {
  Usuario.findOne({ "username": req.params.username }).then(function (autor) {
    Usuario.findById(req.payload.id).then(function (user) {
      user.unfollow(autor)
      autor.save()
      user.save()
    }).catch(function (err1) {
      console.log(err1)
    })
  }).catch(function (err2) {
    console.log(err2)
  })
  return res.sendStatus(200)
});



module.exports = router;