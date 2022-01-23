module.exports = app => {
  const menu = require('../controller/controller_menu')

  const router = require('express').Router()

  router.get('/sceltaMenu', menu.scelatamenu)
  router.post('/visualizzaMenu', menu.visualizzamenu)
  router.post('/inserisciMenu', menu.inseriscimenu)
  router.post('/modificaMenu', menu.modificamenu)
  app.use('/api/menu', router)
}
