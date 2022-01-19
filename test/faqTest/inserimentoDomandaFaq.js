var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/faq"
const path = "/insertFAQ";
const emailSessione = "francrossi@gmail.com"
const ruoloSessione = "cliente"

describe('Field test for faq',   function  () {
  it('TC_FM_1.1',   function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        domanda: "Come pago?",
        risposta:""
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({message: "Lunghezza della domanda non corretta"})
            done();
        }
    });
  })

  it('TC_FM_1.2',  function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        domanda: "Come pago un ordine prenotato",
        risposta:""
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
  it('TC_FM_1.3', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        domanda: "Come pago un ordine prenotato?",
        risposta:"Pagina pagamento."
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

  it('TC_FM_1.4', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        domanda: "Come pago un ordine prenotato?",
        risposta:"Bisogna recarsi su pagamento pasto"
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

  it('TC_FM_1.5', function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        domanda: "Prova lunga domanda per cambiare se c'è nel db?",
        risposta:"Bisogna recarsi su pagamento pasto."
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({message: "Inserimento avvenuto con successo."})
            done();
        }
    });
  })
 

})