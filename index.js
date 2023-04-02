// Variables del HTML

let BotonPrincipal = document.querySelector("#boton-empezar")
let titulo = document.getElementById("titulo")
let parrafo = document.getElementById("parrafo")
const contenedorSecundario = document.getElementById("contenedor-secundario")



// Clases

class Prestamo{
    constructor(prestamista,monto,meses,tasa,cuota){
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

for (var i = 0; i < opciones.length; i++){
    var opcion = document.createElement("option")
    opcion.value = opciones[i]
    opcion.text = opciones[i]
    selectorDeTarjeta.appendChild(opcion)
}

let lista_de_cuotas = []

// Funciones 

function DeleteFade(elemento){
    elemento.classList.remove("animate__animated","animate__fadeInUp")
}

function Fade(elemento){
    elemento.classList.add("animate__animated","animate__fadeInUp")
    // setTimeout(DeleteFade(elemento),5000)
}

function crear_lista_de_cuotas(obj){
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

let cambiador = 0
let eleccion_tarjeta
let eleccion_cuotas
let eleccion_de_monto
let cuota
let tasa
let meses

//Agregado de Id's y clases

selectorDeTarjeta.classList.add("selector","text-center","rounded", "w-50")

selectorDeCuotas.classList.add("selector","text-center","rounded", "w-50")

selectorDeMonto.classList.add("selector","text-center","rounded", "w-50")

BotonPrincipal.classList.add("w-50")


//Evento Principal

titulo.addEventListener('animationend', () => {
    DeleteFade(titulo)
    DeleteFade(BotonPrincipal)
  });


BotonPrincipal.onclick = () => {
    Fade(titulo)
    Fade(BotonPrincipal)
    Fade(selectorDeTarjeta)
    Fade(selectorDeCuotas)
    Fade(selectorDeMonto)
    if (cambiador === 0){ 
        titulo.innerHTML = "A continuación elija que tarjeta usted posee"
        parrafo.replaceWith(selectorDeTarjeta) 
        BotonPrincipal.innerHTML = "Siguiente"
        cambiador = cambiador + 1
    }
    else if(cambiador == 1){
        eleccion_tarjeta = prestamistas.find(p=> p.nombre == selectorDeTarjeta.options[selectorDeTarjeta.selectedIndex].value)
        localStorage.setItem("prestamista", eleccion_tarjeta.nombre)
        titulo.innerHTML = `La tarjeta elejida es ${eleccion_tarjeta.nombre}, las cuotas disponibles son:`
        crear_lista_de_cuotas(eleccion_tarjeta)
        for (var i = 0; i < lista_de_cuotas.length; i++){
            var opcion = document.createElement("option");
            opcion.value = i;
            opcion.text = lista_de_cuotas[i];
            selectorDeCuotas.appendChild(opcion);
        }
        selectorDeTarjeta.replaceWith(selectorDeCuotas)
        BotonPrincipal.innerHTML = "Siguiente"
        cambiador = cambiador + 1
    }
    else if (cambiador == 2){
        Fade(BotonPrincipal)
        eleccion_cuotas = selectorDeCuotas.options[selectorDeCuotas.selectedIndex].text
        titulo.innerHTML = `Las cuotas elegidas fueron ${eleccion_cuotas}, Ingrese el monto que sea obtener`
        selectorDeCuotas.replaceWith(selectorDeMonto)
        BotonPrincipal.innerHTML = "Siguiente"
        cambiador = cambiador + 1
    }
    else if (cambiador == 3){
        eleccion_de_monto = parseInt(selectorDeMonto.value)
        localStorage.setItem("prestamo", eleccion_de_monto)
        if (isNaN(eleccion_de_monto)){
            alert("Introduzca un numero correcto")
        }
        else{
            BotonPrincipal.remove()
            selectorDeMonto.remove()
            tasa = eleccion_tarjeta.lista_de_tasas[parseInt(selectorDeCuotas.options[selectorDeCuotas.selectedIndex].value)]
            localStorage.setItem("tasa", tasa)
            meses = parseInt(parseInt(eleccion_cuotas))
            localStorage.setItem("meses",meses)
            cuota = (calcular_cuota(eleccion_de_monto, tasa, meses)).toFixed(2)
            localStorage.setItem("cuota", cuota)
            titulo.innerHTML = `El valor de la cuota sería $${cuota}`   
        }
    }
}


if (localStorage.length > 0){

    contenedorSecundario.classList.remove("invisible")

    let guardar_anterior = new Prestamo((localStorage.getItem("prestamista")), localStorage.getItem("prestamo"), localStorage.getItem("meses"), localStorage.getItem("tasa"), localStorage.getItem("cuota"))

    let guardarJson = JSON.stringify(guardar_anterior)
    localStorage.setItem("ultima_simulacion", guardarJson)

    let ultima_simulacion = JSON.parse(localStorage.getItem("ultima_simulacion"))
    console.log(ultima_simulacion)

    let prestamista_anterior = document.getElementById("prestamista")
    let monto_anterior = document.getElementById("monto")
    let meses_anterior = document.getElementById("meses")
    let tasa_anterior = document.getElementById("tasa")
    let cuota_anterior = document.getElementById("cuota")
    
    prestamista_anterior.innerHTML = `Tarjeta: ${ultima_simulacion.prestamista}`
    monto_anterior.innerHTML = `Monto: $${ultima_simulacion.monto}`
    meses_anterior.innerHTML = `Meses: ${ultima_simulacion.meses}`
    tasa_anterior.innerHTML = `Tasa: ${ultima_simulacion.tasa}%`
    cuota_anterior.innerHTML = `Cuota: $${ultima_simulacion.cuota}`
}