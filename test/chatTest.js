const app = require('../server')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const host = 'localhost:8080/api/messaggio'
const path = '/create'
const emailSessione = 'd.devito@studenti.unisa.it'
const ruoloSessione = 'personale adisu'

const path2 = '/modifyMessage'

describe('Field test for Chat', function () {
  it('TC_CM_1.1', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        conversazioneId: '61dc2b2ef27cd22144f632c1',
        sender: { email: emailSessione, ruolo: ruoloSessione },
        testo: '',
        dataInvio: new Date()

      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ error: true, message: 'Lunghezza del messaggio non corretta!' })
          done()
        }
      })
  })

  it('TC_CM_1.2', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        conversazioneId: '61dc2b2ef27cd22144f632c1',
        sender: { email: emailSessione, ruolo: ruoloSessione },
        testo: 'abc',
        dataInvio: new Date()

      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.have.own.property('testo')
          done()
        }
      })
  })

  it('TC_CM_2.1', function (done) {
    chai.request(host).post(path2).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        idMessaggio: '61e3e98a760bad9f9bc8c064', nuovoTesto: '', email: emailSessione, ruolo: ruoloSessione

      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ error: true, message: 'Lunghezza del messaggio non corretta!' })
          done()
        }
      })
  })

  it('TC_CM_2.2', function (done) {
    chai.request(host).post(path2).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        idMessaggio: '61e3e98a760bad9f9bc8c064', nuovoTesto: 'abcd', email: emailSessione, ruolo: ruoloSessione

      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.equal(true)
          done()
        }
      })
  })

  it('TC_CM_3.1', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        conversazioneId: '61dc2b2ef27cd22144f632c1',
        sender: { email: '', ruolo: '' },
        testo: '',
        dataInvio: new Date()

      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ error: 'Devi effettuare il login per inviare un messaggio!' })
          done()
        }
      })
  })

  it('TC_CM_3.2', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        conversazioneId: '61dc2b2ef27cd22144f632c1',
        sender: { email: emailSessione, ruolo: 'admin' },
        testo: 'abc',
        dataInvio: new Date()

      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ error: 'Non sei autorizzato ad inviare messaggi!' })
          done()
        }
      })
  })
})
