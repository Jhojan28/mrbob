const LocalStrategy   = require('passport-local').Strategy;
const bcrypt = require('bcrypt')
const request = require('request-promise-native')
const { endpoint } = require('./')

module.exports = async function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    }, async function(req, email, password, done) {
        console.log("email--->", email)
        console.log("password---->", password)
        const options = {
            method: 'POST',
            url: `${endpoint}/api/login`,
            body: {
                email: email,
                password: password,
                state: 1
            },
            json: true
        }
        let result
        try {
            result = await request(options)
        } catch(e) {
            console.log("error-->",e)
            return done(e)
        }
        if (result.length === 0) return done(null, false, { message: 'Nombre de usuario incorrecto' });
        const pwd = await validPassword(password, result[0].password)
        console.log("pwd---->", pwd)
        if (!pwd) return done(null, false, { message: 'Contraseña incorrecta' })

        return done(null, result[0])
    }));

    async function validPassword(password, hash) {
        return bcrypt.compare(password, hash);
    }

}