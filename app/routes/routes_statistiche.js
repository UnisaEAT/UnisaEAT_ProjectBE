module.exports = app => {
  const statistica = require('../controller/controller_statistiche')

  const router = require('express').Router()

  // Retrieve all Statistiche
  router.post('/findAll', statistica.findAll)

  app.use('/api/statistica', router)
}
