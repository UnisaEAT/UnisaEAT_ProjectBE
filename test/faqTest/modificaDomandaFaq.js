var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/faq"
const path = "/updateFAQ";


describe('Field test for faq',   function  () {
  it('TC_FM_2.1',   function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        domanda:"Domanda da cercare lunga?",
        newdomanda: "Come pago?",
        newrisposta:""
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({message: "Lunghezza della domanda non corretta" })
            done();
        }
    });
  })

  it('TC_FM_2.2',  function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        domanda:"Domanda da cercare lunga?",
        newdomanda: "Come pago un ordine prenotato",
        newrisposta:""
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({message: "Formato della domanda non corretto (richiede ?)"})
            done();
        }
    });
  })
  it('TC_FM_2.3', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        domanda:"Domanda da cercare lunga?",
        newdomanda: "Come pago un ordine prenotato?",
        newrisposta:"Pagina pagamento."
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({message: "Lunghezza della risposta non corretta"})
            done();
        }
    });
  })

  it('TC_FM_2.4', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        domanda:"Domanda da cercare lunga?",
        newdomanda: "Come pago un ordine prenotato?",
        newrisposta:"Bisogna recarsi su pagamento pasto"
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({message: "Formato della riposta non corretto (richiede .)"})
            done();
        }
    });
  })

  it('TC_FM_2.5', function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        domanda:"Domanda da cercare lunga?",
        newdomanda: "Prova lunga domanda per cambiare se c'è nel db?",
        newrisposta:"Bisogna recarsi su pagamento pasto."
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({message: "Modifica avvenuta con successo"})
            done();
        }
    });
  })
 

})