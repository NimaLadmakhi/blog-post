const { Messages, StatusContext } = require("../help/Messages")
const { responseErrorCustom } = require("../help/res")

exports.NotFoundRoute = (req, res) => {
    responseErrorCustom(res, Messages.routeNotFound, StatusContext.notFound);
}