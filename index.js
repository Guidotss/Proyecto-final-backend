require('dotenv').config();
const express = require('express'); 
const morgan = require('morgan'); 
const app = express(); 
const routerCarritos = require('./routers/carrito'); 
const routerProductos = require('./routers/productos'); 

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.use(express.static(__dirname + '/public')); 
app.use('/api/carrito',routerCarritos); 
app.use('/api/productos',routerProductos); 

const PORT = process.env.PORT; 

const server = app.listen(PORT,() =>{
    console.log(`Server on port ${server.address().port}`);
})
