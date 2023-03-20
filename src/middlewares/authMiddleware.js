const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
    const [tokenType, token] = req.headers["authorization"].split(' ');

    console.log("tokenType :>> ", tokenType);
    if (!token) { next(new UnauthorizedError('Please, provide a token')); }
    
    try {
        const user = jwt.decode(token, process.env.JWT_SECRET);
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        next(new UnauthorizedError("Invalid token"));
    }
}

module.exports = {
  authMiddleware,
};
