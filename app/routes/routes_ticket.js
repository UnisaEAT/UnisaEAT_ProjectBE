module.exports = app => {
  const ticket = require('../controller/controller_ticket')

  const router = require('express').Router()

  router.post('/insert', ticket.insert)
  router.post('/select', ticket.select)
  router.post('/update', ticket.update)
  router.post('/utente', ticket.utente)

  app.use('/api/ticket', router)
}
