const url = 'http://localhost:8080/api/productos'; 
const listaProductos = document.getElementById('productos'); 


window.addEventListener('DOMContentLoaded',async () =>{
   const data =  await loadProducts(); 
   renderProductos(data.Productos)
})

async function loadProducts(){
    const response = await fetch(url); 
    return  await response.json(); 
}

const createProductItem = productos => productos.map(producto => {
    
})
function renderProductos(productos){

}
