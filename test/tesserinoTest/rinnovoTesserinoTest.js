var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/tesserino"
const path = "/rinnovoTesserino";
const emailSessione = "marcorossi@gmail.com"
const ruoloSessione = "cliente"

describe('Field test for rinnovo tesserino', function () {
  
  it('TC_TDM_2.1', function (done) {


    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"", nome:"",
        dataDiNascita: "", provinciaDiNascita: "", comuneDiNascita:"", cittadinanza: "", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "cognome", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_2.2', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi112", nome:"",
        dataDiNascita: "", provinciaDiNascita: "", comuneDiNascita:"", cittadinanza: "", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "cognome", message: "Formato cognome non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.3', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"",
        dataDiNascita: "", provinciaDiNascita: "", comuneDiNascita:"", cittadinanza: "", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "nome", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_2.4', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco12#3",
        dataDiNascita: "", provinciaDiNascita: "", comuneDiNascita:"", cittadinanza: "", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "nome", message: "Formato nome non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.5', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "", provinciaDiNascita: "", comuneDiNascita:"", cittadinanza: "", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "dataDiNascita", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_2.6', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "111/40/2000", provinciaDiNascita: "", comuneDiNascita:"", cittadinanza: "", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "dataDiNascita", message: "Formato data non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.7', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "", comuneDiNascita:"", cittadinanza: "", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "provinciaDiNascita", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_2.8', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salern0241", comuneDiNascita:"", cittadinanza: "", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "provinciaDiNascita", message: "Formato provincia di nascita non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.9', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"", cittadinanza: "", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "comuneDiNascita", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_2.10', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angr0234", cittadinanza: "", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "comuneDiNascita", message: "Formato comune di nascita non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.11', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "cittadinanza", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_2.12', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italian!!32", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "cittadinanza", message: "Formato cittadinanza non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.13', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", indirizzo: "",
        provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "indirizzo", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_2.14', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi!! .12", provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "indirizzo", message: "Formato indirizzo non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.15', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "provincia", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_2.16', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "Salern12!?", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "provincia", message: "Formato provincia non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.17', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "comune", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_2.18', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fiscian31\!", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "comune", message: "Formato comune non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.19', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fisciano", cap: "", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "cap", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_2.20', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fisciano", cap: "212", telefono: "", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "cap", message: "Formato cap non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.21', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+39347321", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "telefono", message: "Lunghezza numero di cellulare non corretta!"})
            done();
        }
    });
  })

  it('TC_TDM_2.22', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+39347321ab32", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "telefono", message: "Formato cellulare non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.23', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234567", email: "", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "email", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_2.24', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234567",
        email: "marc@.com", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "email", message: "Formato email non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.25', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234567",
        email: "marcorossi@gmail.com", confermaEmail:""

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "confermaEmail", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_2.26', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234567",
        email: "marcorossi@gmail.com", confermaEmail:"marc@.swq1"

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "confermaEmail", message: "Formato conferma email non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_2.27', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Marco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/5", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234567",
        email: "marcorossi@gmail.com", confermaEmail:"marcorossi@hotmail.it"

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "confermaEmail", message: "Conferma email non corrisponde all’email inserita!"})
            done();
        }
    });
  })

  it('TC_TDM_2.28', function (done) {

    
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

})