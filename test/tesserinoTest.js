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

  it('TC_TDM_3.1', function (done) {

    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: emailSessione, ruolo:ruoloSessione, intestatario:"", numeroCarta:"",
        tipoCarta:"Visa", dataScadenzaCarta:"", cvv:"", importo:""
    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "intestatario", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_3.2', function (done) {

    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: emailSessione, ruolo:ruoloSessione, intestatario:"Francesco Ros214!", numeroCarta:"",
        tipoCarta:"Visa", dataScadenzaCarta:"", cvv:"", importo:""
    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "intestatario", message: "Formato Intestatario non corretto!"})
            done();
        }
    });
  })

  it('TC_TDM_3.3', function (done) {

    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: emailSessione, ruolo:ruoloSessione, intestatario:"Francesco Rossi", numeroCarta:"402314",
        tipoCarta:"Visa", dataScadenzaCarta:"", cvv:"", importo:""
    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "numeroCarta", message: "Numero della carta di credito errato!"})
            done();
        }
    });
  })

  it('TC_TDM_3.4', function (done) {

    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: emailSessione, ruolo:ruoloSessione, intestatario:"Francesco Rossi", numeroCarta:"1104357839102",
        tipoCarta:"Visa", dataScadenzaCarta:"", cvv:"", importo:""
    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "numeroCarta", message: "Formato numero carta errato!"})
            done();
        }
    });
  })

  it('TC_TDM_3.5', function (done) {

    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: emailSessione, ruolo:ruoloSessione, intestatario:"Francesco Rossi", numeroCarta:"4012343851244",
        tipoCarta:"Visa", dataScadenzaCarta:"", cvv:"", importo:""
    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "dataScadenzaCarta", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_3.6', function (done) {

    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: emailSessione, ruolo:ruoloSessione, intestatario:"Francesco Rossi", numeroCarta:"4012343851244",
        tipoCarta:"Visa", dataScadenzaCarta:"122/202", cvv:"", importo:""
    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "dataScadenzaCarta", message: "Formato data scadenza errato!"})
            done();
        }
    });
  })

  it('TC_TDM_3.7', function (done) {

    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: emailSessione, ruolo:ruoloSessione, intestatario:"Francesco Rossi", numeroCarta:"4012343851244",
        tipoCarta:"Visa", dataScadenzaCarta:"12/26", cvv:"", importo:""
    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "cvv", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_3.8', function (done) {

    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: emailSessione, ruolo:ruoloSessione, intestatario:"Francesco Rossi", numeroCarta:"4012343851244",
        tipoCarta:"Visa", dataScadenzaCarta:"12/26", cvv:"43212", importo:""
    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "cvv", message: "Formato CVV errato!"})
            done();
        }
    });
  })

  it('TC_TDM_3.9', function (done) {

    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: emailSessione, ruolo:ruoloSessione, intestatario:"Francesco Rossi", numeroCarta:"4012343851244",
        tipoCarta:"Visa", dataScadenzaCarta:"12/26", cvv:"451", importo:""
    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "importo", message: "Questo campo è obbligatorio!"})
            done();
        }
    });
  })

  it('TC_TDM_3.10', function (done) {

    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: emailSessione, ruolo:ruoloSessione, intestatario:"Francesco Rossi", numeroCarta:"4012343851244",
        tipoCarta:"Visa", dataScadenzaCarta:"12/26", cvv:"451", importo:"10,,,50"
    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "importo", message: "Formato importo errato!"})
            done();
        }
    });
  })

  it('TC_TDM_3.11', function (done) {

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

})