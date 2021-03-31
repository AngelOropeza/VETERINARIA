const pais = document.getElementById('pais');
const identificacion = document.getElementById('identificacion');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const listaVeterinarias = document.getElementById('lista-veterinarias');

let veterinarias = [
    {
        nombre: "Naryie",
        apellido : "Vazquez",
        pais: "Colombia",
        identificacion: "1234567890"
    },
    {
        nombre: "Juan David",
        apellido : "Marín",
        pais: "Colombia",
        identificacion: "1234567899"
    },
];

function listarVeterinarias(){
    const htmlVeterinarias = veterinarias.map((veterinaria, index)=>`<tr>
        <th scope="row">${index}</th>
        <td>${veterinaria.identificacion}</td>
        <td>${veterinaria.pais}</td>
        <td>${veterinaria.nombre}</td>
        <td>${veterinaria.apellido}</td>
        <td>
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-edit"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
        </div>
        </td>
    </tr>`).join("");
    listaVeterinarias.innerHTML = htmlVeterinarias;
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
}

function enviarDatos(evento){
    evento.preventDefault();
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value,
        identificacion: identificacion.value
    };
    const accion = btnGuardar.innerHTML
    switch(accion){
        case 'Editar':
            //editar
            veterinarias[indice.value] = datos;
            break;
        default:
            //Crear
            veterinarias.push(datos);
            break;
    }
    listarVeterinarias();
    resetModal();
}

function editar(index){
    return function cuandoCliqueo(){ //Este closure guarda el estado dentro del scope de la variable.
        btnGuardar.innerHTML = 'Editar'
        //$('exampleModal').modal('toggle');
        const veterinaria = veterinarias[index];
        nombre.value = veterinaria.nombre;
        apellido.value = veterinaria.apellido;
        pais.value = veterinaria.pais;
        identificacion.value = veterinaria.identificacion;
        indice.value = index;
    }
}

function resetModal(){
    nombre.value = '';
    apellido.value = '';
    pais.value = '';
    identificacion.value = '';
    indice.value = '';
    btnGuardar.innerHTML = 'Crear';
}

function eliminar(index){
    return function clickEnEliminar(){
        veterinarias = veterinarias.filter((veterinaria, indiceVeterinaria)=> indiceVeterinaria !== index);
        listarVeterinarias();
    }
}

listarVeterinarias();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;