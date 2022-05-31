import dotenv from 'dotenv'; 
import express from 'express';  
import morgan  from'morgan'; 
const app = express(); 
import routerProductos from './routes/productos.js'
import routerCarritos from './routes/carrito.js'
dotenv.config();


app.use(morgan('dev')); 
app.use(express.json()); 
app.use(express.static('frontend/public/')); 
app.use(express.urlencoded({extended:true})); 
app.use('/api/carrito',routerCarritos); 
app.use('/api/productos',routerProductos); 

const PORT = process.env.PORT

const server = app.listen(PORT,() =>{
    console.log(`Server on port ${server.address().port}`);
})
