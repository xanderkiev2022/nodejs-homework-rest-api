const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const { UnauthorizedError } = require("../helpers/errors");

const authMiddleware = async (req, res, next) => {    
    try {
        const { authorization } = req.headers;
        if (!authorization) {next(new UnauthorizedError("Token and tokenType are missing"));}

        const [tokenType, token] = authorization.split(" ");
        if (!token || tokenType !== 'Bearer') {next(new UnauthorizedError("Token / tokenType is missing"));}

        const { id } = jwt.decode(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
          next(new UnauthorizedError("Invalid token"));
        }
        
        if (user.verify === false) {
        next(new UnauthorizedError("Please verify your email"));
        }

        req.user = user;
        next();
    } catch (error) {
        next(new UnauthorizedError("Not authorized"));
    }
}

module.exports = {
  authMiddleware,
};