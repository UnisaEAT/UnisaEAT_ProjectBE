var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/ticket"
const path = "/insert";
const emailSessione = "francrossi@gmail.com"
const ruoloSessione = "cliente"

describe('Field test for ticket',   function  () {
  it('TC_TM_1.1',   function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "titolo",
        problema: "Problematica 1.",
        soluzione: "",
        date: "",
        email:emailSessione
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name:"titolo", message: "Errore lunghezza titolo"})
            done();
        }
    });
  })

  it('TC_TM_1.2',  function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "titolo senza puntoooo",
        problema: "Problematica 1.",
        soluzione: "",
        date: "",
        email: emailSessione
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name:"titolo", message: "Errore formato titolo (richiede .)"})
            done();
        }
    });
  })

  it('TC_TM_1.3', function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "Non riesco più ad effettuare le prenotazioni.",
        problema: "Non lo so",
        soluzione: "",
        date: "",
        email: emailSessione
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name:"problema",message: "Errore lunghezza problema"})
            done();
        }
    });
  })

  it('TC_TM_1.4', function (done) {
 
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "Non riesco più ad effettuare le prenotazioni.",
        problema: "Quando mi reco nella sezione delle prenotazioni non riesco più a visualizzare il menù",
        soluzione: "",
        date: "",
        email: emailSessione
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name:"problema",message: "Errore formato problema (richiede .)"})
            done();
        }
    });
  })

  it('TC_TM_1.5', function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "Non riesco più ad effettuare le prenotazioni.",
        problema: "Quando mi reco nella sezione delle prenotazioni non riesco più a visualizzare il menù.",
        soluzione: "",
        date: "",
        email: emailSessione
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({message:"Compilazione del ticket avvenuta con successo"})
            done();
        }
    });
  })
 

})