var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/ticket"
const path = "/update";
const emailSessione = "francrossi@gmail.com"
const ruoloSessione = "cliente"

describe('Field test for ticket',   function  () {
  it('TC_TM_2.1',   function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "",
        problema: "",
        soluzione: "Non si deve",
        date: "",
        email:emailSessione
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name:"soluzione", message: "Errore lunghezza soluzione"})
            done();
        }
    });
  })

  it('TC_TM_2.2',  function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "",
        problema: "",
        soluzione: "non si deve recare nella pagina degli ordini ma quella del menù",
        date: "",
        email:emailSessione
    })
    .end( function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.deep.equal({name:"soluzione", message: "Errore formato soluzione"})
            done();
        }
    });
  })

  it('TC_TM_2.3', function (done) {
    
    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        titolo: "",
        problema: "",
        soluzione: "Non si deve recare nella pagina degli ordini ma quella del menù.",
        date: "",
        email:emailSessione
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

  
 

})