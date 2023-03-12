// отримуємо актуальну версію бази даних

const getCollections = require

module.exports = (req, res, next) => {
    const collections = getCollections();
    req.db = { ...collections };
    next();
}