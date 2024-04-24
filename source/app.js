let listaEmpleados = [];

const objEmplados = {
    id:"",
    nombre:"",
    puesto:""
}

let editando = false;

const formulario = document.querySelector("#formulario");
const nombreInput = document.querySelector("#nombre");
const puestoInput = document.querySelector("#puesto");
const btnAgregar = document.querySelector("#btnAgregar");

formulario.addEventListener("submit", validarFormulario);

function validarFormulario(e){
    e.preventDefault();
    if(nombreInput.value === "" || puestoInput.value === ""){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "TODOS LOS CAMPOS SON OBLIGATORIOS!",
            footer: '<a href="#">POR QUE TENGO ESTE PROBLEMA?</a>'
          });
    }
    
    if(editando){
        editarEmpleado()
        editando = false
    }else{
        objEmplados.id = Date.now();
        objEmplados.nombre =  nombreInput.value;
        objEmplados.puesto = puestoInput.value;

    }
    agregarEmpleado()
}

function agregarEmpleado(){
    listaEmpleados.push({...objEmplados});

    mostrarEmpleados();

    formulario.reset();

    limpiarObjeto()
}

function limpiarObjeto(){
    objEmplados.id = "";
    objEmplados.nombre = "";
    objEmpladospuesto = "";
}

function mostrarEmpleados(){

    limpiarHtml()

    const divEmpleados = document.querySelector(".div-empleados");

    listaEmpleados.forEach(empleados => {
        const {id, nombre,  puesto} = empleados;

        const parrafo = document.createElement("p");
        parrafo.textContent = `${id} - ${nombre} - ${puesto}`;

        parrafo.dataset.id = id;

        const editarBoton = document.createElement("button");
        editarBoton.onclick = () => cargarEmpleados(empleados);

        editarBoton.textContent = "editar";
        editarBoton.classList.add("btn","btn-editar");
        parrafo.append(editarBoton)

        const botonEliminar = document.createElement("button");
        /*botonEliminar.onclick = () => eliminarEmpleados(id);*/

        botonEliminar.textContent = "eliminar";
        botonEliminar.classList.add("btn","btn-eliminar");
        parrafo.append(botonEliminar)

        const hr = document.createElement("hr");
        divEmpleados.appendChild(parrafo)
        divEmpleados.appendChild(hr)
    })
}

function cargarEmpleados(empleado){
    const {id, nombre, puesto} = empleado;

    nombreInput.value = nombre;
    puestoInput.value = puesto;

    objEmplados.id = id;

    formulario.querySelector("button[type]").textContent ="Actualizar"

    editando = true
}

function editarEmpleado(){
    objEmplados.nombre = nombreInput;
    objEmplados.puesto = puestoInput;

    listaEmpleados.map(empleado => {
        if(empleado.id === objEmplados.id){
            empleado.id = objEmplados.id;
            empleado.nombre = objEmplados.nombre;
            empleado.puesto = objEmplados.puesto;
        }
    })

    limpiarHtml();
    mostrarEmpleados();


    formulario.reset();

    formulario.querySelector("button[type]").textContent = "Agregar";

    editando = false
}

function limpiarHtml(){
    const divEmpleados = document.querySelector(".div-empleados")

    while (divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild)
    }
}