document.getElementById("calcular").addEventListener("click", diametro);

function diametro() {
    var ancho = Number(document.getElementById("inputAncho").value);
    var aspecto = Number(document.getElementById("inputAspecto").value);
    var rodado = Number(document.getElementById("inputRodado").value);

    var diametro = 2 * (ancho * (aspecto / 100)) + (rodado * 25.4);
    
    // Call the async function properly
    equivalencias(diametro);
}

async function equivalencias(diametro) {
    try {
        const response = await fetch('./db/diametros.json', { mode: 'cors' });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonDiametros = await response.json();

        const lowerLimit = diametro * 0.985;
        const upperLimit = diametro * 1.015;

        const equivalencias = jsonDiametros.filter(item =>
            item.diametro >= lowerLimit && item.diametro <= upperLimit
        );

        console.log(equivalencias);
        displayResults(equivalencias);

    } catch (error) {
        console.error("Error loading JSON:", error);
    }
}

function displayResults(items) {
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = ""; // Clear previous results

    if (items.length === 0) {
        resultDiv.innerHTML = "<p>No equivalent diameters found.</p>";
        return;
    }

    items.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `${item.producto}: ${item.diametro}`;
        resultDiv.appendChild(p);
    });
}
