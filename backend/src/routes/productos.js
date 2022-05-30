import {Router} from 'express'; 
import Api from '../apiClass.js'

const router = Router(); 
const api = new Api('/dataBase/productos.json');

export default router;

router.get('/:id',(req,res) =>{

}); 

router.post('/',(req,res) =>{

}); 

router.put('/',(req,res) =>{

});

router.delete('/',(req,res) =>{
    
});
