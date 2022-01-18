var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/ticket"
const path = "/insert";
const emailSessione = "francrossi@gmail.com"
const ruoloSessione = "cliente"

describe('Field test for ticket',   function  () {
  this.timeout(15000)
  it('TC_TM_1.1',   function  (done) {
    this.timeout(15000)
    setTimeout(done,15000)
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "titolo",
        problema: "Problematica 1.",
        soluzione: null,
        date: new Date(),
        email:"Gigigigigigg@gmail.com"
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "titolo", message: "Troppo breve"})
            done();
        }
    });
  })

  it('TC_TM_1.2',  function (done) {
    this.timeout(15000)
    setTimeout(done,15000)
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "titolo senza punto",
        problema: "Problematica 1.",
        soluzione: null,
        date: new Date(),
        email:"Gigigigigigg@gmail.com"
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "titolo", message: "Manca il punto!"})
            done();
        }
    });
  })

  it('TC_TM_1.3', function (done) {
    this.timeout(15000)
    setTimeout(done,15000)
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "titolo col punto.",
        problema: "Non lo so",
        soluzione: null,
        date: new Date(),
        email:"Gigigigigigg@gmail.com"
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "Problema", message: "Troppo breve"})
            done();
        }
    });
  })

  it('TC_TM_1.4', function (done) {
    this.timeout(15000)
    setTimeout(done,15000)
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "titolo col punto.",
        problema: "Non lo so senza punto",
        soluzione: null,
        date: new Date(),
        email:"Gigigigigigg@gmail.com"
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name: "Problema", message: "Manca il punto"})
            done();
        }
    });
  })

  it('TC_TM_1.5', function (done) {
    this.timeout(15000)
    setTimeout(done,15000)
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "titolo col punto.",
        problema: "Non lo so col punto.",
        soluzione: null,
        date: new Date(),
        email:"Gigigigigigg@gmail.com"
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({message: true})
            done();
        }
    });
  })
 

})