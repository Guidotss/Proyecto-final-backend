import fs from 'fs';

export default class Api{
    constructor(rutaDB){
        this.rutaDB = rutaDB;
    }
    async getAll(){
        try {
            const todos = await fs.promises.readFile(this.rutaDB,'utf-8'); 
            return JSON.parse(todos); 
        } catch (error) {
            throw new Error(`Error al cargar productos: ${error}`); 
        }
    }

    async findById(id){
        try {
            const productos = await this.getAll();
            const productosId = productos.map(e=>e.id); 
            
            if(productosId.includes(Number(id))){
                let index = productosId.indexOf(Number(id)); 
                return productos[index]; 
            }else{
                return 'El id ingresado no existe'; 
            }


        } catch (error) {
            throw new Error(`Error: ${error}`); 
        }
    }

    async create(obj){
        try {

            if(JSON.stringify(obj) != '{}'){
                const todos = await this.getAll(); 
                const productsId = todos.map(e => e.id); 
                let id =1; 
        
                for(let i = 0; i < productsId.length; i++){
                    id < productsId[i] || id == productsId[i] ? id = productsId[i] + 1 : id = 0;
                }
    
                obj.id = id; 
                    
                todos.push(obj); 
        
                const newProductString = JSON.stringify(todos,null,2); 
                await fs.promises.writeFile(this.rutaDB,newProductString,'utf-8'); 
        
                return id; 
            }else{
                return 'Error al guardar el producto'; 
            }
            
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`);
        }
    }

    async updateById(id,obj){
        try {
            const todos = await this.getAll(); 
            todos.splice((id-1),1,obj); 
            obj.id = parseInt(id); 
            const actualizado = JSON.stringify(todos,null,2);
            await fs.promises.writeFile(this.rutaDB,actualizado,'utf-8'); 

        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`); 
        }
    }

    async deleteById(id){
        const todos = await this.getAll(); 

        todos.splice((id-1),1); 

        const eliminado = JSON.stringify(todos,null,2); 
        await fs.promises.writeFile(this.rutaDB,eliminado,'utf-8');  


        console.log(todos);
    }
}