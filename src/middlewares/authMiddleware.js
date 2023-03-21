const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { UnauthorizedError } = require("../helpers/errors");

const authMiddleware = async (req, res, next) => {    
    try {
        const { authorization } = req.headers;
        if (!authorization) {next(new UnauthorizedError("Not authorized. Please, provide a token in authorization headers"));}

        const [tokenType, token] = authorization.split(" ");
        console.log("tokenType :>> ", tokenType);
        if (!token) {next(new UnauthorizedError("Not authorized. Please, provide a token"));}

        const { _id } = jwt.decode(token, process.env.JWT_SECRET);
        const user = await User.findById(_id);
        if (!user || user.token !== token ) { next(new UnauthorizedError("Invalid token")); }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        next(new UnauthorizedError("Not authorized"));
    }
}

module.exports = {
  authMiddleware,
};
