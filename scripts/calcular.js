document.getElementById("calcular").addEventListener("click", diametro);

function diametro() {
    var ancho = Number(document.getElementById("inputAncho").value);
    var aspecto = Number(document.getElementById("inputAspecto").value);
    var rodado = Number(document.getElementById("inputRodado").value);

    var diametro = 2 * (ancho * (aspecto / 100)) + (rodado * 25.4);

    document.getElementById("diametro").textContent = "El diametro ingresado es " + diametro;
    equivalencias(diametro, rodado);
}

async function equivalencias(diametro, rodado) {
    try {
        const response = await fetch('./db/diametros.json', { mode: 'cors' });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonDiametros = await response.json();

        const lowerLimit = diametro * 0.985;
        const upperLimit = diametro * 1.015;

        const equivalencias = jsonDiametros.filter(item =>
            item.diametro >= lowerLimit && item.diametro <= upperLimit && item.diametro !== diametro && item.rodado == rodado
        );

        console.log(equivalencias);
        displayResults(equivalencias);

    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

function displayResults(items) {
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "";

    if (items.length === 0) {
        resultDiv.innerHTML = "<p>No se poseen equivalencias en este momento.</p>";
        return;
    }

    items.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `Cod: ${item.cod} - ${item.marca} - ${item.producto}`;
        resultDiv.appendChild(p);
    });
}
