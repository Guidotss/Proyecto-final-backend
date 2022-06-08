import {Router} from 'express'; 
import Api from '../Classes/apiClasscarrito'; 


const router = Router(); 
const api = new Api('backend/src/dataBase/carritos.json'); 

router.get('/:id/productos', async (req,res) =>{
    const {id} = req.params; 
    const productos = await api.getAllProducts(id); 
    res.json(productos); 
});

router.post('/',async (req,res) =>{
    const carrito = req.body;
    const addCarrito = await api.crearCarrito(carrito); 
    res.json({id:addCarrito}); 
});

router.post('/:id/productos',async (req,res) =>{
    const {id} = req.params; // Id del carrito.
    const prodId = req.body; // Ingresar como JSON el id del producto.
    const addNewproduct = await api.AgregarProductos(id,prodId); 

    if(addNewproduct){
        return res.json({Mensaje:'Producto agregado al carrito'});
    }else{
        return res.json({Mensaje:'Stock insuficiente, o bien el id del carrito es incorrecto'}); 
    }
});

router.delete('/:id',async (req,res) =>{
    const {id} = req.params; 
    const eliminarCarrito = await api.eliminarCarrito(id); 
    
    if(eliminarCarrito){
        return res.json({Mensaje:'Carrito eliminado con exito'}); 
    }else{
        return res.json({Mensaje:'El carrito ingresado no existe'}); 
    }
}); 

router.delete('/:id/productos/:id_prod',async (req,res)=>{
    const {id,id_prod} =  req.params; 
    const eliminarProducto = await api.eliminarProducto(id,id_prod); 

    if(eliminarProducto){
        res.json({Mensaje:'Producto eliminado con exito'});  
    }else{
        res.json({Mensaje:'el Id ingresado es incorrecto, o bien el id del producto no existe o el id del carrito no existe'}); 
    }
}); 


export default router;