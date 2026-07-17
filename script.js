/*
Abaixo de 17 Muito abaixo do peso
Entre 17 e 19, 49 Abaixo do peso
Entre 18,5 e 24,99 Peso normal
Entre 25 e 29,99 Acima do peso

Peso / (Altura x altura)
*/

const form = document.getElementById("imc-form");
form.addEventListener("submit", calcular);

function mostrarResultado(classe, titulo, texto) {

    resultado.className = classe;

    resultado.innerHTML = `
        <h2>${titulo}</h2>
        <p>${texto}</p>
    `;

}

function obterClassificacao(imc) {

    if (imc < 18.5) {

        return {
            classe:"alerta",
            mensagem:"Você está abaixo do peso."
        };

    }

    if (imc < 25) {

        return {
            classe:"ideal",
            mensagem:"Você está no peso ideal."
        };

    }

    if (imc < 30) {

        return {
            classe:"alerta",
            mensagem:"Você está acima do peso."
        };

    }

    return {
        classe:"perigo",
        mensagem:"Atenção! Grau de obesidade."
    };

}

function calcular(event) {

    event.preventDefault();

    const pesoInput = document.getElementById("peso");
    const alturaInput = document.getElementById("altura");
    const resultado = document.getElementById("resultado");

    // Remove espaços e aceita vírgula
    const peso = parseFloat(pesoInput.value.replace(",", "."));
    const altura = parseFloat(alturaInput.value.replace(",", "."));

    // Validação
    if (isNaN(peso) || isNaN(altura)) {

        resultado.innerHTML = `
            <h2>⚠️ Atenção</h2>
            <p>Preencha peso e altura corretamente.</p>
        `;

        resultado.className = "erro";

        return;
    }

    if (peso <= 0 || altura <= 0) {

        resultado.innerHTML = `
            <h2>⚠️ Atenção</h2>
            <p>Os valores devem ser maiores que zero.</p>
        `;

        resultado.className = "erro";

        return;
    }

    const imc = peso / (altura * altura);

    let mensagem = "";
    let classe = "";

    if (imc < 18.5) {

        mensagem = "⚠️ Você está abaixo do peso.";
        classe = "alerta";

    } else if (imc < 25) {

        mensagem = "✅ Você está no peso ideal!";
        classe = "ideal";

    } else if (imc < 30) {

        mensagem = "⚠️ Você está acima do peso.";
        classe = "alerta";

    } else {

        mensagem = "🚨 Atenção! Grau de obesidade.";
        classe = "perigo";
    }

    resultado.className = classe;

    resultado.innerHTML = `
        <h2>Seu IMC</h2>

        <h1>${imc.toFixed(2)}</h1>

        <p>${mensagem}</p>
    `;

    pesoInput.value = "";
    alturaInput.value = "";

}
