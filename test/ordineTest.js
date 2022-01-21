const app = require ("../server")
var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/ordine"
const path = "/ordinaPasti";
const ruoloSessione =  "cliente";


describe('Field test for Ordine', function () {
  
  it('Find All pasti', function (done) {


    chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
    .send({
        ruolo:ruoloSessione

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