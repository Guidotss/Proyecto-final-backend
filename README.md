# Proyecto final 

## Objetivos: 

Definir una `API` que permita gestionar el backend de un E-commerce. El servidor implementa dos conjuntos de rutas agrupadas en la carpeta **routes**
cuyos nombres son `productos.js` y `carrito.js` 

### Acciones de la ruta productos: 

* Listar todos los productos disponibles o un producto por su **id** con el verbo `GET`
* Incorporar productos al listado (solamente disponible para administradores) con el verbo `POST`
* Actualizar un producto por su **id** (solamente disponible para administradores) con el verbo `PUT`
* Eliminar un producto por su **id** (solamente disponible para administradores) con el verbo `DELETE`
  
### Acciones de la ruta carrito: 

* Crear uno o vcarios carritos y devolver su **id** con el verbo `POST`
* Vaciar y eliminar un carrito por su **id** con el verbo `DELETE`
* Listar todos los productos que se encuentren en el carrito con el verbo `GET`
* Incorporar productos al carrito con el **id** del producto utilizando el verbo `POST`
* Eliminar un producto que se encuentre dentro del carrito por su **id** utilizando el metodo `DELETE`