var jwt = require('express-jwt');

function getTokenFromRequestHeader(req) {
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Token') {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

var auth = {
    required: jwt({
        secret: 'clarim',
        algorithms: ['HS256'],
        userProperty: 'payload',
        getToken: getTokenFromRequestHeader
    }),
    optional: jwt({
        secret: 'clarim',
        algorithms: ['HS256'],
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromRequestHeader
    })
};

module.exports = auth;