const express =require('express');
const conectarDB =require('./config/db')
const cors = require("cors");

//creamos el servidor
const app = express();

//conetamos a la base de datos
conectarDB();
app.use(cors())

app.use('/api/productos', require('./routes/productos'));


app.listen(4000,    () =>{
    console.log('El servidor esta corriendo perfectamente')
})

