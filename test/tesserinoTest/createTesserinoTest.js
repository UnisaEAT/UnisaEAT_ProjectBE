var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/tesserino"
const path = "/create";
const emailSessione = "francrossi@gmail.com"
const ruoloSessione = "cliente"

describe('Field test for richiesta tesserino', function () {
  
  it('TC_TDM_1.1', function (done) {


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

  it('TC_TDM_1.2', function (done) {

    
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

  it('TC_TDM_1.3', function (done) {

    
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

  it('TC_TDM_1.4', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco123",
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

  it('TC_TDM_1.5', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
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

  it('TC_TDM_1.6', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
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

  it('TC_TDM_1.7', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
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

  it('TC_TDM_1.8', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
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

  it('TC_TDM_1.9', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
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

  it('TC_TDM_1.10', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
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

  it('TC_TDM_1.11', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
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

  it('TC_TDM_1.12', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
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

  it('TC_TDM_1.13', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
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

  it('TC_TDM_1.14', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi!!+12", provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

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

  it('TC_TDM_1.15', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

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

  it('TC_TDM_1.16', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "Salern12!?", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

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

  it('TC_TDM_1.17', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "", cap: "", telefono: "", email: "", confermaEmail:""

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

  it('TC_TDM_1.18', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fiscian31\!", cap: "", telefono: "", email: "", confermaEmail:""

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

  it('TC_TDM_1.19', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fisciano", cap: "", telefono: "", email: "", confermaEmail:""

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

  it('TC_TDM_1.20', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fisciano", cap: "212", telefono: "", email: "", confermaEmail:""

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

  it('TC_TDM_1.21', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+39347321", email: "", confermaEmail:""

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

  it('TC_TDM_1.22', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+39347321ab32", email: "", confermaEmail:""

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

  it('TC_TDM_1.23', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234566", email: "", confermaEmail:""

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

  it('TC_TDM_1.24', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234566",
        email: "franc@.com", confermaEmail:""

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

  it('TC_TDM_1.25', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234566",
        email: "francrossi@gmail.com", confermaEmail:""

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

  it('TC_TDM_1.26', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234566",
        email: "francrossi@gmail.com", confermaEmail:"franc@.swq1"

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

  it('TC_TDM_1.27', function (done) {

    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        emailSessione: emailSessione, ruoloSessione:ruoloSessione, cognome:"Rossi", nome:"Francesco",
        dataDiNascita: "03/11/2000", provinciaDiNascita: "Salerno", comuneDiNascita:"Angri", cittadinanza: "Italiana", 
        indirizzo: "Via Enaudi F/4", provincia: "Salerno", comune: "Fisciano", cap: "84081", telefono: "+393471234566",
        email: "francrossi@gmail.com", confermaEmail:"francescorossi@hotmail.it"

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

  it('TC_TDM_1.28', function (done) {

    
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

})