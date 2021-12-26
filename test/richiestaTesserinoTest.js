var chai = require('chai')
var expect = chai.expect
var mockHttp = require('node-mocks-http')
var tesserinoControl = require('../app/controller/controller_tesserino')

describe('Field test for controller_tesserino', function () {
  it('Testing method controller_tesserino - TC_TDM_1.1', function (done) {
    var res = mockHttp.createResponse()
    var req = { body: {cognome: "", nome: "", dataDiNascita: "", provinciaDiNascita: "", comuneDiNascita:"", 
        cittadinanza: "", indirizzo: "", provincia: "", comune: "", cap: "", telefono: "", 
        email: "", confermaEmail:"" } 
    }
    var ris = tesserinoControl.create(req, res)
    ris.then(function (result) {
      expect(result).to.not.be.null
      done()
    })
  })

})