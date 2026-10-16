
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calcularCostoTotal(tarifaSeguro = 15, ...pesosPaquetes) {
    let pesoTotal = 0;

    for (let peso of pesosPaquetes) {
        pesoTotal += peso;
    }

    let costoEnvio = pesoTotal * 3.50;
    let totalPagar = costoEnvio + tarifaSeguro;

    return totalPagar;
}

function imprimirCotizacion(cliente, totalCobro) {
    console.log("\n===== COTIZACION DE ENVIO =====");
    console.log("Cliente: " + cliente);
    console.log("Total a pagar: $" + totalCobro.toFixed(2));
    console.log("===============================");
}

rl.question("Ingrese el nombre del cliente: ", (cliente) => {
    rl.question("Ingrese la tarifa del seguro (ENTER para usar $15): ", (seguro) => {
        let tarifaSeguro;

        if (seguro.trim() === "") {
            tarifaSeguro = undefined;
        } else {
            tarifaSeguro = Number(seguro);
        }

        if (tarifaSeguro !== undefined && (isNaN(tarifaSeguro) || tarifaSeguro < 0)) {
            console.log("Error: ingrese una tarifa de seguro valida.");
            rl.close();
            return;
        }

        rl.question("Ingrese los pesos de los paquetes en kg separados por comas: ", (entradaPesos) => {
            let pesosPaquetes = entradaPesos.split(",").map(peso => Number(peso.trim()));

            if (entradaPesos.trim() === "" || pesosPaquetes.some(peso => isNaN(peso) || peso < 0)) {
                console.log("Error: ingrese pesos validos separados por comas.");
                rl.close();
                return;
            }

            let totalCobro;

            if (tarifaSeguro === undefined) {
                totalCobro = calcularCostoTotal(undefined, ...pesosPaquetes);
            } else {
                totalCobro = calcularCostoTotal(tarifaSeguro, ...pesosPaquetes);
            }

            imprimirCotizacion(cliente, totalCobro);

            rl.close();
        });
    });
});
