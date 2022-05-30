import fs from 'fs'

export default class Api{
    constructor(rutaDB){
        this.rutaDB = __dirname + rutaDB
    }
    async getAll(){
        try {

            const infoTXT = await fs.promises.readFile(this.rutaDB,'utf-8'); 

            return JSON.parse(infoTXT); 

        } catch (error) {
            throw new Error(`Error: ${error}`); 
        }
    }

    async findById(id){
        try {
            const todo = await this.getAll();
            const resultado = todo.find(e =>e.id === id); 
            return resultado;    
            
        } catch (error) {
            throw new Error(`Error: ${error}`); 
        }
    }

    async create(obj){
        try {
            const todo = this.getAll(); 
            let id; 

            todo.length == 0 ? id = 1: id = todo[todo.length - 1].id + 1; 
            todo.push({...obj,id}); 

            await fs.promises.writeFile(this.rutaDB,JSON.stringify(todo)); 

            return id; 
            
        } catch (error) {
            throw new Error(`Error al guardar: ${error}}`); 
        }
    }
}