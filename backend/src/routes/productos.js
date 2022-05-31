import {Router} from 'express'; 
import Api from '../apiClass'

const router = Router(); 
const api = new Api('/dataBase/productos.json');


router.get('/',async (req,res) =>{
    const productos = await api.getAll(); 
    res.json(productos)
}); 

router.get('/:id', async (req,res) =>{
    const {id} = req.params; 
    const producto = await api.findById(id);
    res.json(producto); 
}); 

router.post('/',async (req,res) =>{
    const obj = req.body; 
    const addProduct = await api.create(obj); 
    res.json({id:addProduct}); 
}); 

router.put('/:id',async (req,res) =>{
    const {id} = req.params; 
    const product = req.body
    await api.updateById(id,product); 
    
    res.json({Mensaje:'Producto actualizado con exito'});
}); 


router.delete('/:id', async (req,res) =>{
    const {id} = req.params; 
    await api.deleteById(id); 
    res.json({Mensaje:'Producto eliminado con exito'})
}); 





export default router;