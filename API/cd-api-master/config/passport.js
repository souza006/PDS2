var mongoose = require('mongoose');
var bcrypt = require("bcryptjs");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Usuario = mongoose.model('Usuario');

passport.use(new LocalStrategy({
    usernameField: 'usuario[email]',
    passwordField: 'usuario[password]'
},
    function (email, password, done) {
        Usuario.findOne({
            email: email
        }, function (err, usuario) {
            if (err) {
                return done(err);
            }

            if (!usuario) {
                return done(null, false, { message: 'Email incorreto.' });
            }

            var senhaCorreta = bcrypt.compareSync(
                password,
                usuario.password
            );

            if (!senhaCorreta) {
                return done(null, false, { message: 'Senha incorreta.' });
            }

            return done(null, usuario);
        })
    }
))