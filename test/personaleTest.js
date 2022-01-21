var chai = require('chai')
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const host = "localhost:8080/api/personale"
const path = "/insert";
const ruoloSessione = "personale adisu"

describe('Field test for Personale', function () {

    it('TC_OMM_1.1', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"", cognome:"",
            indirizzo: "", numeroTelefono: "", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_OMM_1.2', function (done) {
      chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca97”£", cognome:"",
            indirizzo: "", numeroTelefono: "", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_OMM_1.3', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"",
            indirizzo: "", numeroTelefono: "", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_OMM_1.4', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi97!!",
            indirizzo: "", numeroTelefono: "", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_OMM_1.5', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "", numeroTelefono: "", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_OMM_1.6', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma?!!", numeroTelefono: "", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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


      it('TC_OMM_1.7', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+39 33145", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "numeroTelefono", message: "Lunghezza numero di telefono non corretta!"})
                done();
            }
        });
      })

      it('TC_OMM_1.8', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+39 33145ewew!!", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "numeroTelefono", message: "Formato numero di telefono non corretto!"})
                done();
            }
        });
      })

      it('TC_OMM_1.9', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_OMM_1.10', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"64/12/1997", email: "", password: "",
            confermapassword: ""
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "dataDiNascita", message: "Formato data di nascita non corretto!"})
                done();
            }
        });
      })

      it('TC_OMM_1.11', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_PAM_1.12', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "LuckBianch@.com", 
            password: "", confermapassword: ""
    
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
      
      it('TC_OMM_1.13', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "Bianchi@gmail.com", password: "",
            confermapassword: ""
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "password", message: "Questo campo è obbligatorio!"})
                done();
            }
        });
      })

      it('TC_OMM_1.14', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "Bianchi@gmail.com", password: "ilsolesplende",
            confermapassword: ""
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "password", message: "Formato password non corretto!"})
                done();
            }
        });
      })

      it('TC_OMM_1.15', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "Bianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: ""
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "confermapassword", message: "Questo campo è obbligatorio!"})
                done();
            }
        });
      })
    
      it('TC_OMM_1.16', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "Bianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: "ilsolesplende"
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "confermapassword", message: "Formato conferma password non corretto!"})
                done();
            }
        });
      })

      it('TC_OMM_1.17', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "Bianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: "Ilsolesplende96!"
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "confermapassword", message: "Conferma passowrd non corrisponde alla password inserita!"})
                done();
            }
        });
      })
      
      it('TC_OMM_1.18', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "Bianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: "Ilsolesplende97!"
    
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

      it('TC_PAM_1.1', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"", cognome:"",
            indirizzo: "", numeroTelefono: "", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_PAM_1.2', function (done) {
      chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca97”£", cognome:"",
            indirizzo: "", numeroTelefono: "", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_PAM_1.3', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"",
            indirizzo: "", numeroTelefono: "", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_PAM_1.4', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi97!!",
            indirizzo: "", numeroTelefono: "", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_PAM_1.5', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "", numeroTelefono: "", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_PAM_1.6', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma?!!", numeroTelefono: "", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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


      it('TC_PAM_1.7', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+39 33145", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "numeroTelefono", message: "Lunghezza numero di telefono non corretta!"})
                done();
            }
        });
      })

      it('TC_PAM_1.8', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+39 33145ewew!!", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "numeroTelefono", message: "Formato numero di telefono non corretto!"})
                done();
            }
        });
      })

      it('TC_PAM_1.9', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_PAM_1.10', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"64/12/1997", email: "", password: "",
            confermapassword: ""
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "dataDiNascita", message: "Formato data di nascita non corretto!"})
                done();
            }
        });
      })

      it('TC_PAM_1.11', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "", password: "",
            confermapassword: ""
    
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

      it('TC_PAM_1.12', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "LuckBianch@.com", 
            password: "", confermapassword: ""
    
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
      
      it('TC_PAM_1.13', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "LucaBianchi@gmail.com", password: "",
            confermapassword: ""
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "password", message: "Questo campo è obbligatorio!"})
                done();
            }
        });
      })

      it('TC_PAM_1.14', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "LucaBianchi@gmail.com", password: "ilsolesplende",
            confermapassword: ""
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "password", message: "Formato password non corretto!"})
                done();
            }
        });
      })

      it('TC_PAM_1.15', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "LucaBianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: ""
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "confermapassword", message: "Questo campo è obbligatorio!"})
                done();
            }
        });
      })
    
      it('TC_PAM_1.16', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "LucaBianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: "ilsolesplende"
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "confermapassword", message: "Formato conferma password non corretto!"})
                done();
            }
        });
      })

      it('TC_PAM_1.17', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "LucaBianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: "Ilsolesplende96!"
    
        })
        .end(function(error, response, body) {
            if (error) {
                console.log(error);
            } else {
                expect(response.body).to.deep.equal({name: "confermapassword", message: "Conferma passowrd non corrisponde alla password inserita!"})
                done();
            }
        });
      })
      
      it('TC_PAM_1.18', function (done) {


        chai.request(host).post(path).set('content-type', 'application/x-www-form-urlencoded')
        .send({
            ruolo:ruoloSessione, nome:"Luca", cognome:"Bianchi",
            indirizzo: "Via Roma 12", numeroTelefono: "+393471234566", dataDiNascita:"05/12/1997", email: "LucaBianchi@gmail.com", password: "Ilsolesplende97!",
            confermapassword: "Ilsolesplende97!"
    
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