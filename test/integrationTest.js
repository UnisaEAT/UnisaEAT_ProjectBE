const app = require ("../server")
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

    it('Test for modifica messaggio : logged', function (done) {
        const host = "localhost:8080/api/messaggio"
        const path = "/modifyMessage";
        const emailSessione = "d.devito@studenti.unisa.it"
        const ruoloSessione = "personale adisu"
    
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

    it('Test for modifica messaggio : not logged', function (done) {
        const host = "localhost:8080/api/messaggio"
        const path = "/modifyMessage";
        const emailSessione = ""
        const ruoloSessione = ""
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            idMessaggio:"61e3e98a760bad9f9bc8c064", nuovoTesto:"abcd", email:emailSessione, ruolo:ruoloSessione

        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({"error":"Devi essere loggato per modificare un messaggio!"})
                done();
            }
        });
    })

    it('Test for modifica messaggio : unauthorized', function (done) {
        const host = "localhost:8080/api/messaggio"
        const path = "/modifyMessage";
        const emailSessione = "a.citro@studenti.unisa.it"
        const ruoloSessione = "admin"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            idMessaggio:"61e3e98a760bad9f9bc8c064", nuovoTesto:"abcd", email:emailSessione, ruolo:ruoloSessione

        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({"error":"Non sei autorizzato a modificare messaggi!"})
                done();
            }
        });
    })

    it('Test for inserimento personale adisu : logged', function (done) {
        const host = "localhost:8080/api/personale"
        const path = "/insert";
        const ruoloSessione = "admin"

        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "LucaBianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: "Ilsolesplende97!"
    
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

    it('Test for inserimento personale adisu : not logged', function (done) {
        const host = "localhost:8080/api/personale"
        const path = "/insert";
        const ruoloSessione = ""

        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "LucaBianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: "Ilsolesplende97!"
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Devi essere loggato per accedere a questa pagina!"})
                done();
            }
        });
    })

    it('Test for inserimento personale adisu : unauthorized', function (done) {
        const host = "localhost:8080/api/personale"
        const path = "/insert";
        const ruoloSessione = "cliente"

        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "LucaBianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: "Ilsolesplende97!"
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Non puoi accedere a questa pagina!"})
                done();
            }
        });
    })

    it('Test for inserimento operatore mensa : logged', function (done) {
        const host = "localhost:8080/api/personale"
        const path = "/insert";
        const ruoloSessione = "personale adisu"

        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "Bianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: "Ilsolesplende97!"
    
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

    it('Test for inserimento operatore mensa : not logged', function (done) {
        const host = "localhost:8080/api/personale"
        const path = "/insert";
        const ruoloSessione = ""

        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "Bianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: "Ilsolesplende97!"
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Devi essere loggato per accedere a questa pagina!"})
                done();
            }
        });
    })

    it('Test for inserimento operatore mensa : unauthorized', function (done) {
        const host = "localhost:8080/api/personale"
        const path = "/insert";
        const ruoloSessione = "cliente"

        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "Bianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: "Ilsolesplende97!"
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Non puoi accedere a questa pagina!"})
                done();
            }
        });
    })

    it('Test for compilazione ticket : logged', function (done) {
        const host = "localhost:8080/api/ticket"
        const path = "/insert";
        const emailSessione = "francrossi@gmail.com"
        const ruoloSessione = "cliente"

        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            titolo: "Non riesco più ad effettuare le prenotazioni.",
            problema: "Quando mi reco nella sezione delle prenotazioni non riesco più a visualizzare il menù.",
            soluzione: "",
            date: "",
            email: emailSessione,
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

    it('Test for compilazione ticket : not logged', function (done) {
        const host = "localhost:8080/api/ticket"
        const path = "/insert";
        const emailSessione = ""
        const ruoloSessione = ""

        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            titolo: "Non riesco più ad effettuare le prenotazioni.",
            problema: "Quando mi reco nella sezione delle prenotazioni non riesco più a visualizzare il menù.",
            soluzione: "",
            date: "",
            email: emailSessione,
            ruolo: ruoloSessione
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message:"Devi effettuare il login per inserire un ticket!"})
                done();
            }
        });
    })

    it('Test for compilazione ticket : unauthorized', function (done) {
        const host = "localhost:8080/api/ticket"
        const path = "/insert";
        const emailSessione = "a.citro@studenti.unisa.it"
        const ruoloSessione = "admin"

        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            titolo: "Non riesco più ad effettuare le prenotazioni.",
            problema: "Quando mi reco nella sezione delle prenotazioni non riesco più a visualizzare il menù.",
            soluzione: "",
            date: "",
            email: emailSessione,
            ruolo: ruoloSessione
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message:"Non puoi compilare un ticket!"})
                done();
            }
        });
    })

    it('Test for risoluzione ticket : logged', function (done) {
        const host = "localhost:8080/api/ticket"
        const path = "/update";
        const emailSessione = "a.citro@studenti.unisa.it"
        const ruoloSessione = "admin"

    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            titolo: "",
            problema: "",
            soluzione: "Non si deve recare nella pagina degli ordini ma quella del menù.",
            date: "",
            email:emailSessione,
            ruolo:ruoloSessione
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

    it('Test for risoluzione ticket : not logged', function (done) {
        const host = "localhost:8080/api/ticket"
        const path = "/update";
        const emailSessione = ""
        const ruoloSessione = ""

    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            titolo: "",
            problema: "",
            soluzione: "Non si deve recare nella pagina degli ordini ma quella del menù.",
            date: "",
            email:emailSessione,
            ruolo:ruoloSessione
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message:"Devi effettuare il login per inserire un ticket!"})
                done();
            }
        });
    })

    it('Test for risoluzione ticket : unauthorized', function (done) {
        const host = "localhost:8080/api/ticket"
        const path = "/update";
        const emailSessione = "n.cappello@studenti.unisa.it"
        const ruoloSessione = "cliente"

    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            titolo: "",
            problema: "",
            soluzione: "Non si deve recare nella pagina degli ordini ma quella del menù.",
            date: "",
            email:emailSessione,
            ruolo:ruoloSessione
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message:"Non puoi risolvere un ticket!"})
                done();
            }
        });
    })

    it('Test for inserimento domanda in FAQ : logged', function (done) {

        const host = "localhost:8080/api/faq"
        const path = "/insertFAQ";
        const emailSessione = "alessiosal@gmail.com";
        const ruoloSessione = "personale adisu"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            domanda: "Prova lunga domanda per cambiare se c'è nel db?",
            risposta:"Bisogna recarsi su pagamento pasto.",
            email: emailSessione,
            ruolo: ruoloSessione
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

    it('Test for inserimento domanda in FAQ : not logged', function (done) {

        const host = "localhost:8080/api/faq"
        const path = "/insertFAQ";
        const emailSessione = "";
        const ruoloSessione = ""
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            domanda: "Prova lunga domanda per cambiare se c'è nel db?",
            risposta:"Bisogna recarsi su pagamento pasto.",
            email: emailSessione,
            ruolo: ruoloSessione
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Devi aver effettuato l'accesso per accedere a questa pagina!"})
                done();
            }
        });
    })

    it('Test for inserimento domanda in FAQ : unauthorized', function (done) {

        const host = "localhost:8080/api/faq"
        const path = "/insertFAQ";
        const emailSessione = "alex@gmail.com";
        const ruoloSessione = "operatore mensa"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            domanda: "Prova lunga domanda per cambiare se c'è nel db?",
            risposta:"Bisogna recarsi su pagamento pasto.",
            email: emailSessione,
            ruolo: ruoloSessione
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Non puoi accedere a questa pagina!"})
                done();
            }
        });
    })

    it('Test for modifica domanda in FAQ : logged', function (done) {
        
        const host = "localhost:8080/api/faq"
        const path = "/updateFAQ";
        const emailSessione = "alessiosal@gmail.com";
        const ruoloSessione = "personale adisu"

        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            domanda:"Domanda da cercare lunga?",
            newdomanda: "Prova lunga domanda per cambiare se c'è nel db?",
            newrisposta:"Bisogna recarsi su pagamento pasto.",
            email:emailSessione,
            ruolo:ruoloSessione
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

    it('Test for modifica domanda in FAQ : not logged', function (done) {
        
        const host = "localhost:8080/api/faq"
        const path = "/updateFAQ";
        const emailSessione = "";
        const ruoloSessione = ""

        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            domanda:"Domanda da cercare lunga?",
            newdomanda: "Prova lunga domanda per cambiare se c'è nel db?",
            newrisposta:"Bisogna recarsi su pagamento pasto.",
            email:emailSessione,
            ruolo:ruoloSessione
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Devi aver effettuato l'accesso per accedere a questa pagina!"})
                done();
            }
        });
    })

    it('Test for modifica domanda in FAQ : unauthorized', function (done) {
        
        const host = "localhost:8080/api/faq"
        const path = "/updateFAQ";
        const emailSessione = "alex@gmail.com";
        const ruoloSessione = "operatore mensa"

        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            domanda:"Domanda da cercare lunga?",
            newdomanda: "Prova lunga domanda per cambiare se c'è nel db?",
            newrisposta:"Bisogna recarsi su pagamento pasto.",
            email:emailSessione,
            ruolo:ruoloSessione
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Non puoi accedere a questa pagina!"})
                done();
            }
        });
    })

    it('Test for modifica password : logged', function (done) {

        const host = "localhost:8080/api/profilo"
        const path = "/updatePassword";
        const emailSessione = "alessiosal@gmail.com";
        const ruoloSessione = "personale adisu"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo :ruoloSessione,
            email :emailSessione,
            inputOldPassword:"AlessioSalzano00!",
            inputPassword:"psswordAAAAA123!1",
            inputConfirmPassword:"psswordAAAAA123!1"
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "password", message: "Modifica password avvenuta con successo."})
                done();
            }
        });
    })

    it('Test for modifica password : not logged', function (done) {

        const host = "localhost:8080/api/profilo"
        const path = "/updatePassword";
        const emailSessione = "";
        const ruoloSessione = ""
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo :ruoloSessione,
            email :emailSessione,
            inputOldPassword:"AlessioSalzano00!",
            inputPassword:"psswordAAAAA123!1",
            inputConfirmPassword:"psswordAAAAA123!1"
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Devi essere loggato per accedere a questa pagina!"})
                done();
            }
        });
    })

    it('Test for modifica password : unauthorized', function (done) {

        const host = "localhost:8080/api/profilo"
        const path = "/updatePassword";
        const emailSessione = "n.cappello@studenti.unisa.it";
        const ruoloSessione = "cliente"
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo :ruoloSessione,
            email :emailSessione,
            inputOldPassword:"AlessioSalzano00!",
            inputPassword:"psswordAAAAA123!1",
            inputConfirmPassword:"psswordAAAAA123!1"
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "Non puoi accedere a questa pagina!"})
                done();
            }
        });
    })

    it('Test for login', function (done) {

        const host = "localhost:8080/api/login"
        const path = "/login";
      
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            email: "a.alessio@studenti.unisa.it",//Email nel db
            password:"Alessiosalzano1!" 
            
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({ email:"a.alessio@studenti.unisa.it" , ruolo: "cliente" })
                done();
            }
        });
      })

})