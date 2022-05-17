
require('dotenv').config()
var mongoose = require('mongoose');
let connect 
if(process.env.ENV){
  connect = mongoose.connect(process.env.DB_TESTE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set('useCreateIndex', true);
  mongoose.set('debug', false);
  
  connect.then((db) => {
    console.log('Banco de Desenvolvimento👩‍💻');
  }, (err) => {
    console.log(err);
  });

}else {
   connect = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set('useCreateIndex', true);
  mongoose.set('debug', true);
  
  connect.then((db) => {
    console.log('Banco de Producao!🚀');
  }, (err) => {
    console.log(err);
  });
}

module.exports= mongoose.createConnection(process.env.DB_TESTE, { autoIndex: false });