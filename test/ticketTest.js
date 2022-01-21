const app = require("../server");
var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/ticket"
const path = "/insert";
const path2 = "/update"

const emailSessione = "francrossi@gmail.com"
const ruoloSessione = "cliente"

const emailSessione2 = "a.citro@studenti.unisa.it"
const ruoloSessione2 = "admin"

describe('Field test for ticket',   function  () {
  it('TC_TM_1.1',   function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "titolo",
        problema: "Problematica 1.",
        soluzione: "",
        date: "",
        email:emailSessione,
        ruolo: ruoloSessione
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
        email:emailSessione,
        ruolo: ruoloSessione
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
        email:emailSessione,
        ruolo: ruoloSessione
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
        email:emailSessione,
        ruolo: ruoloSessione
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
        email:emailSessione,
        ruolo: ruoloSessione
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
  it('TC_TM_2.1',   function (done) {
    
    chai.request(host).post(path2).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "",
        problema: "",
        soluzione: "Non si deve",
        date: "",
        email:emailSessione2,
        ruolo: ruoloSessione2
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name:"soluzione", message: "Errore lunghezza soluzione"})
            done();
        }
    });
  })

  it('TC_TM_2.2',  function (done) {
    
    chai.request(host).post(path2).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "",
        problema: "",
        soluzione: "non si deve recare nella pagina degli ordini ma quella del menù",
        date: "",
        email:emailSessione2,
        ruolo: ruoloSessione2
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name:"soluzione", message: "Errore formato soluzione"})
            done();
        }
    });
  })

  it('TC_TM_2.3', function (done) {
    
    chai.request(host).post(path2).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "",
        problema: "",
        soluzione: "Non si deve recare nella pagina degli ordini ma quella del menù.",
        date: "",
        email:emailSessione2,
        ruolo: ruoloSessione2
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({message:"Soluzione del ticket avvenuta con successo"})
            done();
        }
    });
  })

 

})