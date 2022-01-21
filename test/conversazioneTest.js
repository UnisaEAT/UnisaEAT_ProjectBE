const app = require ("../server")
var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/conversazione"
const path = "/create";
const ruoloSessione =  "operatore mensa";


describe('Field test for Conversazione', function () {
  
  it('Create conversazione', function (done) {


    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        "receiver": {"email":"n.cappello@studenti.unisa.it", "ruolo": "cliente"},
    "sender": {"email":"d.devito@studenti.unisa.it", "ruolo": "personale adisu"}

    })
    .end(function(error, response, body) {
        if (error) {
            console.log(error);
        } else {
            expect(response.body).to.not.null
            done();
        }
    });
  })


})