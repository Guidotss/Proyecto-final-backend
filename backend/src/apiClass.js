import fs from "fs"

export default class Api{
    constructor(rutaDB){
        this.rutaDB = __dirname + rutaDB
    }
    async getAll(){
        try {
            const todos = await fs.promises.readFile(this.rutaDB,'utf-8'); 
            return JSON.parse(todos); 
        } catch (error) {
            throw new Error(`Error: ${error}`); 
        }
    }

    async findById(id){
        try {
            const todos = await this.getAll();

            const resultado = todos.find(e=>e.id == id); 
            return resultado;    
            
        } catch (error) {
            throw new Error(`Error: ${error}`); 
        }
    }

    async create(obj){
        try {
            const todos = await fs.promises.readFile(this.rutaDB,'utf-8'); 
            const todosParsed = JSON.parse(todos); 
            const productsId = todosParsed.map(e => e.id); 
            let id =1; 

            for(let i = 0; i < productsId.length; i++){
                id < productsId[i] || id == productsId[i] ? id = productsId[i] + 1 : id =0
            }

            obj.id = id; 

            todosParsed.push(obj); 
            console.table(todosParsed); 

            const newProductString = JSON.stringify(todosParsed,null,2); 
            await fs.promises.writeFile(this.rutaDB,newProductString,'utf-8'); 

            return id; 
            
        } catch (error) {
          throw new Error(`Error al guardar: ${error}`);
        }
    }
}