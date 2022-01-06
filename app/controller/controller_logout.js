exports.logout = (req, res) => {

    req.session.destroy((err) => {
        //delete session data from store, using sessionID in cookie
        if (err) throw err;
        res.json(true);
        return;
    });

}