module.exports = app => {
  const tesserino = require('../controller/controller_tesserino')

  const router = require('express').Router()

  // Create un nuovo tesserino
  router.post('/create', tesserino.create)

  // Ricava il saldo del tesserino
  router.post('/getInfoTesserino', tesserino.getInfoTesserino)

  // Controlla se l'utente possiede già un tesserino
  router.post('/hasTesserino', tesserino.hasTesserino)

  // Controlla se il tesserino è scaduto
  router.post('/isExpired', tesserino.isExpired)

  // Ricarica il Tesserino aggiornando il saldo
  router.post('/ricaricaTesserino', tesserino.ricaricaTesserino)

  // Rinnova un tesserino ,se scaduto
  router.post('/rinnovoTesserino', tesserino.updateDataScadenza)

  app.use('/api/tesserino', router)
}
