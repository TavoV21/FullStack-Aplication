const cnx = require('mysql');

const conexion = cnx.createConnection({
   host:"localhost",
   user:"root",
   password:"",
   database:"crud_mern"
})

conexion.connect(function(error){
    if (error) {
        throw error;
    }else{
        console.log("conectado a la BD con exito!!!");
    }
});

module.exports=conexion;