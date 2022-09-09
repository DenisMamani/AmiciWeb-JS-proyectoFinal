class Contacto{
    constructor(nombre,apellido,email,telefono,mensaje){
    this.nombre=nombre;
    this.apellido=apellido;
    this.email=email;
    this.telefono=telefono;
    this.mensaje=mensaje;
    }
}
const consultas =JSON.parse(localStorage.getItem("consultas")) ??[]

const formContacto=document.getElementById("formContacto");
const botonConsulta=document.getElementById("mostrarConsulta")
const divConsultas=document.getElementById("divConsultas")
const btn = document.getElementById('button');
formContacto.addEventListener("submit",(e)=>{
    e.preventDefault()
    const datosForm= new FormData(e.target)
    const objContaco=new Contacto (datosForm.get("nombre"), datosForm.get("apellido"), datosForm.get("email"), datosForm.get("telefono"), datosForm.get("mensaje"))
    consultas.push(objContaco)
    localStorage.setItem("consultas",JSON.stringify(consultas))
    formContacto.reset()
})
document.getElementById('formContacto')
 .addEventListener('submit', function(event) {
   event.preventDefault();
      Toastify({
        text: "Pregunta Enviada",
        duration: 1000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #232526, #414345)",
        },
        onClick: function(){} 
      }).showToast();
});
//Muestra las consultas en "Mis Consultas"
botonConsulta.addEventListener('click',()=>{
    const consultaStorage=JSON.parse(localStorage.getItem("consultas"))
 divConsultas.innerHTML=""
    consultaStorage.forEach((consultas,indice) => {
     divConsultas.innerHTML +=`
        <div class="cardConsulta" id=consulta${indice} style="width: 18rem;">
  <div class="consulta">
    <h5 class="nombre">User: ${consultas.nombre} ${consultas.apellido}</h5>
    <p class="email">Email: ${consultas.email}.</p>
    <p class="telefono">Tel: ${consultas.telefono}.</p>
    <p class="mensaje">Mensaje: ${consultas.mensaje}.</p>
    <button class="elimConsult">Eliminar</button>
  </div>
</div>
        `
    })
    //Elimina las Consultas
    consultaStorage.forEach((consulta,indice)=>{
         document.getElementById(`consulta${indice}`).children[0].children[4].
         addEventListener('click',()=>{
            document.getElementById(`consulta${indice}`).remove()
            consultas.splice(indice,1)
            localStorage.setItem("consultas",JSON.stringify(consultas))
         })
        })
    })
