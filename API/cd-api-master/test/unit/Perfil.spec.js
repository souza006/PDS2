let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let app = require('../../app')
let User = require('../../models/Usuario')
var mongoose = require('mongoose');
let Usuario = mongoose.model('Usuario')
const connection = require('../../helpers/connection')
var bcrypt = require("bcryptjs");
const { expect } = require('chai');
chai.use(chaiHttp);


let usuarioAutor;
let usuarioFollower;
// No describe podemos passar um texto para identificação 
describe('--- CDU Seguir Autor', () => {
    before(function (done) {
     
        usuarioAutor = new Usuario()
        usuarioAutor.username = "author2";
        usuarioAutor.email = "author2@email.com"
        usuarioAutor.password = bcrypt.hashSync("1234");
        usuarioFollower = new Usuario()
        usuarioFollower.username = "follower2";
        usuarioFollower.email = "follower2@email.com"
        usuarioFollower.password = bcrypt.hashSync("1234");
        done()
    })

    it('---> Usuario começa a seguir autor com sucesso', (done) => {
    
        usuarioFollower = usuarioFollower.follow(usuarioAutor)
        let authorsIds = []
        usuarioFollower.seguindo.map((element) => {
            authorsIds.push(element.id)
        })

        chai.assert.include(authorsIds, usuarioAutor.id, '')
        done()

    });

    it('---> Usuario deixa de seguir autor com sucesso', (done) => {
        usuarioFollower = usuarioFollower.unfollow(usuarioAutor)
        let authorsIds = []
        usuarioFollower.seguindo.map((element) => {
            authorsIds.push(element.id)
        })
        chai.assert.notInclude(authorsIds, usuarioAutor.id, '')
        done()
    })


    after(function(done){

        connection.db.dropDatabase();
        done()
    })
});

