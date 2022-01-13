const db = require("../models");
const Menu_Model = db.model_menu;
const Pasto_Model =db.model_pasto;


//metodo per la scelta del menu, ritorna tutti i pasti che poi verrano scelti dall'operatore mensa e successivamente verranno inseriti nel menu
exports.scelatamenu = (req, res) => {
  Pasto_Model.find({})
  .then(data => {
    if(data==null){
      
      res.json({message:false})
    }
    else{
    res.json(data);}
  })
  .catch(err => {
    res.json({message: err.message || "Some error occurred while retrieving pasto."});
  });
};

//metodo per la visualizzazione del menu, ritorna il menu del giorno, in base alla selezione "pranzo o cena"
exports.visualizzamenu = (req,res) => {
  var tipoMenu=req.body.tipo;
  var dataOdierna=new Date()
  dataOdierna.setUTCHours(0,0,0,0);
  Menu_Model.find({tipo: tipoMenu})
  .then(data => {
    if(data[0]==null){
      res.json({message:false})
    } 
    else if(data[0].data.getTime()==dataOdierna.getTime()){
    res.json(data);}
    else{
     res.json({message:false})}//ritorna false poiché il menu inserito è un menu vecchio
  })
  .catch(err => {
    res.json({message: err.message || "Some error occurred while retrieving menu."});
  });
};

exports.inseriscimenu = async (req,res) => {
  var tipoMenu=req.body.tipo;
  var dataOdierna=new Date();
  var listaPasti=req.body.pasti;
  dataOdierna.setUTCHours(0,0,0,0);
  var menu = new Menu_Model({
    pasti:req.body.pasti,
    tipo:req.body.tipo,
    data:dataOdierna
  });
  Menu_Model.find({tipo : tipoMenu}) 
  .then(data=>{
    if(data[0]){
      if(data[0].data.getTime()==dataOdierna.getTime()){
        res.json({message: "Impossibile inserire il menu perché già presente un menu per questa data"})
      }
      else{
        Menu_Model.findOneAndUpdate ({tipo: tipoMenu},  { "$set": { data:dataOdierna, pasti:listaPasti}},{useFindAndModify: false}, function(err,docs){
          if(err){res.json({message:"Some errore occurred while saving menu"})}
         else{
            res.json({message:true})
          }
        })
      }
    }
    else{
      menu
      .save(menu)
      .then(data => {
        res.json({message: true});
      })
      .catch(err => {
        res.json({message: err.message || "Some error occurred while saving menu."
        });
      });
    }
    
  })
  .catch(err => {
    res.json({message: err.message || "Some error occurred while retriving menu."
    });
  });
};

exports.modificamenu =  (req,res) => {
  var tipoMenu=req.body.tipo;
  var dataOdierna=new Date();
  var listaPasti=req.body.pasti;
  dataOdierna.setUTCHours(0,0,0,0);
  Menu_Model.find({tipo : tipoMenu})
  .then(data=>{
    if(data[0]){
      if(data[0].data.getTime()==dataOdierna.getTime()){
       Menu_Model.findOneAndUpdate ({tipo: tipoMenu},  { "$set": {pasti:listaPasti}},{useFindAndModify: false}, function(err,docs){
          if(err){res.json({message:"Some errore occurred while update menu"})}
         else{
            res.json({message:true})
          }
        })
      }
      else{
        res.json({message: "Impossibile modificare il menu perché non è presente un menu per questa data"})
      }
    }})
    .catch(err => {
      res.json({message: err.message || "Some error occurred while retriving menu."
      });
    });
  };
  