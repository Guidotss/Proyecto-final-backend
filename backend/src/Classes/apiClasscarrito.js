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
    }

    async AgregarProductos(id,prodId){
        const carritos = await fs.promises.readFile(this.rutaDB,'utf-8'); 
        const carritosParsed = JSON.parse(carritos); 
        const carrito = carritosParsed.find(e => e.id == id); 
        const productos = await fs.promises.readFile('backend/src/dataBase/productos.json','utf-8'); 
        const productosParsed = JSON.parse(productos); 
        const producto = productosParsed.find(e => e.id == prodId.id); 

        producto.stock --; 
        carrito.productos.push(producto); 


        const productosString = JSON.stringify(productosParsed,null,2); 
        const carritoString = JSON.stringify(carritosParsed,null,2); 
        
        await fs.promises.writeFile('backend/src/dataBase/productos.json',productosString,'utf-8'); 
        await fs.promises.writeFile(this.rutaDB,carritoString,'utf-8'); 
    }

    async eliminarCarrito(id){
        const carritos = await fs.promises.readFile(this.rutaDB,'utf-8'); 
        const carritosParsed = JSON.parse(carritos); 
        const carritosId = carritosParsed.map(e =>e.id); 

        for(let i = 0; i < carritosId.length; i++){
            
        }
        

        
        const carritoString = JSON.stringify(carritosParsed,null,2); 
        await fs.promises.writeFile(this.rutaDB,carritoString,'utf-8'); 
    }

    async eliminarProducto(idCarrito,idProducto){
        try {
            
        } catch (error) {
            throw new Error(`Error al eliminar ${error}`);  
        }
    }
}