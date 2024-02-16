const express=require('express');
const app = express();
const cnx=require('./db.js');
const cors=require("cors");
const rutas= require('../rutas/usuario.js');
const PORT= process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/usuario', rutas);

app.listen(PORT);
console.log(cnx);

console.log(`listen server in port ${PORT}`);
