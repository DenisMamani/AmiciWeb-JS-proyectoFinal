const contenedorCasas = document.getElementById("contenedorCasas")
const contenedorCarrito = document.getElementById("carritoDom")
const vaciarCarrito = document.getElementById("vaciarCarrito")
const precioTotal = document.getElementById("precioTotal")
const botonFinalizarCompra = document.getElementById('finalizarCompra')
let arrayCarrito = []
//Llama a las casas
async function verCasas(){
    const response = await fetch('./json/casas.json')
    const inmuebles = await response.json()
    return inmuebles
}
//Muestra en pantalla los inmuebles
const mostrarCasas = async () => {
    const inmuebles =  await verCasas()
    inmuebles.forEach(casa => { 
        contenedorCasas.innerHTML +=    
        `<div class="card mb-3" id="casa${casa.id}">
        <img src="./img/${casa.img}" class="casas" alt="casa">
        <div class="card-body">
          <h5 class="precio">Precio: $${casa.precio}</h5>
          <p class="textoUbicacion">Ubicacion: ${casa.ubicacion}</p>
          <p class="texto">${casa.descrip}</p>
          <button class="btnAgregar" id="${casa.id}">Comprar</button>
        </div>
      </div>
        `
        let botonAgregarCasa = document.querySelectorAll('.btnAgregar');
        botonAgregarCasa.forEach( boton => {
        boton.addEventListener('click', agregarInmuebleCarrito)
        });
    });
}
const agregarInmuebleCarrito =  (evento) => {
    let id = evento.target.getAttribute('id')
    if(arrayCarrito.length != 0 && arrayCarrito.includes(id)){
        Swal.fire({
            title: 'Error',
            text: 'Nuestra politica no nos permite vender la misma casa dos veces.',
            icon: 'error',
            iconColor: "#000",
            confirmButtonText: 'Aceptar',
            confirmButtonColor: "#000",
          })
         mostrarCarrito()
        return null
    }
    arrayCarrito.push(id)    
     mostrarCarrito()
}

//Muestra las casas en el carrito
const mostrarCarrito = async () => {
    const inmuebles = await verCasas()
    contenedorCarrito.innerHTML = ''
    arrayCarrito.forEach(casaCarrito => {
        const casaFiltrada = inmuebles.filter((casa) => {
            return casa.id == casaCarrito 
        }) 
        contenedorCarrito.innerHTML += 
                `<div class="casaCarrito">
                <div class="imgCarrito">
                <img src=${casaFiltrada[0].img}>
                </div>
                <div class="carritoPrecio">$${casaFiltrada[0].precio}</div>
                    <div class="carritoNUbicacion">${casaFiltrada[0].ubicacion}</div>
                    <button class="botonBorrar" id=${casaFiltrada[0].id}>Eliminar</button>
                </div>`
        let botonBorrarCarrito = document.querySelectorAll('.botonBorrar')
        botonBorrarCarrito.forEach(boton => {
            boton.addEventListener('click', borrarDelCarrito)
        }) 
    });
    precioTotal.innerHTML = await calcularTotal()
}
const borrarDelCarrito = (evento) => {
    const id = evento.target.id
    arrayCarrito = arrayCarrito.filter((casaCarrito) => {
        return casaCarrito != id
    })
    mostrarCarrito()
} 

//Calcula el precio total de las casas agregadas al carrito
const calcularTotal = async () => {
    const inmuebles =  await verCasas()
    return arrayCarrito.reduce((total, item) => {
        const miItem =  inmuebles.filter((itemBaseDatos) => {
            return itemBaseDatos.id == item;
        });
        return total + miItem[0].precio;
    }, 0)
}
//Borra las casas del carrito
const borrarTodoElCarrito = () => {
    arrayCarrito = []
    mostrarCarrito()
}
vaciarCarrito.addEventListener('click', borrarTodoElCarrito)
const finalizarCompra = () => {
    Swal.fire({
        title: 'Gracias por tu compra.',
        text: 'Tu compra fue realizada con exito.',
        icon: 'success',
        iconColor: "#000",
        confirmButtonText: 'Aceptar',
        confirmButtonColor: "#000",
      })
   borrarTodoElCarrito()
}
botonFinalizarCompra.addEventListener('click', finalizarCompra) 
mostrarCarrito()
mostrarCasas()
