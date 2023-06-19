// Criação de variáveis:

const start = document.getElementById('botao_aviso')

const divs_linha = document.getElementsByClassName('linha')

const casas = document.getElementsByClassName('casa')

const container_aviso = document.getElementById('aviso')

const bord = document.getElementsByClassName('game')[0]

let jogador = true 
let jogador_img = document.getElementById('jogador')
let jogador_div = document.getElementById('div_nave')

let tiro = document.getElementsByClassName('tiro')[0]

let vitoria = false

const ops_vitoria = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const posicoes = {
    right: 100,
    left: 100,
    middle: 0,
    top: 100,
    bottom: 100 
}
// ---------- 

// Funções iniciais

const verificarVitoria = () => {
    ops_vitoria.forEach(ops => {
        let div1 = document.getElementById(`casa${ops[0]}`)
        let div2 = document.getElementById(`casa${ops[1]}`)
        let div3 = document.getElementById(`casa${ops[2]}`)
        if (
            div1.innerHTML != '' && 
            div2.innerHTML != '' && 
            div3.innerHTML != ''
        ) {
            if (
                div1.innerHTML == div2.innerHTML &&
                div2.innerHTML == div3.innerHTML
            ) {
                jogador_img.style.margin = '0px'
                vitoria = true 
                // alert('Você venceu')
                bord.setAttribute('class', 'desfoque')
                container_aviso.classList.remove('hide')
                container_aviso.innerHTML = ''
                const mensagem_venceu = document.createElement('div')
                mensagem_venceu.innerHTML = !jogador ? '<img src="assets/jogador1.png" class="icones" id="icone_vitoria"> venceu!' : '<img src="assets/jogador2.png" class="icones" id="icone_vitoria">venceu!'
                mensagem_venceu.setAttribute('id', 'mensagem_venceu')
                container_aviso.appendChild(mensagem_venceu)
                jogador_div.style.inset = '0px'
            }
        }
    });
}

const adicionarValor = (casa_definitiva) => {
    if (vitoria) return;
    casa_definitiva.classList.remove('pre_click') 
    casa_definitiva.innerHTML = ''
    casa_definitiva.innerHTML = jogador ? '<img src="assets/X_icon.png" class="icones">' : '<img src="assets/O_icon.png" class="icones">'
    jogador = !jogador
    jogador ? jogador_img.src = 'assets/jogador1.png' : jogador_img.src = 'assets/jogador2.png'
    casa_definitiva.classList.add('adicionado')
    verificarVitoria()
}

const adicionarValorTemporario = (casa_atual) => {
    if (vitoria) return;
    casa_atual.classList.add('pre_click')
    casa_atual.innerHTML = jogador ? '<img src="assets/X_icon_temp.png" class="icones">' : '<img src="assets/O_icon_temp.png" class="icones">'
}

// ----------
// Marcação X e O - teclas

let linha = 0
let coluna = 0
var matriz_posicoes = [[],[],[]]
for (const casa of casas) {
    // console.log(casa)
    matriz_posicoes[linha][coluna] = casa
    if (coluna == 2) {
        linha++
        coluna = -1
    }
    coluna++
}

// ----------
// Jogo - botão start

var posicao_atual = {
    right: 0,
    top: 0
}

start.addEventListener('click', () => {
    container_aviso.setAttribute('class', 'hide')

    bord.classList.remove('desfoque')

    matriz_posicoes[1][1].classList.add("pre_click")
    matriz_posicoes[1][1].innerHTML = '<img src="assets/X_icon_temp.png" class="icones">'
    movement(1,1)
})

const moveJogador = (posicao) => {
    if (vitoria) return;
    switch (posicao) {
        case 'esquerda':
            posicao_atual.right--
            if (posicao_atual.right < -1) posicao_atual.right = -1
            break;
        case 'direita':
            posicao_atual.right++
            if (posicao_atual.right > 1) posicao_atual.right = 1
            break;
        case 'cima':
            posicao_atual.top++
            if (posicao_atual.top > 1) posicao_atual.top = 1
            break;
        case 'baixo':
            posicao_atual.top--
            if (posicao_atual.top < -1) posicao_atual.top = -1
            break;
    }
    switch (posicao_atual.top) {
        case 0: 
            jogador_div.style.top = null
            jogador_div.style.bottom = null
            break
        case 1:
            jogador_div.style.bottom = '100px'
            break
        case -1:
            jogador_div.style.top = '100px'
            break
    }
    switch (posicao_atual.right) {
        case 0: 
            jogador_div.style.right = null
            jogador_div.style.left = null
            break
        case 1:
            jogador_div.style.left = '100px'
            break
        case -1:
            jogador_div.style.right = '100px'
            break
    }
}

const movement = (linha, coluna) => {
    if (vitoria) return;
    document.addEventListener('keydown', (event) => {
        var tecla = event.key;
        if (tecla == 'Enter') {
            // console.log(matriz_posicoes[linha][coluna].className)
            // ajeitar variável
            const casaAtual = matriz_posicoes[linha][coluna]
            if (casaAtual.className == 'casa adicionado') return
            adicionarValor(casaAtual)
            animarTiro(jogador_div.getBoundingClientRect(), casaAtual.getBoundingClientRect(), tiro)
            return;
        }
        for (const casa of casas) {
            if (casa.className == 'casa pre_click') {
                casa.classList.remove('pre_click')
                casa.innerHTML = ''
            }
        }
        console.log(`Key pressed ${tecla}`);

        switch (tecla) {
            case 'ArrowLeft':
                moveJogador('esquerda')
                coluna--
                if (coluna < 0) coluna = 0
                break;
            case 'ArrowRight':
                moveJogador('direita')
                coluna++
                if (coluna > 2) coluna = 2
                break;
            case 'ArrowUp':
                moveJogador('cima')
                linha--
                if (linha < 0) linha = 0
                break;
            case 'ArrowDown':
                moveJogador('baixo')
                linha++
                if (linha > 2) linha = 2
                break;
        }
        if (matriz_posicoes[linha][coluna].innerHTML != '') return;
        adicionarValorTemporario(matriz_posicoes[linha][coluna])     
    });
}

function animarTiro (posicao_from, posicao_to, element) {
    console.log(posicao_from, posicao_to, element)
    // const newspaperSpinning = [
    //     {top: posicao_from.top },
    //     { transform: "rotate(360deg) scale(0)" },
    // ];
    const newspaperSpinning = [
        {  top:`${posicao_from.top}px`,
        right:`${posicao_from.right}px`},
        {  top:`${posicao_to.top}px`,
        right:`${posicao_to.right}px`},
      ];
    const newspaperTiming = {
        duration: 200,
        iterations: 1,
      };
    element.animate(newspaperSpinning, newspaperTiming)   
}