let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
const connection = require('../../helpers/connection')


// Nossa suite de teste relacionada a artigos
describe('Notificações', () => {
    // No describe podemos passar um texto para identificação 
    before(function (done){
      
        done()
    })


    after(function(done){
        connection.db.dropDatabase();
        done()
    })

});