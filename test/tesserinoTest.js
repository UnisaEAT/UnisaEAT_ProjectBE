var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
//var mockHttp = require('node-mocks-http') da eliminare
chai.use(chaiHttp);

var tesserinoControl = require('../app/controller/controller_tesserino')

var host = "localhost:8080/api/tesserino"

//let server = require('../server'); da eliminare
describe('Field test for tesserinoControl', function () {
  
    let emailSessione = "francrossi@gmail.com"
    let ruoloSessione = "cliente"

  it('Test method create - TC_TDM_1.1', function (done) {

    let path = "/create";

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

  it('Test method create - TC_TDM_1.2', function (done) {

    let path = "/create";
    
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

  it('Test method create - TC_TDM_1.3', function (done) {

    let path = "/create";
    
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

  it('Test method create - TC_TDM_1.4', function (done) {

    let path = "/create";
    
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

  it('Test method create - TC_TDM_1.5', function (done) {

    let path = "/create";
    
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

  it('Test method create - TC_TDM_1.6', function (done) {

    let path = "/create";
    
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

  it('Test method create - TC_TDM_1.7', function (done) {

    let path = "/create";
    
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

  it('Test method create - TC_TDM_1.8', function (done) {

    let path = "/create";
    
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

  it('Test method create - TC_TDM_1.9', function (done) {

    let path = "/create";
    
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

  it('Test method create - TC_TDM_1.10', function (done) {

    let path = "/create";
    
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

})
//           "Questo campo è obbligatorio!"
//           "Formato data non corretto!"