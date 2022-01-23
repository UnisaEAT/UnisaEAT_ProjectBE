const app = require('../server')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const host = 'localhost:8080/api/faq'
const path = '/insertFAQ'
const emailSessione = 'alessiosal@gmail.comm'
const ruoloSessione = 'personale adisu'

const path2 = '/updateFAQ'

describe('Field test for faq', function () {
  it('TC_FM_1.1', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: 'Come pago?',
        risposta: '',
        email: emailSessione,
        ruolo: ruoloSessione
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'domanda', message: 'Lunghezza della domanda non corretta' })
          done()
        }
      })
  })

  it('TC_FM_1.2', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: 'Come pago un ordine prenotato',
        risposta: '',
        email: emailSessione,
        ruolo: ruoloSessione
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'domanda', message: 'Formato della domanda non corretto (richiede ? oppure una lettera maiuscola iniziale)' })
          done()
        }
      })
  })
  it('TC_FM_1.3', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: 'Come pago un ordine prenotato?',
        risposta: 'Pagina pagamento.',
        email: emailSessione,
        ruolo: ruoloSessione
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'risposta', message: 'Lunghezza della risposta non corretta' })
          done()
        }
      })
  })

  it('TC_FM_1.4', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: 'Come pago un ordine prenotato?',
        risposta: 'Bisogna recarsi su pagamento pasto',
        email: emailSessione,
        ruolo: ruoloSessione
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'risposta', message: 'Formato della riposta non corretto (richiede . oppure una lettera maiuscola iniziale)' })
          done()
        }
      })
  })

  it('TC_FM_1.5', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: "Prova lunga domanda per cambiare se c'è nel db?",
        risposta: 'Bisogna recarsi su pagamento pasto.',
        email: emailSessione,
        ruolo: ruoloSessione
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ message: 'Inserimento avvenuto con successo.' })
          done()
        }
      })
  })
  it('TC_FM_2.1', function (done) {
    chai.request(host).post(path2).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: 'Domanda da cercare lunga?',
        newdomanda: 'Come pago?',
        newrisposta: '',
        email: emailSessione,
        ruolo: ruoloSessione
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'newdomanda', message: 'Lunghezza della domanda non corretta' })
          done()
        }
      })
  })

  it('TC_FM_2.2', function (done) {
    chai.request(host).post(path2).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: 'Domanda da cercare lunga?',
        newdomanda: 'Come pago un ordine prenotato',
        newrisposta: '',
        email: emailSessione,
        ruolo: ruoloSessione
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'newdomanda', message: 'Formato della domanda non corretto (richiede ? oppure la lettera iniziale maiuscola)' })
          done()
        }
      })
  })

  it('TC_FM_2.3', function (done) {
    chai.request(host).post(path2).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: 'Domanda da cercare lunga?',
        newdomanda: 'Come pago un ordine prenotato?',
        newrisposta: 'Pagina pagamento.',
        email: emailSessione,
        ruolo: ruoloSessione
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'newrisposta', message: 'Lunghezza della risposta non corretta' })
          done()
        }
      })
  })

  it('TC_FM_2.4', function (done) {
    chai.request(host).post(path2).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: 'Domanda da cercare lunga?',
        newdomanda: 'Come pago un ordine prenotato?',
        newrisposta: 'Bisogna recarsi su pagamento pasto',
        email: emailSessione,
        ruolo: ruoloSessione
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'newrisposta', message: 'Formato della riposta non corretto (richiede . oppure la lettera iniziale maiuscola)' })
          done()
        }
      })
  })

  it('TC_FM_2.5', function (done) {
    chai.request(host).post(path2).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: 'Domanda da cercare lunga?',
        newdomanda: "Prova lunga domanda per cambiare se c'è nel db?",
        newrisposta: 'Bisogna recarsi su pagamento pasto.',
        email: emailSessione,
        ruolo: ruoloSessione
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ message: 'Modifica avvenuta con successo' })
          done()
        }
      })
  })

  it('TC_FM_3.1', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: 'Domanda da cercare lunga?',
        newdomanda: "Prova lunga domanda per cambiare se c'è nel db?",
        newrisposta: 'Bisogna recarsi su pagamento pasto.',
        email: '',
        ruolo: ''
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ message: "Devi aver effettuato l'accesso per accedere a questa pagina!" })
          done()
        }
      })
  })

  it('TC_FM_3.2', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: 'Domanda da cercare lunga?',
        newdomanda: "Prova lunga domanda per cambiare se c'è nel db?",
        newrisposta: 'Bisogna recarsi su pagamento pasto.',
        email: 'n.cappello@studenti.unisa.it',
        ruolo: 'cliente'
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

  it('TC_FM_3.3', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: '',
        risposta: '',
        email: 'n.cappello@studenti.unisa.it',
        ruolo: 'personale adisu'
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'domanda', message: 'Domanda non può essere vuoto' })
          done()
        }
      })
  })

  it('TC_FM_3.4', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        domanda: 'Esempio domanda esempio domanda?',
        risposta: '',
        email: 'n.cappello@studenti.unisa.it',
        ruolo: 'personale adisu'
      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.deep.equal({ name: 'risposta', message: 'Risposta non può essere vuoto' })
          done()
        }
      })
  })
})
