const formulario = document.getElementById("formulario")
const mail = document.querySelector(".mail");
const contraseña = document.querySelector(".contraseña");
const telefono = document.querySelector(".telefono");
const nombreUsuario = document.querySelector(".nombre-usuario")

const mailREGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const contraseñaREGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
const telefonoREGEX = /^[0-9]{10}$/;

const estaVacio = (valor) => valor === "";
const mailValido = (mail) => mailREGEX.test(mail);
const contraseñaValida = (contraseña) => contraseñaREGEX.test(contraseña);
const telefonoValido = (telefono) => telefonoREGEX.test(telefono);

const mostrarError = (input,mensaje) =>{
    const formContenedor = input.parentElement;
    formContenedor.classList.remove("aceptado");
    formContenedor.classList.add("error");
    const errorContenedor = formContenedor.querySelector("small");
    errorContenedor.textContent = mensaje;
};

const mostrarAceptado = (input) =>{
    const formContenedor = input.parentElement;
    formContenedor.classList.remove("error");
    formContenedor.classList.add("aceptado");
    const errorContenedor = formContenedor.querySelector("small");
    errorContenedor.textContent = " ";
};

const checkearNombre = () =>{
    let valid = false;
    const nombreApellido = nombreUsuario.value.trim();
    if(estaVacio(nombreApellido)){
        mostrarError(nombreUsuario,"El nombre y apellido son obligatorios")
    }else{
        mostrarAceptado(nombreUsuario);
        valid = true
    }
    return valid;
}

const checkearMail = () =>{
    let valid = false;
    const email = mail.value.trim();
    if (estaVacio(email)){
        mostrarError(mail,"El mail es obligatorio")
    }else if (!mailValido(email)){
        mostrarError(mail,"el mail no es valido")
    }else{
        mostrarAceptado(mail);
        valid = true;
    } 
    return valid;
}

const checkearContraseña = () =>{
    let valid = false;
    const contraseñaValidacion = contraseña.value.trim();
    if(estaVacio(contraseñaValidacion)){
        mostrarError(contraseña,"La contraseña es obligatoria");
    }else if(!contraseñaValida(contraseñaValidacion)){
        mostrarError(contraseña,"La contraseña ingresada no es valida");
    }else{
        mostrarAceptado(contraseña);
        valid = true;
    }
    return valid;
}

const checkearTelefono = () =>{
    let valid = false;
    const telefonoValidacion = telefono.value.trim();
    if(estaVacio(telefonoValidacion)){
        mostrarError(telefono,"El telefono es obligatorio");
    }else if(!telefonoValido(telefonoValidacion)){
        mostrarError(telefono,"El telefono ingresado no es valido")
    }else{
        mostrarAceptado(telefono);
        valid = true;
    }
    return valid;
}

formulario.addEventListener("submit", (e) =>{
    e.preventDefault();
    
    const esMailValido = checkearMail();
    const esContraseñaValida = checkearContraseña();
    const esTelefonoValido = checkearTelefono();
    const esNombreValido = checkearNombre();

    const esFormValido = esMailValido && esContraseñaValida && esTelefonoValido && esNombreValido;

    if(esFormValido){
        formulario.submit();
    }
    })

