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
})

router.post('/',async (req,res) =>{
    const obj = req.body; 
    const addProduct = api.create(obj); 
    addProduct.then(response => res.json({id:response})); 
}); 

router.put('/',(req,res) =>{
    
});

router.delete('/',(req,res) =>{
    
});


export default router;