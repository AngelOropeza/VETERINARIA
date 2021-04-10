const pais = document.getElementById('pais');
const documento = document.getElementById('documento');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const indice = document.getElementById('indice');
const form = document.getElementById('form');
const btnGuardar = document.getElementById('btn-guardar');
const listaVeterinarias = document.getElementById('lista-veterinarias');
const url = 'http://localhost:5000/veterinarias';


let veterinarias = [];

async function listarVeterinarias() {
    try {
      const respuesta = await fetch(url);
      const veterinariasDelServer = await respuesta.json();
      if (Array.isArray(veterinariasDelServer)) {
        veterinarias = veterinariasDelServer;
      }
      if (veterinarias.length > 0) {
        const htmlVeterinarias = veterinarias
          .map(
            (veterinaria, index) => `<tr>
          <th scope="row">${index}</th>
          <td>${veterinaria.documento}</td>
          <td>${veterinaria.nombre}</td>
          <td>${veterinaria.apellido}</td>
          <td>
              <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
                  <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
              </div>
          </td>
        </tr>`
          )
          .join("");
        listaVeterinarias.innerHTML = htmlVeterinarias;
        Array.from(document.getElementsByClassName("editar")).forEach(
          (botonEditar, index) => (botonEditar.onclick = editar(index))
        );
        Array.from(document.getElementsByClassName("eliminar")).forEach(
          (botonEliminar, index) => (botonEliminar.onclick = eliminar(index))
        );
        return;
      }
      listaVeterinarias.innerHTML = `<tr>
      <td colspan="5" class="lista-vacia">No hay veterinarias</td>
    </tr>`;
    } catch (error) {
      console.log({ error });
      $(".alert").show();
    }
  }


async function enviarDatos(evento){
    evento.preventDefault();
    try {
        const datos = {
            nombre: nombre.value,
            apellido: apellido.value,
            pais: pais.value,
            documento: documento.value
        };
        const accion = btnGuardar.innerHTML
        const urlEnvio = url;
        let method = 'POST';
        if(accion === 'Editar'){
            //editar
            method = 'PUT';
            urlEnvio += `/${indice.value}`;
        }
        const respuesta = await fetch(urlEnvio, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
            mode: "cors",
        });
        if (respuesta.ok) {
            listarMascotas();
            resetModal();
        }
    } catch (error) {
        console.log({ error });
        $(".alert").show();
    }
}

function editar(index){
    return function cuandoCliqueo(){ //Este closure guarda el estado dentro del scope de la variable.
        btnGuardar.innerHTML = 'Editar'
        //$('exampleModal').modal('toggle');
        const veterinaria = veterinarias[index];
        nombre.value = veterinaria.nombre;
        apellido.value = veterinaria.apellido;
        pais.value = veterinaria.pais;
        documento.value = veterinaria.documento;
        indice.value = index;
    }
}

function resetModal(){
    nombre.value = '';
    apellido.value = '';
    pais.value = '';
    documento.value = '';
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