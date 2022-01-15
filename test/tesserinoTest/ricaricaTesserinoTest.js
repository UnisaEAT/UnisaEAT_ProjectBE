var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/tesserino"
const path = "/ricaricaTesserino";
const emailSessione = "francrossi@gmail.com"
const ruoloSessione = "cliente"

//il caso di test prevede l'inserimento di una carta visa
describe('Field test for ricarica tesserino', function () {
  
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

})