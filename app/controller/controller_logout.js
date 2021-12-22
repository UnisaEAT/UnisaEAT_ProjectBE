exports.logout = (req, res) => {
    delete req.session;
}