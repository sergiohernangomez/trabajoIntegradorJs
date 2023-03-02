const productos = [
   {
      id: 1,
      nombre: "kusudama",
      color: "blanco",
      precio: 200,
      imagen: `<img class="productos-cartas-img"src="./assest/kusudama_blanco.png" alt="Kusudama azul"></img>`,
   },
   {
      id: 2,
      nombre: "kusudama",
      color: "azul",
      precio: 200,
      imagen: `<img class="productos-cartas-img"src="./assest/kusudama_azul.png" alt="Kusudama blanco"></img>`, 
   },
   {
      id: 3,
      nombre: "kusudama",
      color: "magenta",
      precio: 200,
      imagen: `<img class="productos-cartas-img"src="./assest/kusudama_magenta.png" alt="Kusudama magenta"></img>`, 
   },
   { 
      id: 4,
      nombre: "estrella",
      color: "blanco",
      precio: 250,
      imagen: `<img class="productos-cartas-img"src="./assest/estrella_blanco.png" alt="Estrella blanco"></img>`, 
   },
   {
      id: 5,
      nombre: "estrella",
      color: "azul",
      precio: 250,
      imagen: `<img class="productos-cartas-img"src="./assest/estrella_azul.png" alt="Estrella azul"></img>`, 
   },
   {
      id: 6,
      nombre: "estrella",
      color: "magenta",
      precio: 250,
      imagen: `<img class="productos-cartas-img"src="./assest/estrella_magenta.png" alt="Estrella magenta"></img>`, 
   },
   {
      id: 7,
      nombre: "icosaedro",
      color: "blanco",
      precio: 300,
      imagen: `<img class="productos-cartas-img"src="./assest/icosaedro_blanco.png" alt="Icosaedro blanco"></img>`, 
   },
   {
      id: 8,
      nombre: "icosaedro",
      color: "azul",
      precio: 300,
      imagen: `<img class="productos-cartas-img"src="./assest/icosaedro_azul.png" alt="Icosaedro azul"></img>`, 
   },
   {
      id: 9,
      nombre: "icosaedro",
      color: "magenta",
      precio: 300,
      imagen: `<img class="productos-cartas-img"src="./assest/icosaedro_magenta.png" alt="Icosaedro magenta"></img>`, 
   }
];
const dividirProducto = (tamaño) => {
   let divisorProducto = []
    for (let i = 0; i < productos.length ; i += tamaño){
      divisorProducto.push(productos.slice(i, i + tamaño))
   }
   return divisorProducto;
};
const controladorProductos = {
   divisorProducto: dividirProducto(3),
   siguentePagina: 1,
   limiteProducto: dividirProducto(3).length,
}; 

