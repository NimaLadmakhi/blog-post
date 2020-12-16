const { StatusContext } = require("./Messages");

exports.responseErrorCatch = (res, error) => {
    return res.status(statusCode).json({ message: error.message });
}

exports.responseErrorCustom = (res, body, statusCode = StatusContext.internalError) => {
    return res.status(statusCode).json(typeof body === 'string' ? { message: body } : body);
}


exports.responseOk = (res, body) => {
    return res.status(200).json(typeof body === 'string' ? { message: body } : body);
}