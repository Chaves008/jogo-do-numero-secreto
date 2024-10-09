let numerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function mensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

mensagemInicial();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.15});
}

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }   else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('h1', 'Tente novamente')
            exibirTextoNaTela('p', 'O numero secreto é menor que ' + chute);
        }   else {
                exibirTextoNaTela('h1', 'Tente novamente')
                exibirTextoNaTela('p', 'O numero secreto é maior que ' + chute);
        }
        tentativas++;
        limparCampo();
    } 
}


function gerarNumeroAleatorio (){
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeElementosNaLista = numerosSorteados.length;

    if (quantidadeElementosNaLista == numeroMaximo) {
        numerosSorteados = [];
    }
    if (numerosSorteados.includes(numeroEscolhido)) { // verifica se o valor tá na lista
        return gerarNumeroAleatorio();
    }   else {
        numerosSorteados.push(numeroEscolhido); // adiciona o valor da lista ao final
        console.log(numerosSorteados)
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}