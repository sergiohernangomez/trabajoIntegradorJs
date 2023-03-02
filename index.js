const renderizarContenedor = document.querySelector(".producto-contenedor");
const verMas = document.querySelector(".productos-ver_mas");
const categoriaContenedor = document.querySelector(".productos-categorias");
const listaCategoria = document.querySelectorAll(".categoria");
const carrito = document.querySelector(".carrito");
const carritoMenu = document.querySelector(".carrito-menu");
const menu = document.querySelector(".nav-menu");
const menuLista = document.querySelector(".nav-lista");
const main = document.querySelector(".main");
const total = document.querySelector(".total");
const carritoProducto = document.querySelector(".carrito-producto");
const productoAgregado = document.querySelector(".producto-agregado");
const burbuja = document.querySelector(".burbuja");
const botonComprar = document.querySelector(".boton-comprar")
const botonVaciar = document.querySelector(".boton-vaciar")

let carritoGuardado = JSON.parse(localStorage.getItem("carritoGuardado")) || [];

const guardarLocalStorage = (ListaCarrito) =>{
    localStorage.setItem("carritoGuardado", JSON.stringify(ListaCarrito));
}

const productosRenderizados = ({nombre, color, precio, imagen, id}) =>{
    return  `
    <div class="productos-cartas">
        ${imagen}
        <div class="productos-cartas-texto">
            <h3>${nombre} ${color}</h3>
            <p>$${precio}</p>
        </div>
        <button class="productos-carta-boton"
        data-nombre='${nombre}'
        data-color='${color}'
        data-precio='${precio}'
        data-imagen='${imagen}'
        data-id='${id}'>Agregar al carrito</button>
    </div>`
} 

const carritoRenderizado = ({nombre, color, precio, imagen, quantity, id}) =>{
    return `
            <div class="carritos-productos-agregados">
                <div class="carrito-img-nombre-color">
                    ${imagen}
                    <div class="carrito-pruducto-nombre-color">
                        <h3>${nombre}</h3>
                        <p>${color}</p>
                    </div>
                </div>
                <div class="carrito-producto-cantidad-precio">
                    <p>${quantity}</p>
                    <p>$${precio}</p>
                </div>
                <i class="papelera fa-solid fa-trash" data-id="${id}"></i>
            </div>   
    `
}
const renderizarProductoFiltrado = (categoria) =>{
    const listaCategoria = productos.filter(
        (productos) => productos.nombre == categoria
    );
    renderizarContenedor.innerHTML += listaCategoria.map(productosRenderizados).join("")
}
const renderizarProducto = (index = 0) =>{
    const renderizar = controladorProductos.divisorProducto[index];
    renderizarContenedor.innerHTML += renderizar.map(productosRenderizados).join("");
};

const mostrarProducto = (index = 0, categoria = null) =>{
    if(!categoria){
        renderizarProducto(index)
    }else{
        renderizarProductoFiltrado(categoria)
    }
};
const enLaUltimaPagina = () => 
    controladorProductos.siguentePagina === controladorProductos.limiteProducto;

const clickVerMas = () =>{
    renderizarProducto(controladorProductos.siguentePagina);
    controladorProductos.siguentePagina++;
    if(enLaUltimaPagina()){
        verMas.classList.add("borrar");
    }
};

const activarBoton = (categoriaSeleccionada) =>{
    const categoriaContenedor = [...listaCategoria];
    categoriaContenedor.forEach((botonCategoria)=>{
        if(botonCategoria.dataset.categoria !== categoriaSeleccionada){
            botonCategoria.classList.remove("activo");
        }else{
            botonCategoria.classList.add("activo")
        }
    })
};

const ocultarVerMas = (categoriaSeleccionada) =>{
    if(!categoriaSeleccionada){
        verMas.classList.remove("borrar");
        return
    };
    verMas.classList.add("borrar");
};

const filtrosBotones = (categoriaSeleccionada) =>{
    ocultarVerMas(categoriaSeleccionada);
    activarBoton(categoriaSeleccionada);
};

const aplicarFiltro = (evento) =>{
    if(!evento.target.classList.contains("categoria")) return;
    const categoriaClickeada = evento.target.dataset.categoria;
    filtrosBotones(categoriaClickeada);
    if(!categoriaClickeada){
        renderizarContenedor.innerHTML = "";
        mostrarProducto()
    }else{
        renderizarContenedor.innerHTML = ""
        mostrarProducto(0, categoriaClickeada);
        controladorProductos.siguentePagina = 1;
    }
    
};

const cerrarScroll = () =>{
    if(!carritoMenu.classList.contains("carrito-menu-abrir") &&
    !menuLista.classList.contains("nav-abrir-lista"))
        return;
    carritoMenu.classList.remove("carrito-menu-abrir");
    menuLista.classList.remove("nav-abrir-lista");
};
const cerrarClick = () =>{
    carritoMenu.classList.remove("carrito-menu-abrir");
    menuLista.classList.remove("nav-abrir-lista");
};

const abrirCarrito = () =>{
    carritoMenu.classList.toggle("carrito-menu-abrir");
    if(menuLista.classList.contains("nav-abrir-lista")){
        menuLista.classList.remove("nav-abrir-lista");
    };
};

const abrirMenu = () =>{
    menuLista.classList.toggle("nav-abrir-lista");
    if(carritoMenu.classList.contains("carrito-menu-abrir")){
        carritoMenu.classList.remove("carrito-menu-abrir");
    };
};

const calcularTotal = () =>{
    return carritoGuardado.reduce((acumulado, valor) =>
    acumulado + Number(valor.precio) * valor.quantity, 0);
};  

const mostrarTotal = () =>{
    total.innerHTML = `$${calcularTotal().toFixed(2)}`
};

const mostrarCarrito = () =>{
    if (!carritoGuardado.length){
        carritoProducto.innerHTML = `<P class="carrito-vacio">no hay productos agredados al carrito</P>`;
        return;
    }
    carritoProducto.innerHTML = carritoGuardado.map(carritoRenderizado).join("");
};

const esteProductoExiste = ({id}) => carritoGuardado.some((producto) => producto.id === id);


const agregarProductoAlCarrito = producto =>{
    carritoGuardado = [...carritoGuardado, {...producto, quantity: 1}];
};

const mostrarMensaje = (mensaje) => {
    productoAgregado.classList.add("producto-agregado-mostrar");
    productoAgregado.textContent = mensaje;
    setTimeout(() =>{
        productoAgregado.classList.remove("producto-agregado-mostrar");
    },2500);
};

const sumarBurbuja = () =>{
    burbuja.textContent = carritoGuardado.reduce((acumulado, valor) => acumulado + valor.quantity, 0) 
}

const mostrarBotonCarrito = (boton) =>{
    if(!carritoGuardado.length){
        boton.classList.add("boton-desabilitado");
    }else{
        boton.classList.remove("boton-desabilitado");
    }
};

const checkearCarrito = () =>{
    guardarLocalStorage(carritoGuardado);
    mostrarCarrito();
    mostrarTotal();
    sumarBurbuja();
    mostrarBotonCarrito(botonComprar);
    mostrarBotonCarrito(botonVaciar);
};

const agregarUnidad = (producto) =>{
    carritoGuardado = carritoGuardado.map((productoCarrito) => productoCarrito.id === producto.id
    ? {...productoCarrito, quantity : productoCarrito.quantity + 1} : productoCarrito );
};

const agregarProducto = (evento) =>{
    if(!evento.target.classList.contains("productos-carta-boton")) return;
    const { nombre, color, precio, imagen, id} = evento.target.dataset;
    const producto = {nombre, color, precio, imagen, id};
    if(esteProductoExiste(producto)){
       agregarUnidad(producto);
       mostrarMensaje("Unidad agregada");
    }else{
        agregarProductoAlCarrito(producto);
        mostrarMensaje("Producto agregado");
    };
    checkearCarrito();
};

const carritoVacio = () =>{
    carritoGuardado = [];
    checkearCarrito();
}

const completarAccion = (mensajeOkey, siguienteMensaje) =>{
    if(!carritoGuardado) return;
    if(window.confirm(mensajeOkey)){
        carritoVacio();
        alert(siguienteMensaje)
    }
}
const comprarProducto = () =>{
    completarAccion("Confirmar compra", "Gracias por su compra")
}
const vaciarCarrito = () =>{
    completarAccion("Vaciar productos del carrito", "Su carrito esta vacio")

}
const eliminarProductoDelCarrito = (id) =>{
    carritoGuardado = carritoGuardado.filter((producto)=> producto.id !==id);
    checkearCarrito();
}
const eliminarProducto = (evento) =>{
    if(!evento.target.classList.contains("papelera")) return;
    if(evento.target.classList.contains("papelera")){
        eliminarProductoDelCarrito(evento.target.dataset.id);
        checkearCarrito();
    }
}

const init = () => {
    mostrarProducto();
    verMas.addEventListener("click", clickVerMas);
    categoriaContenedor.addEventListener("click", aplicarFiltro);
    carrito.addEventListener("click", abrirCarrito);
    menu.addEventListener("click", abrirMenu);
    window.addEventListener("scroll", cerrarScroll);
    main.addEventListener("click", cerrarClick);
    document.addEventListener("DOMContentLoaded", mostrarTotal);
    document.addEventListener("DOMContentLoaded", mostrarCarrito);
    renderizarContenedor.addEventListener("click", agregarProducto);
    botonComprar.addEventListener("click",comprarProducto);
    botonVaciar.addEventListener("click",vaciarCarrito);
    carritoProducto.addEventListener("click",eliminarProducto)
    sumarBurbuja();
    mostrarBotonCarrito(botonComprar);
    mostrarBotonCarrito(botonVaciar);
};

init();