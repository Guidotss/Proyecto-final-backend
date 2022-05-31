import {Router} from 'express'; 
import Api from '../apiClass.js'

const router = Router(); 
const api = new Api('/dataBase/carritos.json');

router.get('/',(req,res) =>{
    
});

router.post('/',(req,res) =>{
    
});

router.post('/:id/productos',(req,res) =>{
    
});

router.delete('/:id',(req,res) =>{
    
}); 

router.delete('/:id/productos/:id_prod',(req,res)=>{
    
}); 


export default router;