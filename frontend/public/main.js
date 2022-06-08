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

const createProductItem = productos => productos.map(producto =>{
    return(
        `    <div class="row">
                <div class="card">
                    <img src="${producto.url} class=""card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                    </div>
                    <ul>
                        <li>$ ${producto.precio}</li>
                        <li>stock: ${producto.stock}</li>
                        <li> id: ${producto.id}</li>
                    </ul>
                </div>
            </div>
        `
    )
}).join('')

function renderProductos(productos){
    const itemString = createProductItem(productos); 
    listaProductos.innerHTML = itemString
}
