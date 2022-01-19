var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/login"
const path = "/login";
const ruoloSessione = "cliente"

describe('Field test for ticket',   function  () {
  it('TC_AM_1.1',   function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: "m.c1@gmail.com",
        password:""
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "email",
            message: "Lunghezza email non corretta",})
            done();
        }
    });
  })

  it('TC_AM_1.2',  function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: "m.c1lugnhezzagmail.com",
        password:""
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "email",
            message: "l'email ha un formato non corretto ",})
            done();
        }
    });
  })

  it('TC_AM_1.3', function (done) {
    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            email: "m.c1lugnhezza@gmail.com",
            password:""
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({message: "l'email non è presente nel db"})
                done();
            }
        });
      })

  it('TC_AM_1.4', function (done) {

    
        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            email: "c.citro28@studenti.unisa.it",
            password:"Carmi"
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({ name: "password",
                message: "Lunghezza password non corretta"})
                done();
            }
        });
      })


  it('TC_AM_1.5', function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            email: "c.citro28@studenti.unisa.it",
            password:"Carmilunghezza%%"
            
        })
        .end( function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({ name: "password",
                message: "la password  ha un formato non corretto"})
                done();
            }
        });
      })

 
  it('TC_AM_1.6', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: "c.citro28@studenti.unisa.it",
        password:"Carmine0099"
        
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({ message: "Password errata"})
            done();
        }
    });
  })


  it('TC_AM_1.7', function (done) {
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        email: "c.citro28@studenti.unisa.it",
        password:"Carmine0099"
        
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({  email: docs[0].email, ruolo: docs[0].ruolo })
            done();
        }
    });
  })
})