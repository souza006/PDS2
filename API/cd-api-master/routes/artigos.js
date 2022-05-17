var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var Artigo = mongoose.model("Artigo");
var Usuario = mongoose.model("Usuario");
var Notificacao = mongoose.model("Notificacao");
var Comentario = mongoose.model("Comentario");

var auth = require("./auth");

/**
 * "Popula" o ':artigo' que está sendo requisitado através
 * do slug e popula o mesmo com o "objeto" 'usuario' que é o
 * autor.
 * Obs: populate é uma espécie de join(sql)
 */
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

/* GET artigos. */
router.get("/", auth.optional, function (req, res, next) {
  Artigo.find({}, function (err, artigos) {
    return res.json({
      artigos: artigos.map(function (artigo) {
        return artigo.convertJSON();
      }),
    });
  })
    .populate("autor")
    .exec();
});

router.get("/busca/", auth.optional, function (req, res, next) {
  if (typeof req.query.type == "undefined") {
    Artigo.find(
      { $text: { $search: req.query.text } },
      function (err, artigos) {
        return res.json({
          artigos: artigos.map(function (artigo) {
            return artigo.convertJSON();
          }),
        });
      }
    )
      .populate("autor")
      .exec();
  } else if (req.query.type == 1) {
    Artigo.find(
      { titulo: { $regex: req.query.text, $options: "i" } },
      function (err, artigos) {
        return res.json({
          artigos: artigos.map(function (artigo) {
            return artigo.convertJSON();
          }),
        });
      }
    )
      .populate("autor")
      .exec();
  } else if (req.query.type == 2) {
    Usuario.find(
      { username: { $regex: req.query.text, $options: "i" } },
      function (err, autores) {
        console.log(autores);
        return res.json({
          autores: autores.map(function (autor) {
            return autor.convertJSON();
          }),
        });
      }
    );
  }
});

router.get('/busca/', auth.optional, function (req, res, next) {
    if (typeof req.query.type == 'undefined') {
        Artigo.find({ $text: { $search: req.query.text } }, function (err, artigos) {
            return res.json({
                artigos: artigos.map(function (artigo) {
                    return artigo.convertJSON();
                })
            });
        }).populate('autor').exec();
    } else if (req.query.type == 1) {
        Artigo.find({ titulo: { $regex: req.query.text, '$options': 'i' } }, function (err, artigos) {
            return res.json({
                artigos: artigos.map(function (artigo) {
                    return artigo.convertJSON();
                })
            });
        }).populate('autor').exec();
    } else if (req.query.type == 2) {
        Usuario.find({ username: { $regex: req.query.text, '$options': 'i' } }, function (err, autores) {
            console.log(autores)
            return res.json({
                autores: autores.map(function (autor) {
                    return autor.convertJSON();
                })
            });
        })
    }
}
);

router.get('/busca/tag', auth.optional, function (req, res, next) {
    var query = {};

    if (typeof req.query.tag !== 'undefined') {
        console.log('this is your query')
        console.log(req.query)
        query.listaTags = {
            '$in': [req.query.tag]
        };
    }
    return Promise.resolve(
        Artigo.find(query).sort({ createdAt: 'desc' })
            .populate('autor').exec()
            .then(function (artigos) {
                return res.json({
                    artigos: artigos.map(function (artigo) {
                        return artigo.convertJSON();
                    })
                })
            })
    ).catch(next);
})
/*
router.get('/busca/chave', auth.optional, function (req, res, next) {
    var query = {};
    var tagGeral;

    if (typeof req.query.tag !== 'undefined') {
        query.listaTags = {
            '$in': [req.query.tag]
        };
        tagGeral = req.query.tag;
    }

    console.log(query)
    return Promise.all([
        Artigo.find(query).sort({ createdAt: 'desc' })
            .populate('autor').exec(),
        Artigo.find({ $text: { $search: tagGeral } })
            .populate('autor').exec()
    ]).then(function (results) {
        var artigosPorTag = results[0];
        var artigosPorTexto = results[1];
        var artigosConcatenados = artigosPorTag.concat(artigosPorTexto);
        var artigosFiltrados = [...new Map(artigosConcatenados.map(item => [item.id, item])).values()]

        return res.json({
          artigos: artigos.map(function (artigo) {
            return artigo.convertJSON();
          }),
        });
      }).catch(next);
    });
*/
router.get("/busca/chave", auth.optional, function (req, res, next) {
  var query = {};
  var tagGeral;

  if (typeof req.query.tag !== "undefined") {
    query.listaTags = {
      $in: [req.query.tag],
    };
    tagGeral = req.query.tag;
  }

  console.log(query);
  return Promise.all([
    Artigo.find(query).sort({ createdAt: "desc" }).populate("autor").exec(),
    Artigo.find({ $text: { $search: tagGeral } })
      .populate("autor")
      .exec(),
  ])
    .then(function (results) {
      var artigosPorTag = results[0];
      var artigosPorTexto = results[1];
      var artigosConcatenados = artigosPorTag.concat(artigosPorTexto);
      var artigosFiltrados = [
        ...new Map(artigosConcatenados.map((item) => [item.id, item])).values(),
      ];

      return res.json({
        artigosFiltrados: artigosFiltrados.map(function (artigo) {
          return artigo.convertJSON();
        }),
      });
    })
    .catch(next);
});

router.post("/", auth.required, function (req, res, next) {
  console.log("criar artigo com auth");

  Usuario.findById(req.payload.id)
    .then(async function (usuario) {
      if (!usuario) {
        return res.send("Add autor: Usuario não encontrado!").end();
      }

      var artigo = new Artigo(req.body.artigo);

      artigo.autor = usuario;

      console.log(
        "titulo: " + artigo.titulo + " autor:" + artigo.autor.username
      );

      artigo
        .save()
        .then(function () {
      
          notification = new Notificacao({
            descricao: "descricao de notificacao",
          });
          notification
            .save()
            .then((res) => {
      
              console.log(res);
            })
            .catch((err) => {
              console.log("a erro has occured" + err);
            });
          usuario.seguidores.forEach((element) => {
            console.log("---------->" + element);
            Usuario.findById(element, function (err, u) {
  

              u.notificate(notification);
            });
          });
          return res.json({
            artigo: artigo.convertJSON(),
          });
        })
        .catch(next);
    })
    .catch(next);
});

router.get("/:artigo/", auth.optional, function (req, res, next) {
  console.log("req: " + req.params.slug);

  console.log("Artigo.find " + Artigo.findOne({ slug: req.params.slug }));

  Promise.resolve(
    req.artigo.populate("autor").populate("comentarios").execPopulate()
  )
    .then(function () {
      return res.json({
        artigo: req.artigo.convertJSON(),
      });
    })
    .catch((error) => {
      console.log("a erro has ocurred:", error);
    });
});

router.put("/:artigo/", auth.required, function (req, res, next) {
  Usuario.findById(req.payload.id).then(function () {
    if (req.artigo.autor._id.toString() === req.payload.id.toString()) {
      if (typeof req.body.artigo.titulo !== "undefined") {
        req.artigo.titulo = req.body.artigo.titulo;
      }
      if (typeof req.body.artigo.descricao !== "undefined") {
        req.artigo.descricao = req.body.artigo.descricao;
      }
      if (typeof req.body.artigo.corpo !== "undefined") {
        req.artigo.corpo = req.body.artigo.corpo;
      }
      if (typeof req.body.artigo.listaTags !== "undefined") {
        req.artigo.listaTags = req.body.artigo.listaTags;
      }
      req.artigo
        .save()
        .then(function (artigo) {
          return res.json({
            artigo: artigo.convertJSON(),
          });
        })
        .catch(next);
    } else {
      return res
        .status(403)
        .send("Você não tem autorização para editar o artigo!");
    }
  });
});

router.delete("/:artigo", auth.required, function (req, res, next) {
  Usuario.findById(req.payload.id).then(function () {
    if (req.artigo.autor._id.toString() === req.payload.id.toString()) {
      return req.artigo.remove().then(function () {
        return res.status(200).send("Artigo deletado com sucesso!");
        //return res.sendStatus(204);
      });
    } else {
      return res
        .status(403)
        .send("Você não tem autorização para deletar o artigo!");
    }
  });
});

router.post("/:artigo/curtir", auth.required, function (req, res, next) {
  var artigoId = req.artigo._id;

  Usuario.findById(req.payload.id)
    .then(function (usuario) {
      if (!usuario) {
        return res.status(401).send("Usuário não encontrado!");
      }
      return usuario.curtirArtigo(artigoId).then(function () {
        console.log("CURTIDA TESTE: " + req.artigo.titulo);
        return req.artigo.atualizarCurtidasArtigo().then(function (artigo) {
          return res.json({
            artigo: artigo.convertJSON(),
          });
        });
      });
    })
    .catch(next);
});

router.delete("/:artigo/curtir", auth.required, function (req, res, next) {
  var artigoId = req.artigo._id;

  Usuario.findById(req.payload.id)
    .then(function (usuario) {
      if (!usuario) {
        return res.status(401).send("Usuário não encontrado!");
      }

      return usuario.descurtirArtigo(artigoId).then(function () {
        console.log("DESCURTIR TESTE: " + req.artigo.titulo);
        return req.artigo.atualizarCurtidasArtigo().then(function (artigo) {
          return res.json({
            artigo: artigo.convertJSON(),
          });
        });
      });
    })
    .catch(next);
});

router.post("/:artigo/favoritar", auth.required, function (req, res, next) {
  var artigoId = req.artigo._id;
  Usuario.findById(req.payload.id)
    .then(function (usuario) {
      if (!usuario) {
        return res.status(401).send("Usuário não encontrado!");
      }

      return usuario.favoritarArtigo(artigoId).then(function (usuario) {
        return res.json({
          usuario: usuario.convertJSON(),
          artigo: req.artigo.convertJSON()
        });
      });
    })
    .catch(next);
});

router.delete("/:artigo/favoritar", auth.required, function (req, res, next) {
  var artigoId = req.artigo._id;

  Usuario.findById(req.payload.id)
    .then(function (usuario) {
      if (!usuario) {
        return res.status(401).send("Usuário não encontrado!");
      }

      return usuario.desfavoritarArtigo(artigoId).then(function (usuario) {
        return res.json({
          usuario: usuario.convertJSON(),
          artigo: req.artigo.convertJSON()
        });
      });
    })
    .catch(next);
});

//endpoint to comment a article
router.post("/comentar/:artigo", auth.required, function (req, res) {
  var artigoId = req.artigo._id;
  console.log(req.payload);
  console.log("corpo dessa pohaaaaaaaaaaaaaaa" + req.body.corpo);
  Usuario.findById(req.payload.id)
    .then((usuario) => {
      console.log(usuario);
      Artigo.findById(req.artigo._id)
        .then((artigo) => {
          if (!artigo) {
            return res.status(404).send("Artigo não foi encontrado");
          }
          const comentario = new Comentario({
            autor_name: usuario.username,
            corpo: req.body.comentario,
            autor: usuario,
          });
          comentario
            .save()
            .then((coment) => {
              artigo.insertComment(coment);
              console.log("comentario foi salvo como :" + comentario);
              return res.status(200).send("Comentário cadastrado com sucesso!");
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).send("Erro ao salvar comentario");
            });
        })
        .catch((err) => {
          console.log("Erro encontrado" + err);
          return res.status(404).send("Artigo indisponivel");
        });
    })
    .catch((err) => {
      console.log("ocorreu o seguinte erro:" + err);
    });
});

module.exports = router;
