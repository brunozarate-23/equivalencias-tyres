var enviado = document.getElementById("calcular");
enviado.addEventListener("click", diametro);

function diametro() {
    var ancho = Number(document.getElementById("inputAncho").value);
    var aspecto = Number(document.getElementById("inputAspecto").value);
    var rodado = Number(document.getElementById("inputRodado").value);

    var diametro = 2*(ancho*(aspecto/100))+(rodado*25.4);

    document.getElementById("diametro").innerHTML = "Diametro total : "+ diametro;
}
