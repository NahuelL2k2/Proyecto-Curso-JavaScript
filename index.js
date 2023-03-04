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

function mostrar_cuotas(obj){
    let cuotas = prompt(`Las cuotas disponibles de ${obj.nombre} son: \n 1. ${obj.cuota1} Cuotas con interes \n 2. ${obj.cuota2} Cuotas con interes \n 3. ${obj.cuota3} Cuotas con interes`)
    return cuotas
}


function calcular_cuota(monto, tasa, meses){
    let valor_de_la_cuota = ((monto/meses) + (monto * (tasa/100))/meses)
    return valor_de_la_cuota
}

const visa = new Prestamista("Visa", 1, 3, 6, 9, 20, 40 ,60);
const mastercard = new Prestamista("Mastercard", 2, 3, 6, 12, 18, 42, 62);
const cabal = new Prestamista("Cabal", 3, 1, 3, 6, 7, 15, 50);
const naranja = new Prestamista("Naranja", 4, 3, 9, 12, 20, 55, 100);
const galicia = new Prestamista("Galicia", 5, 6, 12, 18, 38, 100, 150);

const prestamistas = [visa, mastercard, cabal, naranja, galicia]

let eligio_prestamista = false
let prestamista_deseado
let eligio_cuotas = false
let cuotas_deseadas
let eligio_monto = false
let monto_deseado

while(eligio_prestamista===false){
    var eleccion_de_prestamista = parseInt(prompt(`Bienvenido al Simulador de un prestamo, a continuación le pido que ingrese que tarjeta de credito usted posee: \n 1. Visa \n 2. Mastercard \n 3. Cabal \n 4. Naranja \n 5. Galicia`))
    if(eleccion_de_prestamista <= 5 && eleccion_de_prestamista > 0){
        prestamista_deseado = prestamistas[eleccion_de_prestamista-1]
        eligio_prestamista = true;
    }
}

while(eligio_monto === false){
    var eleccion_de_monto = parseInt(prompt("Ingrese el Monto deseado"));
    var aceptar_monto = parseInt(prompt(`El monto ingresado es ${eleccion_de_monto} \n ¿Esta seguro? \n 1. Si \n 2. No`))
    if (aceptar_monto == 1){
        monto_deseado = eleccion_de_monto
        eligio_monto = true;
    }
}

while(eligio_cuotas === false){
    var eleccion_de_cuotas = mostrar_cuotas(prestamista_deseado);
    if (eleccion_de_cuotas <= 3 && eleccion_de_cuotas > 0){
        cuotas_deseadas = prestamista_deseado.lista_de_cuotas[eleccion_de_cuotas-1]
        var aceptar_cuota = parseInt(prompt(`El valor de la cuota seria ${calcular_cuota(monto_deseado, prestamista_deseado.lista_de_tasas[eleccion_de_cuotas-1], cuotas_deseadas)} \n ¿Estas Seguro? \n 1. Si \n 2. No`))
        if (aceptar_cuota == 1){
            alert("¡Gracias por usar el simulador!")
            eligio_cuotas = true
        }
    }
}

