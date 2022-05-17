let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let app = require('../../app')
chai.use(chaiHttp);
var mongoose = require('mongoose');
let Usuario = mongoose.model('Usuario')
let Artigo = mongoose.model('Artigo')
var bcrypt = require("bcryptjs");
const connection = require('../../helpers/connection')
// Nossa suite de teste relacionada a artigos
describe('Artigos', () => {
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
    artigoMock.listaTags =['Espanha1']
    artigoMock.save((artigo)=>done())
   

   
})

  // No describe podemos passar um texto para identificação 
  describe('/GET Artigos', () => {
    it('Testando GET todos os Artigos', (done) => {
      chai.request('http://localhost:8080') // Endereço do servidor
        .get('/api/artigos') // endpoint que vamos testar
        .end((err, res) => { // testes a serem realizados
          res.should.have.status(200); // verificando se o retorno e um status code 200
          // res.body.should.be.a('array'); // Verificando se o retorno e um array
          done();
        });
    });
  });

  after(function(done){
    connection.db.dropDatabase();
    done()
})

});