// Variables del HTML

let BotonPrincipal = document.querySelector("#boton-empezar")
let titulo = document.getElementById("titulo")
let parrafo = document.getElementById("parrafo")
const contenedorPrincipal = document.getElementById("contenedor-principal")
const contenedorSecundario = document.getElementById("contenedor-secundario")
const contenedorCotizaciones = document.getElementById("contenedor-cotizaciones")
const listaCotizaciones = document.getElementById("lista-cotizaciones")
const botonAtras = document.getElementById("atras")
const botonSiguiente = document.getElementById("siguiente")

// Clases
class Prestamo {
    constructor(prestamista, monto, meses, tasa, cuota, id) {
        this.id = id
        this.prestamista = prestamista
        this.monto = monto
        this.meses = meses
        this.tasa = tasa
        this.cuota = cuota
    }
}
class Prestamista {
    constructor(nombre, id, cuota1, cuota2, cuota3, tasa1, tasa2, tasa3) {
        this.nombre = nombre
        this.id = id
        this.cuota1 = cuota1
        this.cuota2 = cuota2
        this.cuota3 = cuota3
        this.tasa1 = tasa1
        this.tasa2 = tasa2
        this.tasa3 = tasa3
        this.lista_de_cuotas = [cuota1, cuota2, cuota3]
        this.lista_de_tasas = [tasa1, tasa2, tasa3]
    }
}

// Declaro variables y los agrego a un array

const visa = new Prestamista("Visa", 1, 3, 6, 9, 20, 40, 60);
const mastercard = new Prestamista("Mastercard", 2, 3, 6, 12, 18, 42, 62);
const cabal = new Prestamista("Cabal", 3, 1, 3, 6, 7, 15, 50);
const naranja = new Prestamista("Naranja", 4, 3, 9, 12, 20, 55, 100);
const galicia = new Prestamista("Galicia", 5, 6, 12, 18, 38, 100, 150);

let prestamistas = []

prestamistas.push(visa, mastercard, cabal, naranja, galicia)


let opciones = []

for (var i = 0; i < prestamistas.length; i++) {
    tarjeta = prestamistas[i].nombre
    opciones.push(tarjeta)
}

let selectorDeTarjeta = document.createElement("select")

for (var i = 0; i < opciones.length; i++) {
    var opcion = document.createElement("option")
    opcion.value = opciones[i]
    opcion.text = opciones[i]
    selectorDeTarjeta.appendChild(opcion)
}

let lista_de_cuotas = []





// Funciones 

function DeleteFade(elemento) {
    elemento.classList.remove("animate__animated", "animate__fadeInUp")
}

function Fade(elemento) {
    elemento.classList.add("animate__animated", "animate__fadeInUp")
    // setTimeout(DeleteFade(elemento),5000)
}

function DeleteFlip(elemento) {
    elemento.classList.remove("animate__animated", "animate__flipInY")
}

function Flip(elemento) {
    elemento.classList.add("animate__animated", "animate__flipInY")
    // setTimeout(DeleteFade(elemento),5000)
}

function crear_lista_de_cuotas(obj) {
    lista_de_cuotas.push(obj.cuota1)
    lista_de_cuotas.push(obj.cuota2)
    lista_de_cuotas.push(obj.cuota3)
    return lista_de_cuotas
}

function calcular_cuota(monto, tasa, meses) {
    let valor_de_la_cuota = ((monto / meses) + (monto * (tasa / 100)) / meses)
    return valor_de_la_cuota
}

// Declaro variables para despues usar


let selectorDeCuotas = document.createElement("select")

let selectorDeMonto = document.createElement("input")

let contador = 0
let eleccion_tarjeta
let eleccion_cuotas
let eleccion_de_monto
let cuota
let tasa
let meses
let prestamoAnterior = new Prestamo
let indiceDeListaDeSimulaciones = 0
let simulaciones_anteriores = JSON.parse(localStorage.getItem("ListaDePrestamos"))
let prestamista_anterior = document.getElementById("prestamista")
let monto_anterior = document.getElementById("monto")
let meses_anterior = document.getElementById("meses")
let tasa_anterior = document.getElementById("tasa")
let cuota_anterior = document.getElementById("cuota")

//Agregado de Id's y clases

selectorDeTarjeta.classList.add("selector", "text-center", "rounded", "w-50", "mt-5")

selectorDeCuotas.classList.add("selector", "text-center", "rounded", "w-50", "mt-5")

selectorDeMonto.classList.add("selector", "text-center", "rounded", "w-50", "mt-5")

BotonPrincipal.classList.add("w-50")

//Asincronia

const dolarSiAPI = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
fetch(`${dolarSiAPI}`)
    .then(resp => resp.json())
    .then(res => {
        const cotizacionOficial = res[0].casa
        const cotizacionBlue = res[1].casa
        const cotizacionCCL = res[3].casa
        const cotizaciones = [cotizacionOficial, cotizacionBlue, cotizacionCCL]
        cotizaciones.forEach((cot) => {
            const li = document.createElement("li")
            li.innerHTML = `<h2 class="fs-3 text-muted"> ${(cot.nombre).toUpperCase()}</h2>
                        <p class="fs-5 text-muted">Compra: <span class="verde">$${cot.compra} </span></p>
                        <p class="fs-5 text-muted">Venta: <span class="verde">$${cot.venta} </span></p>`
            listaCotizaciones.append(li)
            contenedorCotizaciones.classList.add("animate__flipInX")
            contenedorCotizaciones.classList.remove("invisible")
        })

    })
    .catch(err => console.log(err))

// Uso de LocalStorage y JSON


if (localStorage.length > 0) {

    contenedorSecundario.classList.remove("invisible")

    prestamista_anterior.innerHTML = `Tarjeta: ${simulaciones_anteriores[0].prestamista}`
    monto_anterior.innerHTML = `Monto: $${simulaciones_anteriores[0].monto}`
    meses_anterior.innerHTML = `Meses: ${simulaciones_anteriores[0].meses}`
    tasa_anterior.innerHTML = `Tasa: ${simulaciones_anteriores[0].tasa}%`
    cuota_anterior.innerHTML = `Cuota: $${simulaciones_anteriores[0].cuota}`
}


//Eventos Principales

titulo.addEventListener('animationend', () => {
    DeleteFade(titulo)
    DeleteFade(BotonPrincipal)
});

contenedorSecundario.addEventListener("animationend", () => {
    DeleteFlip(contenedorSecundario)
})

BotonPrincipal.onclick = () => {
    Fade(titulo)
    Fade(BotonPrincipal)
    Fade(selectorDeTarjeta)
    Fade(selectorDeCuotas)
    Fade(selectorDeMonto)
    if (contador === 0) {
        titulo.innerHTML = "A continuación elija que tarjeta usted posee"
        parrafo.replaceWith(selectorDeTarjeta)
        BotonPrincipal.innerHTML = "Siguiente"
        contador = contador + 1
    }
    else if (contador == 1) {
        eleccion_tarjeta = prestamistas.find(p => p.nombre == selectorDeTarjeta.options[selectorDeTarjeta.selectedIndex].value)
        prestamoAnterior.prestamista = eleccion_tarjeta.nombre
        titulo.innerHTML = `La tarjeta elejida es ${eleccion_tarjeta.nombre}, las cuotas disponibles son:`
        crear_lista_de_cuotas(eleccion_tarjeta)
        for (var i = 0; i < lista_de_cuotas.length; i++) {
            var opcion = document.createElement("option");
            opcion.value = i;
            opcion.text = lista_de_cuotas[i];
            selectorDeCuotas.appendChild(opcion);
        }
        selectorDeTarjeta.replaceWith(selectorDeCuotas)
        BotonPrincipal.innerHTML = "Siguiente"
        contador = contador + 1
    }
    else if (contador == 2) {
        Fade(BotonPrincipal)
        eleccion_cuotas = selectorDeCuotas.options[selectorDeCuotas.selectedIndex].text
        titulo.innerHTML = `Las cuotas elegidas fueron ${eleccion_cuotas}, Ingrese el monto que sea obtener`
        selectorDeCuotas.replaceWith(selectorDeMonto)
        BotonPrincipal.innerHTML = "Siguiente"
        contador = contador + 1
    }
    else if (contador == 3) {
        eleccion_de_monto = parseInt(selectorDeMonto.value)
        prestamoAnterior.monto = eleccion_de_monto
        if (isNaN(eleccion_de_monto)) {
            Swal.fire({
                title: `¡Error!`,
                text: `Introduzca un número válido`,
                icon: `error`,
                confirmButtonText: `Continuar`
            })
        }
        else {
            BotonPrincipal.remove()
            selectorDeMonto.remove()
            contenedorPrincipal.remove()
            tasa = eleccion_tarjeta.lista_de_tasas[parseInt(selectorDeCuotas.options[selectorDeCuotas.selectedIndex].value)]
            prestamoAnterior.tasa = tasa
            meses = parseInt(parseInt(eleccion_cuotas))
            prestamoAnterior.meses = meses
            cuota = (calcular_cuota(eleccion_de_monto, tasa, meses)).toFixed(2)
            prestamoAnterior.cuota = cuota
            if (localStorage.length == 0) {
                prestamoAnterior.id = 1
                let prestamosAnteriores = []
                prestamosAnteriores.push(prestamoAnterior)
                console.log(prestamosAnteriores)
                localStorage.setItem("ListaDePrestamos", JSON.stringify(prestamosAnteriores))
            }
            else {
                let prestamosAnteriores = JSON.parse(localStorage.getItem("ListaDePrestamos"))
                prestamoAnterior.id = (prestamosAnteriores.length) + 1
                console.log(prestamosAnteriores)
                prestamosAnteriores.push(prestamoAnterior)
                localStorage.setItem("ListaDePrestamos", JSON.stringify(prestamosAnteriores))
            }
            Swal.fire({
                title: `¡Gracias por usar el simulador!`,
                text: `El valor de la cuota seria $${cuota}, el prestamo sera guardado y podra ser visualizado al recargar la pagina.`,
                icon: `success`,
                confirmButtonText: `Terminar simulacion`
            })
        }
    }
}

botonSiguiente.onclick = () => {
    if (indiceDeListaDeSimulaciones < (simulaciones_anteriores.length)-1) {
        indiceDeListaDeSimulaciones++
    }
    else {
        indiceDeListaDeSimulaciones = 0
    }
    prestamista_anterior.innerHTML = `Tarjeta: ${simulaciones_anteriores[indiceDeListaDeSimulaciones].prestamista}`
    monto_anterior.innerHTML = `Monto: $${simulaciones_anteriores[indiceDeListaDeSimulaciones].monto}`
    meses_anterior.innerHTML = `Meses: ${simulaciones_anteriores[indiceDeListaDeSimulaciones].meses}`
    tasa_anterior.innerHTML = `Tasa: ${simulaciones_anteriores[indiceDeListaDeSimulaciones].tasa}%`
    cuota_anterior.innerHTML = `Cuota: $${simulaciones_anteriores[indiceDeListaDeSimulaciones].cuota}`
    DeleteFlip(contenedorSecundario)
    Flip(contenedorSecundario)
}

botonAtras.onclick = () => {
    if (indiceDeListaDeSimulaciones > 0) {
        indiceDeListaDeSimulaciones--
    }
    else {
        indiceDeListaDeSimulaciones = (simulaciones_anteriores.length)-1
    }
    prestamista_anterior.innerHTML = `Tarjeta: ${simulaciones_anteriores[indiceDeListaDeSimulaciones].prestamista}`
    monto_anterior.innerHTML = `Monto: $${simulaciones_anteriores[indiceDeListaDeSimulaciones].monto}`
    meses_anterior.innerHTML = `Meses: ${simulaciones_anteriores[indiceDeListaDeSimulaciones].meses}`
    tasa_anterior.innerHTML = `Tasa: ${simulaciones_anteriores[indiceDeListaDeSimulaciones].tasa}%`
    cuota_anterior.innerHTML = `Cuota: $${simulaciones_anteriores[indiceDeListaDeSimulaciones].cuota}`
    DeleteFlip(contenedorSecundario)
    Flip(contenedorSecundario)
}