let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let app = require('../../app')
let Article = require('../../models/Usuario')
var mongoose = require('mongoose');
let Usuario = mongoose.model('Usuario')
let Artigo = mongoose.model('Artigo')
var bcrypt = require("bcryptjs");
const connection = require('../../helpers/connection')
const { expect } = require('chai');
chai.use(chaiHttp);
let usuarioAutor;
let artigoMock;
// No describe podemos passar um texto para identificação 
describe('--- Gerenciar Artigos do Diario', () => {
    before(function (done) {
        usuarioAutor = new Usuario()
        usuarioAutor.username = "author2";
        usuarioAutor.email = "author2@email.com"
        usuarioAutor.password = bcrypt.hashSync("1234");
        usuarioAutor.save()
        artigoMock = new Artigo()
        artigoMock.titulo ="Artigo com docker2";
        artigoMock.descricao ="criando ambiente com docker";
        artigoMock.corpo ="<p>Artigo com docker</p>";
        artigoMock.autor = usuarioAutor;
        artigoMock.listaTags =['Espanha']
        artigoMock.save(artigo => done())
       
    })

    it('---> Usuario Favorita Artigo', (done) => {  
        let  artigoId = artigoMock._id;
        Usuario.findById(usuarioAutor.id)
            .then(function (usuario) {
                usuario.favoritarArtigo(artigoId).then(function (usuario) {
                chai.assert.include(usuario.artigosFavoritados, artigoMock.id, '')
                done()
                });
            });   
    });
    it('---> Usuario  Lista Artigo   Favoritos',(done) => {
        Usuario.findById(usuarioAutor.id)
        .populate({
          path: 'artigosFavoritados',
          populate: {
            path: 'autor',
          }
        })
        .exec()
        .then(function (usuario) {
          let favs= usuario.listarFavoritos().artigosFavoritados;
          chai.assert.include(favs, artigoMock.id, '')
          done()    
        }).catch(err=>{
            done()
        });
    })
   

    it('---> Usuario  Remove Artigo dos Favoritos',(done) => {
        let  artigoId = artigoMock._id;
        Usuario.findById(usuarioAutor.id)
            .then(function (usuario) {
                usuario.desfavoritarArtigo(artigoId).then(function (usuario) {
                chai.assert.not.include(usuario.artigosFavoritados, artigoMock.id, '')
                done()
                }).catch(err=>{
                    done()
                });
            });   
    })

    after(function(done){
        connection.db.dropDatabase();
        done()
    })
});

