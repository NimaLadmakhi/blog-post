const { validationResult } = require('express-validator');
const { Messages } = require('./Messages');
const { responseErrorCustom } = require('./res');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        responseErrorCustom(res, { message: Messages.InvalidInput, errors: errors.array().map((element) => element.msg) });
    }
    next();
}