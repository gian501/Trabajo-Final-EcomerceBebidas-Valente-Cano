let productAgCarr = localStorage.getItem("producin-C");
productAgCarr = JSON.parse(productAgCarr); 

const carritoProductos = document.querySelector("#ca-p-ag");
const carritoVacio = document.querySelector("#empty-c");
const carritoAcc = document.querySelector("#carrito-acciones");
const carritoComprado = document.querySelector("#carrito-comprado");
const botonVaciar = document.querySelector("#limpiar-c");
const cTotal = document.querySelector("#total");
const bComprar = document.querySelector("#compra-t");


function refreshCarr() {
    if (productAgCarr && productAgCarr.length > 0) {

        carritoVacio.classList.add("disabled");
        carritoProductos.classList.remove("disabled");
        carritoAcc.classList.remove("disabled");
        carritoComprado.classList.add("disabled");
    
        carritoProductos.innerHTML = "";
    
        productAgCarr.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-image-p" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-nam-p">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p><span data-id ='${producto.id}'class="restar"> - </span>${producto.cantidad}<span data-id='${producto.id}' class="sumar"> + </span></p>
                </div>  
                <div class="carrito-cost-p">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="elim-p" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            carritoProductos.append(div);
        })

    } else {
        carritoVacio.classList.remove("disabled");
        carritoProductos.classList.add("disabled");
        carritoAcc.classList.add("disabled");
        carritoComprado.classList.add("disabled");
    }
    actualizarBotonesSumar()
    actualizarBotonesResta()
    actualizarbElim();
    actualizarTotal();
}

refreshCarr();

function actualizarbElim() {
    let bElim = document.querySelectorAll(".elim-p");

    bElim.forEach(boton => {
        boton.addEventListener("click", elimProduct);
    });
}

function elimProduct(e) {
    const idBoton = e.currentTarget.id;
    const index = productAgCarr.findIndex(producto => producto.id === idBoton);
    productAgCarr.splice(index, 1);
    refreshCarr();
    localStorage.setItem("producin-C", JSON.stringify(productAgCarr));

}



function actualizarTotal() {
    const totalCalculado = productAgCarr.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    cTotal.innerText = `$${totalCalculado}`;
}

bComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    productAgCarr.length = 0;
    localStorage.setItem("producin-C", JSON.stringify(productAgCarr));
    
    carritoVacio.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    carritoAcc.classList.add("disabled");
    carritoComprado.classList.remove("disabled");

}

function actualizarBotonesSumar() {
    const botonesSumar = document.querySelectorAll(".sumar");

    botonesSumar.forEach((btn) => {
        btn.addEventListener("click", sumarUnitCarrito);
    });
}

function sumarUnitCarrito(e) {
    e.preventDefault();
    const idProductS = e.currentTarget.dataset.id;
    const indice = productAgCarr.findIndex((p) => p.id === idProductS);
    productAgCarr[indice].cantidad++;
    localStorage.setItem("producin-C", JSON.stringify(productAgCarr));
    refreshCarr();

}
function actualizarBotonesResta() {
    const botonesResta = document.querySelectorAll(".restar");
    botonesResta.forEach((boton) => {
        boton.addEventListener("click", restarUnitCarrito);
    });
}

function restarUnitCarrito(e) {
    e.preventDefault();
    const idProductR = e.currentTarget.dataset.id;
    const indic = productAgCarr.findIndex((produc) => produc.id === idProductR);
    if(productAgCarr[indic].cantidad > 1){
        productAgCarr[indic].cantidad--;
        localStorage.setItem("producin-C", JSON.stringify(productAgCarr));
        refreshCarr();
    }
    
}
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {
    productAgCarr.length = 0;
    localStorage.setItem("producin-C", JSON.stringify(productAgCarr));
    refreshCarr();

}
