exports.logout = (req, res) => {

    req.session.destroy((err) => {
        //cancella la sessione salvata, usando il sessionID nei cookie
        if (err) throw err;
        res.json(true);
        return;
    });

}