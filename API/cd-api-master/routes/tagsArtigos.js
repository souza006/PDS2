var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Artigo = mongoose.model('Artigo');

router.get('/', function(req, res, next) {
    Artigo.find().distinct('listaTags').then(function(tagsArtigos){
        return res.json({tagsArtigos: tagsArtigos});
    }).catch(next);
});

module.exports = router;