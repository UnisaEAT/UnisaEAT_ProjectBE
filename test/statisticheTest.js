const app = require('../server')
const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const host = 'localhost:8080/api/statistica'
const path = '/findAll'
const ruoloSessione = 'operatore mensa'

describe('Field test for Statistiche', function () {
  it('Find All Statistiche', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
      .send({
        ruolo: ruoloSessione

      })
      .end(function (error, response, body) {
        if (error) {
          console.log(error)
        } else {
          expect(response.body).to.not.null
          done()
        }
      })
  })
})
