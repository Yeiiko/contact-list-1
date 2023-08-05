let listaContactos = [];

function añadirContacto(id, nombre, apellido, telefono, ciudad, direccion) {
  let contacto = {
    id: id,
    nombre: nombre,
    apellido: apellido,
    telefono: telefono,
    ubicacion: {
      ciudad: ciudad,
      direccion: direccion,
    },
  };
  listaContactos.push(contacto);
}

function eliminarContacto(id) {
  let contactoBorrar = listaContactos.findIndex(
    (contacto) => contacto.id === id
  );
  if (contactoBorrar !== -1) {
    listaContactos.splice(contactoBorrar, 1);
  }
}

function eliminarFila(id) {
  let fila = document.querySelector(`tr[data-id="${id}"]`);
  if (fila) {
    fila.remove();
  }
}

document.getElementById("BotonAñadir").addEventListener("click", (event) => {
  event.preventDefault();

  const id = document.getElementById("inputId").value;
  const nombre = document.getElementById("inputNombre").value;
  const apellido = document.getElementById("inputApellido").value;
  const telefono = document.getElementById("inputTelefono").value;
  const ciudad = document.getElementById("inputCiudad").value;
  const direccion = document.getElementById("inputDireccion").value;

  añadirContacto(id, nombre, apellido, telefono, ciudad, direccion);

  document.getElementById("inputId").value = "";
  document.getElementById("inputNombre").value = "";
  document.getElementById("inputApellido").value = "";
  document.getElementById("inputTelefono").value = "";
  document.getElementById("inputCiudad").value = "";
  document.getElementById("inputDireccion").value = "";

  let tablaDatos = document.querySelector(".TablaDatos tbody");

  const newRow = tablaDatos.insertRow();

  newRow.setAttribute("data-id", id);

  newRow.innerHTML = `
    <td class="IdTabla">${id}</td>
    <td class="NombreTabla">${nombre}</td>
    <td class="ApellidoTabla">${apellido}</td>
    <td class="TelefonoTabla">${telefono}</td>
    <td class="CiudadTabla">${ciudad}</td>
    <td class="DireccionTabla">${direccion}</td>

    <td><button class= "btnEliminar" data-id="${id}">Eliminar</button></td>
    <td><button class="btnEditar" data-id="${id}">Editar</button></td>
    `;


  const BtnEliminar = newRow.querySelector(".btnEliminar");

  BtnEliminar.addEventListener("click", () => {
    eliminarContacto(id);
    eliminarFila(id);
  });


  // Zona Boton Editar
  let ventanaEditar = document.getElementById("editarContacto");

  const btnEditar = newRow.querySelector(".btnEditar");
  btnEditar.addEventListener("click", () => {
    mostrarEdicion(btnEditar);
  });

  function mostrarEdicion(elementoBoton) {
  const btnGuardar= document.getElementById("BotonGuardar")
  const btnEditarCance = document.getElementById("BotonEditarCancelar");
  const dataId = elementoBoton.getAttribute("data-id");
  ventanaEditar.classList.add("mostrarEditar");


  btnEditarCance.addEventListener("click", () => {
    ventanaEditar.classList.remove("mostrarEditar");
  });

  btnGuardar.addEventListener("click", () => {
   actualizarContacto(dataId)
  });
}


  function actualizarContacto(id) {
    const IdNuevo = document.getElementById("inputIdNuevo").value;
    const NombreNuevo = document.getElementById("inputNombreNuevo").value;
    const ApellidoNuevo = document.getElementById("inputApellidoNuevo").value;
    const TelefonoNuevo = document.getElementById("inputTelefonoNuevo").value;
    const CiudadNuevo = document.getElementById("inputCiudadNuevo").value;
    const DireccionNuevo = document.getElementById("inputDireccionNuevo").value;

    const fila = tablaDatos.querySelector(`tr[data-id="${id}"]`);

    const IdTabla = fila.querySelector(".IdTabla");
    const NombreTabla = fila.querySelector(".NombreTabla");
    const ApellidoTabla = fila.querySelector(".ApellidoTabla");
    const TelefonoTabla = fila.querySelector(".TelefonoTabla");
    const CiudadTabla = fila.querySelector(".CiudadTabla");
    const DireccionTabla = fila.querySelector(".DireccionTabla");

    const ContactoEditar = listaContactos.find((contacto) => contacto.id === id);

    if (ContactoEditar) {
        ContactoEditar.id = IdNuevo;
        ContactoEditar.nombre = NombreNuevo;
        ContactoEditar.apellido = ApellidoNuevo;
        ContactoEditar.telefono = TelefonoNuevo;
        ContactoEditar.ubicacion.ciudad = CiudadNuevo;
        ContactoEditar.ubicacion.direccion = DireccionNuevo;
      
        IdTabla.innerText = IdNuevo;
        NombreTabla.innerText = NombreNuevo;
        ApellidoTabla.innerText = ApellidoNuevo;
        TelefonoTabla.innerText = TelefonoNuevo;
        CiudadTabla.innerText = CiudadNuevo;
        DireccionTabla.innerText = DireccionNuevo;
      }

    ventanaEditar.classList.remove("mostrarEditar")
  }
});
