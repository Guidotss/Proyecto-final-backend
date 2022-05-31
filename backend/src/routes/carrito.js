import {Router} from 'express'; 
import Api from '../Classes/carrito'

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
    res.json({id:addCarrito})
});

router.post('/:id/productos',(req,res) =>{
    const {id} = req.params
    const newProduct  = req.body; 
    const addNewproduct = api.createNewProduct(id,newProduct); 
});

router.delete('/:id',(req,res) =>{
    
}); 

router.delete('/:id/productos/:id_prod',(req,res)=>{
    
}); 


export default router;