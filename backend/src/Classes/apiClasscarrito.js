import fs from 'fs'

export default class{
    constructor(rutaDB){
        this.rutaDB = rutaDB; 
    }

    async getAllProducts(id){
        try {
            const todos = await fs.promises.readFile(this.rutaDB,'utf-8'); 
            const todosParsed = JSON.parse(todos); 

            const carrito = todosParsed.find(e =>e.id == id);   

            return carrito.productos; 
        } catch (error) {
            new Error(`Error al cargar carritos: ${error}`); 
        }
    }
    async crearCarrito(obj){
        try {

            const todos = await fs.promises.readFile(this.rutaDB,'utf-8'); 
            const todosParsed = JSON.parse(todos); 

            const carritosId = todosParsed.map(e => e.id); 
            let id = 1; 
    
            for(let i = 0; i < carritosId.length; i++){
                id < carritosId[i] || carritosId[i] == id ? id = carritosId[i] + 1 : id = 1; 
            }
            obj.id = id; 
            obj.productos = []
    
            todosParsed.push(obj); 
    
    
            const nuevoCarritoString = JSON.stringify(todosParsed,null,2); 
            await fs.promises.writeFile(this.rutaDB,nuevoCarritoString,'utf-8'); 
    
            return id; 
            
        } catch (error) {
            throw new Error(`Error al crear el carrito ${error}`); 
        }
    }

    async AgregarProductos(id,prodId){
        try {
            const carritos = await fs.promises.readFile(this.rutaDB,'utf-8'); 
            const carritosParsed = JSON.parse(carritos); 
            const productos = await fs.promises.readFile('backend/src/dataBase/productos.json','utf-8'); 
            const productosParsed = JSON.parse(productos); 

            const carrito = carritosParsed.find(e => e.id == id); 
            const producto = productosParsed.find(e => e.id == prodId.id); 
            const carritosId = carritosParsed.map(e => e.id); 

            if(producto.stock > 0 && carritosId.includes(Number(id))){

                producto.stock --; 
                carrito.productos.push(producto); 

                const productosString = JSON.stringify(productosParsed,null,2); 
                const carritoString = JSON.stringify(carritosParsed,null,2); 
                
                await fs.promises.writeFile('backend/src/dataBase/productos.json',productosString,'utf-8'); 
                await fs.promises.writeFile(this.rutaDB,carritoString,'utf-8'); 

                return true; 
            }else{
                return false;
            }
            
        } catch (error) {
            throw new Error(`Error al agregar un producto al carrito ${error}`); 
        }
    }

    async eliminarCarrito(id){
        try {
            const carritos = await fs.promises.readFile(this.rutaDB,'utf-8'); 
            const carritosParsed = JSON.parse(carritos); 

            const carritosId = carritosParsed.map(e =>e.id); 

            if(carritosId.includes(Number(id))){
                if(carritosId.includes(Number(id))){
                    let index = carritosId.indexOf(Number(id)); 
                    carritosParsed.splice(index,1); 
                }
                const carritoString = JSON.stringify(carritosParsed,null,2); 
                await fs.promises.writeFile(this.rutaDB,carritoString,'utf-8'); 

                return true;
            }else{
                return false; 
            }

        } catch (error) {
            throw new Error(`Error al eliminar el carrito ${error}`); 
        }
    }

    async eliminarProducto(idCarrito,idProducto){
        try {
            const carritos = await fs.promises.readFile(this.rutaDB,'utf-8'); 
            const carritosParsed = JSON.parse(carritos); 
            const carrito = carritosParsed[idCarrito-1]; 

            const carritosId = carritosParsed.map(e => e.id); 
            const idProd = carrito.productos.map(e => e.id); 

            if(carritosId.includes(Number(idCarrito)) && idProd.includes(Number(idProducto))){

                if(idProd.includes(Number(idProducto))){
                    let index = idProd.indexOf(Number(idProducto)); 
                    carrito.productos.splice(index,1); 
                } 
                carritosParsed.splice((idCarrito-1),1,carrito); 
    
    
                const carritosString = JSON.stringify(carritosParsed,null,2); 
                await fs.promises.writeFile(this.rutaDB,carritosString,'utf-8'); 

                return true; 
            }else{
                return false; 
            }
          

        } catch (error) { 
            throw new Error(`Error al eliminar ${error}`);  
        }
    }
}