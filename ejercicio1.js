
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcularComision(montoVentas, porcentajeComision = 5) {
    let comision = montoVentas * (porcentajeComision / 100);
    return comision;
}

rl.question("Ingrese el monto total de ventas: ", (ventas) => {
    let montoVentas = Number(ventas);

    if (ventas.trim() === "" || isNaN(montoVentas)) {
        console.log("Error: debe ingresar un monto valido.");
        rl.close();
        return;
    }

    rl.question("Ingrese el porcentaje de comision (ENTER para usar 5%): ", (porcentaje) => {
        let porcentajeComision;

        if (porcentaje.trim() === "") {
            porcentajeComision = undefined;
        } else {
            porcentajeComision = Number(porcentaje);
        }

        if (porcentajeComision !== undefined && isNaN(porcentajeComision)) {
            console.log("Error: el porcentaje debe ser un numero valido.");
        } else {
            let resultado = calcularComision(montoVentas, porcentajeComision);
            console.log("La comision ganada es: $" + resultado.toFixed(2));
        }

        rl.close();
    });
});
