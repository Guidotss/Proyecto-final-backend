require('dotenv').config();
const express = require('express'); 
const morgan = require('morgan'); 
const app = express(); 
const routerCarritos = require('./routes/carrito'); 
const routerProductos = require('./routes/productos'); 

app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.static('frontend/public/')); 
app.use(express.urlencoded({extended:true})); 
app.use('/api/carrito',routerCarritos); 
app.use('/api/productos',routerProductos); 

const PORT = process.env.PORT; 

const server = app.listen(PORT,() =>{
    console.log(`Server on port ${server.address().port}`);
})
