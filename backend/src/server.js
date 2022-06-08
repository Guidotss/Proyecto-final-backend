import 'dotenv/config'; 
import express from 'express';  
import morgan  from'morgan'; 
import routerProductos from './routes/productos.js';
import routerCarritos from './routes/carrito.js';
const app = express(); 




app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.static('frontend/public/')); 
app.use(express.urlencoded({extended:true})); 
app.use('/api/carrito',routerCarritos); 
app.use('/api/productos',routerProductos); 

const PORT = process.env.PORT; 

const server = app.listen(PORT,() =>{
    console.log(`Server on port ${server.address().port}`);
}); 
