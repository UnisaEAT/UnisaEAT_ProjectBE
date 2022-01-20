var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

/**
 * Il database va resettato e ripopolato con gli appositi scripts per il corretto funzionamento dell'integration test
 */

describe('Integration Test', function () {
  
    it('Test for create tesserino : logged', function (done) {
        const host = "localhost:8080/api/tesserino"
        const path = "/create";
        const emailSessione = "francrossi@gmail.com"
        const ruoloSessione = "cliente"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
            dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
            indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234566",
            email: "francrossi@gmail.com", confermaEmail:"francrossi@gmail.com"

        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: true})
                done();
            }
        });
    }) 

    it('Test for create tesserino : not logged', function (done) {
        const host = "localhost:8080/api/tesserino"
        const path = "/create";
        const emailSessione = ""
        const ruoloSessione = ""
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
            dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
            indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234566",
            email: "francrossi@gmail.com", confermaEmail:"francrossi@gmail.com"

        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Devi effettuare il login per poter accedere a questa pagina!"})
                done();
            }
        });
    }) 

    it('Test for create tesserino : unauthorized', function (done) {
        const host = "localhost:8080/api/tesserino"
        const path = "/create";
        const emailSessione = "alessiosal@gmail.com"
        const ruoloSessione = "personale adisu"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
            dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
            indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234566",
            email: "francrossi@gmail.com", confermaEmail:"francrossi@gmail.com"

        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Solo i clienti possono accedere a questa pagina!"})
                done();
            }
        });
    }) 

    it('Test for ricarica tesserino : logged', function (done) {
        const host = "localhost:8080/api/tesserino"
        const path = "/ricaricaTesserino";
        const emailSessione = "francrossi@gmail.com"
        const ruoloSessione = "cliente"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            email: emailSessione, ruolo:ruoloSessione, intestatario:"Francesco Rossi", numeroCarta:"4012343851244",
            tipoCarta:"Visa", dataScadenzaCarta:"12/26", cvv:"451", importo:"10.50"
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: true})
                done();
            }
        });
    })

    it('Test for ricarica tesserino : not logged', function (done) {
        const host = "localhost:8080/api/tesserino"
        const path = "/ricaricaTesserino";
        const emailSessione = ""
        const ruoloSessione = ""
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            email: emailSessione, ruolo:ruoloSessione, intestatario:"Francesco Rossi", numeroCarta:"4012343851244",
            tipoCarta:"Visa", dataScadenzaCarta:"12/26", cvv:"451", importo:"10.50"
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Devi effettuare il login per accedere a questa pagina!"})
                done();
            }
        });
    })

    it('Test for ricarica tesserino : unauthorized', function (done) {
        const host = "localhost:8080/api/tesserino"
        const path = "/ricaricaTesserino";
        const emailSessione = "alessiosal@gmail.com"
        const ruoloSessione = "personale adisu"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            email: emailSessione, ruolo:ruoloSessione, intestatario:"Francesco Rossi", numeroCarta:"4012343851244",
            tipoCarta:"Visa", dataScadenzaCarta:"12/26", cvv:"451", importo:"10.50"
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Solo i clienti possono accedere a questa pagina!"})
                done();
            }
        });
    })

})