const jwt = require('jsonwebtoken');
const { DecodeToken } = require('./generateToken');
const { StatusContext, Messages } = require('./Messages');
const { responseErrorCustom } = require('./res');

module.exports = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const token = req.headers.authorization.split('Bearer ')[1];
        const tokenDecode = DecodeToken(token);
        if (tokenDecode.exp * 1000 >= Date.now()) {
            req.user = tokenDecode._id;
            return next();
        }
        return;
    }
    return responseErrorCustom(res, Messages.user.unAuth, StatusContext.unAuthorized);
}