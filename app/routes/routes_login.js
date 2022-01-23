module.exports = app => {
  const login = require('../controller/controller_login')

  const router = require('express').Router()

  // Post di login
  router.post('/login', login.login)

  app.use('/api/login', router)
}
