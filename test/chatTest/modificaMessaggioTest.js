var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/messaggio"
const path = "/modifyMessage";
const emailSessione = "d.devito@studenti.unisa.it"
const ruoloSessione = "personale adisu"

describe('Field test for modifica messaggio', function () {
  
  it('TC_CM_2.1', function (done) {


    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        idMessaggio:"61e3e98a760bad9f9bc8c064", nuovoTesto:"", email:emailSessione, ruolo:ruoloSessione

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({error: true, message: "Lunghezza del messaggio non corretta!" })
            done();
        }
    });
  })

  it('TC_CM_2.2', function (done) {


    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        idMessaggio:"61e3e98a760bad9f9bc8c064", nuovoTesto:"abcd", email:emailSessione, ruolo:ruoloSessione

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.equal(true)
            done();
        }
    });
  })

})