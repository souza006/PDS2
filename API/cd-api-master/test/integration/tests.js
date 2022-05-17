let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
// let expect = chai.expect();
let app = require('../../app')
let url = 'https://clarimdiarioapi.devops.ifrn.edu.br';
var bcrypt = require("bcryptjs");
const connection = require('../../helpers/connection')
chai.use(chaiHttp);

// TESTES DE INTEGRAÇÃO 
var mongoose = require('mongoose');
let Usuario = mongoose.model('Usuario')

describe('Gerenciar conta', () => {

    let token;
    let usuarioAutor;

    before((done) => {
        usuarioAutor = new Usuario()
        usuarioAutor.username = "author2";
        usuarioAutor.email = "author2@email.com"
        usuarioAutor.password = bcrypt.hashSync("1234");
       
       
       
        let usuario = {
            usuario: {
                email: 'author2@email.com',
                password: '1234'
            }
        }
        usuarioAutor.save(user =>{
            return chai.request(app)
            .post('/api/auth/login')
            .send(usuario)
            .end((error, response) => {
                response.should.have.status(200);
                token = response.body.usuario.token;
                // usuario = response.body.usuario; 
                return done();
            });
        }
            )
        
    });

    it('Usuário atualiza os dados de com todos os campos validos', (done) => {

        usuario = {
            usuario: {
                email: 'ifrn@teste.com',
            }
        }
        chai.request(app)
            .put('/api/usuario/')
            .set('Authorization', 'Token ' + token)
            .send(usuario)
            .end((error, response) => {
                response.should.have.status(200);
                done();
            });

    });
    afterEach(function(done){
        connection.db.dropDatabase();
        done()
    })
});