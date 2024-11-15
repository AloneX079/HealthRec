const asynchandler = (requestHandler) => {
    return async (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => {
            res.status(err.statusCode || 500).json(err)
            next(err);
        })
    }
}
module.exports = asynchandler;