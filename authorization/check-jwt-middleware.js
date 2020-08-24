const jwt = require('jsonwebtoken');
const {EMPTY_AUTH, FAILED_AUTH, SUCEESS_AUTH} = require('./auth-statuses');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

let checkToken = (req, res, next) => {

    console.log('Check user jwt');

    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, payload) => {
            if (err) {
                res.status(401).send({authorization: FAILED_AUTH});
            } else {
                req.userStatus = SUCEESS_AUTH;
                next();
            }
        })
    } else {
        console.log('token is empty');
        if (req.originalUrl.includes('login')) {
            req.userStatus = EMPTY_AUTH;
            next();
        } else {
            res.status(401).send({status: EMPTY_AUTH});
        }

    }
};

module.exports = {
    checkToken
}
// TODO реализовать на фронте подкладывание токена из куки, реализовать авторизацию и проверку токена
