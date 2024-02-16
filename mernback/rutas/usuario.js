const express = require('express');
const router= express.Router();
const cnx= require('../server/db');
const jwt = require('jsonwebtoken');
const verifytoken = require('../security/token');
const {encrypt, compare} = require('../handle/handlebcrypt');


router.get('/prueba', verifytoken, (req, res)=>{
    var datos = {
        tarea : "matematicas",
        teacher : "madonna"
    }
    console.log(datos);

    res.json([datos]);
});

router.post('/signup', async (req, res)=>{
  
    const password = req.body.password;
    console.log(password);
    let hash = await encrypt(password);
    console.log(hash);

    var data={
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,       
        password: hash,
        id_rol: req.body.id_rol
   }

   cnx.query('INSERT INTO usuario set ?',[data],(error, result)=>{
         console.log(result);               
     }); 

   const token = jwt.sign({user: data}, 'secretKey');
   console.log(token);
   res.status(200).json({token});

});

router.post('/login', async (req, res)=>{

    const {email, password} = req.body;

    cnx.query('SELECT * FROM usuario WHERE email = ?',[email],async (err, result)=>{
        
        if (result.length > 0) {
            console.log("usuario existe");
            const checkpassword = await compare(password, result[0].password);
            if (checkpassword) {
                console.log(result[0]);
                const token = jwt.sign({user: result[0]}, 'secretKey');
                return res.status(200).json({success: true, result, token});

            }else{
                return res.send({success: false, error :"contraseña incorrecta"});

            }
        }else{
            res.send({success: false, error: "usuario no encontrado"});

        }
        
    });

});

router.get('/obtenerUsuarios',verifytoken, (req, res)=>{
    try {     
        cnx.query('SELECT * FROM usuario',(error, usuario)=>{
         if (error) {
            res.json(error);
         }
         res.send(usuario);
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
});

router.get('/obtenerId/:id', (req,res)=>{
    try {   
        const id = req.params.id;

        cnx.query('SELECT * FROM usuario WHERE id=?',[id],(error, usuario)=>{
         if (error) {
            res.json(error);
         }
         console.log(usuario);
         res.send(usuario[0]);

        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

});

router.put('/actualizarUsuario/:id', (req, res)=>{
    try {  
        const id = req.params.id;
        console.log(id);
        var date={
            nombre:req.body.nombre,
            email:req.body.email,
            telefono:req.body.telefono,
            id: id       
       }
       console.log(date);
        cnx.query('UPDATE usuario SET ? WHERE id = ?',[date,id],(error, rows)=>{
         if (error) {
            res.json(error);
         }
         console.log(rows);
         res.send(rows);

        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }




});

router.delete('/eliminarUsuario/:id', (req,res)=>{
    try {   
        const id = req.params.id;

        cnx.query('DELETE FROM usuario WHERE id=?',[id],(error, result)=>{
         if (error) {
            res.json(error);
         }
         console.log(result);
         res.json(result);
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

});

router.get('/obtenerRol', (req, res)=>{
    try {     
        cnx.query('SELECT * FROM permisos',(error, result)=>{
         if (error) {
            res.json(error);
         }
         res.send(result);
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
});


module.exports = router;