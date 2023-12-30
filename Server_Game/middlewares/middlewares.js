module.exports = async(req, res, next) => {
    res.status(500).send('Something broke!');
    next()
}