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
describe('--- Filtrar por Tag', () => {
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

    it('---> Usuario Procura por uma TAG existente', (done) => {
        let query = {};
        query.listaTags = {
            '$in': ['Espanha']
        };
        Artigo.find(query).sort({ createdAt: 'desc' }).populate('autor').exec().then( res=>{
            chai.assert.lengthOf(res,1, '');
            done()
        }).catch( err =>{
            done()
        })
      
    });

    it('---> Usuario busca por uma TAG que nao existe',(done) => {
            let query = {};
            query.listaTags = {
                '$in': ['Javascript']
            };
     
            Artigo.find(query).sort({ createdAt: 'desc' }).populate('autor').exec().then( res=>{
                chai.assert.lengthOf(res,0, '');
                done()
            }).catch( err =>{
                console.log(err)
                done()
            })
       
      
    })

   
    after(function(done){
        connection.db.dropDatabase();
        done()
    })
});

