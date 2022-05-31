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

            return carrito.productos

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

        todosParsed.push(obj); 

        const nuevoCarritoString = JSON.stringify(todosParsed,null,2); 
        await fs.promises.writeFile(this.rutaDB,nuevoCarritoString,'utf-8'); 

        return id; 
    }

    async AgregarProductos(id,obj){
        const productos = await this.getAllProducts(); 
        console.log(productos);
    }
}