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

    it('Test for rinnovo tesserino : logged', function (done) {
        const host = "localhost:8080/api/tesserino"
        const path = "/rinnovoTesserino";
        const emailSessione = "marcorossi@gmail.com"
        const ruoloSessione = "cliente"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
            dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
            indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234567",
            email: "marcorossi@gmail.com", confermaEmail:"marcorossi@gmail.com"

        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal(true)
                done();
            }
        }); 
    })

    it('Test for rinnovo tesserino : not logged', function (done) {
        const host = "localhost:8080/api/tesserino"
        const path = "/rinnovoTesserino";
        const emailSessione = ""
        const ruoloSessione = ""
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
            dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
            indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234567",
            email: "marcorossi@gmail.com", confermaEmail:"marcorossi@gmail.com"

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

    it('Test for rinnovo tesserino : unauthorized', function (done) {
        const host = "localhost:8080/api/tesserino"
        const path = "/rinnovoTesserino";
        const emailSessione = "alessiosal@gmail.com"
        const ruoloSessione = "personale adisu"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
            dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
            indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234567",
            email: "marcorossi@gmail.com", confermaEmail:"marcorossi@gmail.com"

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

    it('Test for invio messaggio : logged', function (done) {
        const host = "localhost:8080/api/messaggio"
        const path = "/create";
        const emailSessione = "d.devito@studenti.unisa.it"
        const ruoloSessione = "personale adisu"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            conversazioneId:"61dc2b2ef27cd22144f632c1", sender:{email:emailSessione, ruolo:ruoloSessione},
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

    it('Test for invio messaggio : not logged', function (done) {
        const host = "localhost:8080/api/messaggio"
        const path = "/create";
        const emailSessione = ""
        const ruoloSessione = ""
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            conversazioneId:"61dc2b2ef27cd22144f632c1", sender:{email:emailSessione, ruolo:ruoloSessione},
            testo:"abc", dataInvio:new Date()

        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({error:"Devi effettuare il login per inviare un messaggio!"})
                done();
            }
        });
    })

    it('Test for invio messaggio : unauthorized', function (done) {
        const host = "localhost:8080/api/messaggio"
        const path = "/create";
        const emailSessione = "a.citro@studenti.unisa.it"
        const ruoloSessione = "admin"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            conversazioneId:"61dc2b2ef27cd22144f632c1", sender:{email:emailSessione, ruolo:ruoloSessione},
            testo:"abc", dataInvio:new Date()

        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({error:"Non sei autorizzato ad inviare messaggi!"})
                done();
            }
        });
    })
})