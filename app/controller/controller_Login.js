var hash = require('./hash.js')
var clientmodel = require('../models/cliente.js')
var personalemodel = require('../models/personale.js')
var adminmodel = require('../models/admin.js')
    /**
     * This method authenticates the user to the system
     * @param {Object} req - The HTTP request
     * @param {Object} res - The HTTP response
     * @returns {Boolean}  - It returns true if login was successfull, else false
     */
exports.login = function(req, res) {
    return new Promise(function(resolve, reject) {
            // take form parameters
            var email = req.body.email
            var password = req.body.password

            // form validation
            var isRight = true
            if ((email == null) || (email.length <= 1) || (!/^[a-z].[a-z]+[1-9]/.test(email))) {
                if (!/^[a-z].[a-z]+[1-9]/.test(email)) {
                    if (!/[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9]){1,}?/.test(email)) {
                        res.cookie('errUsername', '1')
                        isRight = false
                    }
                }
            }

            if ((password == null) || (password.length <= 7) || (!new RegExp('^[A-Za-z0-9\s]+$').test(password))) {
                res.cookie('errPassword', '1')
                isRight = false
            }

            if (!isRight) {
                resolve(false)
                return
            }

            var checkclient = clientmodel.findByEmail(email)

            checkclient.then(function(resultc) {
                if (resultc == null) {
                    var checkpersonale = personalemodel.findByEmail(email)
                    checkpersonale.then(function(resultp) {
                        if (resultp == null) {
                            var checkadmin = adminmodel.findByEmail(email)
                            checkadmin.then(function(resultAd) {
                                if (resultAd == null) {
                                    res.cookie('errore login', '1')
                                    resolve(false)
                                } else {
                                    if (hash.checkPassword(resultAd.Password().hash, resultAd.Password().salt, password)) {
                                        var adminSession = {
                                            utente: resultAd,
                                            type: 'admin',
                                            ruolo: 'personale adisu'

                                        }
                                        res.cookie('loginEffettuato', '1')
                                        resolve(adminSession)
                                    } else {
                                        res.cookie('errore Login', '1')
                                        resolve(false)
                                    }
                                }
                            })
                        } else {
                            if (hash.checkPassword(resultp.Password().hash, resultp.Password().salt, password) && (result.ruolo = 'Personale ADISU')) {
                                var PersonaleadisuSession = {
                                    utente: resultp,
                                    type: 'Personale ADISU',
                                    ruolo: 'operatore mensa',
                                    email: resultp.email,

                                }
                                res.cookie('login effetuato', '1')
                                resolve(PersonaleadisuSession)
                            } else {
                                res.cookie('errore login', '1')
                                resolve(false)
                            }
                        }
                    })
                } else {
                    if (hash.checkPassword(resultp.Password().hash, resultp.Password().salt, password) && (result.ruolo = 'Operatore mensa')) {
                        var OperatoreMenseSession = {
                            utente: resultA,
                            email: resultp.email,
                            type: 'operatore mensa'
                        }
                        res.cookie('login effetuato', '1')
                        resolve(OperatoreMenseSession)
                    } else {
                        res.cookie('errore login', '1')
                        resolve(false)

                    }
                }
            })
            if (hash.checkPassword(resultc.Password().hash, resultc.Password().salt, password))
                var ClienteSession = {
                    email: resultc.email,
                    utente: resultc,
                    type: 'Cliente'
                }
            res.cookie('login effetuato', '1')
            resolve(ClienteSession)

        }

    )
}