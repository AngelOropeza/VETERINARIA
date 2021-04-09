const listaMascotas = document.getElementById('lista-mascotas')
const tipo = document.getElementById('tipo')
const nombre = document.getElementById('nombre')
const dueno = document.getElementById('dueno')
const indice = document.getElementById('indice')
const form = document.getElementById('form')
const btnGuardar = document.getElementById('btn-guardar')
const url = "http://localhost:5000/mascotas";

let mascotas = [];

async function listarMascotas(){
    try {
        const respuesta = await fetch(url);
        const mascotasDelServer = await respuesta.json();
        if(Array.isArray(mascotasDelServer)){
            mascotas = mascotasDelServer;
        }        
        const htmlMascotas = mascotas
        .map(
            (mascota, index)=>`<tr>
            <th scope="row">${index}</th>
            <td>${mascota.tipo}</td>
            <td>${mascota.nombre}</td>
            <td>${mascota.dueno}</td>
            <td>
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-info editar" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-edit"></i></button>
                <button type="button" class="btn btn-danger eliminar"><i class="fas fa-trash-alt"></i></button>
            </div>
            </td>
        </tr>`).join("");
        listaMascotas.innerHTML = htmlMascotas;
        Array.from(document.getElementsByClassName('editar')).forEach((botonEditar, index)=>botonEditar.onclick = editar(index));
        Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar, index)=>botonEliminar.onclick = eliminar(index));
    } catch (error) {
        throw error;
    }
}

async function enviarDatos(evento){
    evento.preventDefault();
    try {
        const datos = {
            tipo: tipo.value,
            nombre: nombre.value,
            dueno: dueno.value
        };
        let method = "POST";
        let urlEnvio = url;
        const accion = btnGuardar.innerHTML
        if(accion === 'Editar'){
            method = "PUT"
            //editar
            mascotas[indice.value] = datos;
            urlEnvio = `${url}/${indice.value}`;
        }
        const respuesta = await fetch(urlEnvio, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
            mode:"cors",
        });
        if(respuesta.ok){
            listarMascotas();
            resetModal();
        }
    } catch (error) {
        throw(error);
    }
}

function editar(index){
    return function cuandoCliqueo(){ //Este closure guarda el estado dentro del scope de la variable.
        btnGuardar.innerHTML = 'Editar'
        //$('exampleModal').modal('toggle');
        const mascota = mascotas[index];
        nombre.value = mascota.nombre;
        dueno.value = mascota.dueno;
        tipo.value = mascota.tipo;
        indice.value = index;
    }
}

function resetModal(){
    nombre.value = '';
    dueno.value = '';
    tipo.value = '';
    indice.value = '';
    btnGuardar.innerHTML = 'Crear';
}

function eliminar(index){
    try {
        const urlEnvio = `${url}/${index}`;
        return async function clickEnEliminar(){
            const respuesta = await fetch(urlEnvio, {
                method: "DELETE",
            });
            if(respuesta.ok){
                listarMascotas();
                resetModal();
            }
        }
    } catch (error) {
        throw(error);
    }
}

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
