var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/messaggio"
const path = "/create";

describe('Field test Chat', function () {
  
  it('TC_CM_1.1', function (done) {


    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        conversazioneId:"61dc2b2ef27cd22144f632c1", sender:{email:"d.devito@studenti.unisa.it", ruolo:"personale adisu"},
        testo:"", dataInvio:new Date()

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

  it('TC_CM_1.2', function (done) {


    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        conversazioneId:"61dc2b2ef27cd22144f632c1", sender:{email:"d.devito@studenti.unisa.it", ruolo:"personale adisu"},
        testo:"abc", dataInvio:new Date()

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.have.own.property('testo')
            done();
        }
    });
  })

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