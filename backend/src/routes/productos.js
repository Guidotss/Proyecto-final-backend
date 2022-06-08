import {Router} from 'express'; 
import Api from '../Classes/apiClassproductos';

const router = Router(); 
const api = new Api('backend/src/dataBase/productos.json');

const isAdmin = false; 

function adminOrClient(req,res,next){
    if(!isAdmin){
        res.json(
            {
                error: '-1',
                descripcion: `Ruta ${req.baseUrl} metodo ${req.method} no autorizada`
            }
        );
    }else{
        next(); 
    }
}

router.get('/',async (req,res) =>{
    const productos = await api.getAll(); 
    res.json({Productos:productos});
}); 

router.get('/:id', async (req,res) =>{
    const {id} = req.params; 
    const producto = await api.findById(id);
    return res.json({producto}); 
    
}); 

router.post('/',adminOrClient,async (req,res) =>{

    const obj = req.body; 
    const addProduct = await api.create(obj); 
    
    return res.json({id:addProduct});
    
}); 

router.put('/:id',adminOrClient,async (req,res) =>{
    const {id} = req.params; 
    const product = req.body;
    await api.updateById(id,product); 
    
    res.json({Mensaje:'Producto actualizado con exito'});
}); 


router.delete('/:id',adminOrClient, async (req,res) =>{
    const {id} = req.params; 
    await api.deleteById(id); 
    res.json({Mensaje:'Producto eliminado con exito'});
}); 





export default router;