const app = require('../server')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const host = 'localhost:8080/api/profilo'
const path = '/updatePassword'
const ruoloSessione = 'personale adisu'
const emailSessione = 'alessiosal@gmail.com'

describe('Field test for profilo', function () {
  it('TC_PM_1.1', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        ruolo: ruoloSessione,
        email: emailSessione,
        inputOldPassword: 'qwerty',
        inputPassword: '',
        inputConfirmPassword: ''
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'inputOldPassword', message: 'Lunghezza password non corretta' })
          done()
        }
      })
  })
  it('TC_PM_1.2', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        ruolo: ruoloSessione,
        email: emailSessione,
        inputOldPassword: 'vsv”sfafa',
        inputPassword: '',
        inputConfirmPassword: ''
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({
            name: 'inputOldPassword',
            message: 'Il formato della vecchia password non è corretto.'
          })
          done()
        }
      })
  })

  it('TC_PM_1.3', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        ruolo: ruoloSessione,
        email: emailSessione,
        inputOldPassword: 'vsvsfafoaGGq',
        inputPassword: '',
        inputConfirmPassword: ''
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({
            name: 'inputOldPassword',
            message: 'Il formato della vecchia password non è corretto.'
          })
          done()
        }
      })
  })
  it('TC_PM_1.4', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        ruolo: ruoloSessione,
        email: emailSessione,
        inputOldPassword: 'psswordAAAAA123!',
        inputPassword: 'gguggu',
        inputConfirmPassword: ''
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'inputPassword', message: 'Lunghezza password non corretta' })
          done()
        }
      })
  })
  it('TC_PM_1.5', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        ruolo: ruoloSessione,
        email: emailSessione,
        inputOldPassword: 'psswordAAAAAA123!',
        inputPassword: 'fsdc”eeee',
        inputConfirmPassword: ''
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({
            name: 'inputPassword',
            message: 'Il formato della nuova password non è corretto'
          })
          done()
        }
      })
  })
  it('TC_PM_1.6', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        ruolo: ruoloSessione,
        email: emailSessione,
        inputOldPassword: 'psswordAAAAA123!',
        inputPassword: 'psswordAAAAA123!1',
        inputConfirmPassword: 'Ciao!1'
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'inputConfirmPassword', message: 'Lunghezza password non corretta' })
          done()
        }
      })
  })
  it('TC_PM_1.7', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        ruolo: ruoloSessione,
        email: emailSessione,
        inputOldPassword: 'psswordAAAAA123!',
        inputPassword: 'psswordA123!',
        inputConfirmPassword: 'fsdc”eeee'
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'inputConfirmPassword', message: 'Il formato della nuova password non è corretto' })
          done()
        }
      })
  })
  it('TC_PM_1.8', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        ruolo: ruoloSessione,
        email: emailSessione,
        inputOldPassword: 'psswordAAAAAA123!',
        inputPassword: 'psswordAAAAA123!1',
        inputConfirmPassword: 'psswordAAAAA123!'
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({
            name: 'inputConfirmPassword',
            message: 'la password inserita non corrisponde a quella del campo precedente'
          })
          done()
        }
      })
  })
  // DB
  it('TC_PM_1.9', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        ruolo: ruoloSessione,
        email: emailSessione,
        inputOldPassword: 'AlessioSalzano00!',
        inputPassword: 'psswordAAAAA123!1',
        inputConfirmPassword: 'psswordAAAAA123!1'
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'password', message: 'Modifica password avvenuta con successo.' })
          done()
        }
      })
  })

  it('TC_PM_2.1', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        ruolo: '',
        email: '',
        inputOldPassword: 'AlessioSalzano00!',
        inputPassword: 'psswordAAAAA123!1',
        inputConfirmPassword: 'psswordAAAAA123!1'
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ message: 'Devi essere loggato per accedere a questa pagina!' })
          done()
        }
      })
  })

  it('TC_PM_2.1', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        ruolo: 'cliente',
        email: 'n.cappello@studenti.unisa.it',
        inputOldPassword: 'AlessioSalzano00!',
        inputPassword: 'psswordAAAAA123!1',
        inputConfirmPassword: 'psswordAAAAA123!1'
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ message: 'Non puoi accedere a questa pagina!' })
          done()
        }
      })
  })
})
