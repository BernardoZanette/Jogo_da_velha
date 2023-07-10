// Criação de variáveis:

const start = document.getElementById('botao_aviso')

const divs_linha = document.getElementsByClassName('linha')

const casas = document.getElementsByClassName('casa')

const container_aviso = document.getElementById('aviso')

const board = document.getElementsByClassName('game')[0]

let jogador = true
let jogador_img = document.getElementById('jogador')
let jogador_div = document.getElementById('div_nave')

let tiro = document.getElementsByClassName('tiro')[0]
tiro.classList.add('good_beam')

let mira = document.getElementsByClassName('mira')[0]
mira.classList.add('good_aim')

let vitoria = false

let atirando = false

const ops_vitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let jogadas = 0

const posicoes = {
    right: 100,
    left: 100,
    middle: 0,
    top: 100,
    bottom: 100
}

let casaAtual
// ---------- 

// Funções iniciais
const pre_criacao_mensagem = () => {
    jogador_img.style.margin = '0px'
    vitoria = true
    board.setAttribute('class', 'desfoque')
    container_aviso.classList.remove('hide')
    container_aviso.innerHTML = ''
}
const verificarVitoria = () => {
    ops_vitoria.forEach(ops => {
        let div1 = document.getElementById(`casa${ops[0]}`)
        let div2 = document.getElementById(`casa${ops[1]}`)
        let div3 = document.getElementById(`casa${ops[2]}`)
        if (
            div1.classList.contains('adicionado') &&
            div2.classList.contains('adicionado') &&
            div3.classList.contains('adicionado')
        ) {
            if (
                (div1.innerHTML == div2.innerHTML
                && div2.innerHTML == div3.innerHTML)
            ) {
                pre_criacao_mensagem()
                const mensagem_venceu = document.createElement('div')
                mensagem_venceu.innerHTML = !jogador ? '<img src="assets/jogador1.png" class="icones" id="icone_vitoria"> <span>venceu!</span>' : '<img src="assets/jogador2.png" class="icones" id="icone_vitoria"><span>venceu!</span>'
                if (jogador) {
                    mensagem_venceu.style.color = 'red'
                }
                mensagem_venceu.setAttribute('id', 'mensagem_venceu')
                container_aviso.appendChild(mensagem_venceu)
                jogador_div.style.inset = '0px'
                mira.style.visibility = 'hidden'
            }
        }
        if (jogadas == 8) {
            if (vitoria) return
            pre_criacao_mensagem()
            const mensagem_venceu = document.createElement('div')
            mensagem_venceu.innerHTML = 'Empate!'
            mensagem_venceu.setAttribute('id', 'mensagem_venceu')
            container_aviso.appendChild(mensagem_venceu)
            jogador_div.style.inset = '0px'
        }
    });
}

const adicionarValor = (casa_definitiva) => {
    if (vitoria) return;
    casa_definitiva.classList.remove('pre_click')
    // casa_definitiva.innerHTML = ''
    // casa_definitiva.innerHTML = jogador ? '<img src="assets/X_icon.png" class="icones">' : '<img src="assets/O_icon.png" class="icones">'
    jogador = !jogador
    jogador ? jogador_img.src = 'assets/jogador1.png' : jogador_img.src = 'assets/jogador2.png'
    casa_definitiva.classList.add('adicionado')
    if (!jogador) {
        mira.classList.remove('good_aim')
        mira.classList.add('bad_aim')
    }
    else {
        mira.classList.add('good_aim')
        mira.classList.remove('bad_aim')
    }
    verificarVitoria()
}

const adicionarValorTemporario = (casa) => {
    if (vitoria) return;
    casa.classList.add('pre_click')
    casa.innerHTML = jogador ? '<img src="assets/X_icon_temp.png" class="icones">' : '<img src="assets/O_icon_temp.png" class="icones">'
}

// ----------
// Marcação X e O - teclas

let linha = 0
let coluna = 0
var matriz_posicoes = [[], [], []]
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

    board.classList.remove('desfoque')

    let casa_inicial = matriz_posicoes[1][1]
    casa_inicial.classList.add("pre_click")
    casa_inicial.innerHTML = '<img src="assets/X_icon_temp.png" class="icones">'
    casa_inicial_posicoes = casa_inicial.getBoundingClientRect()
    mira.style.visibility = 'visible'
    mira.style.left = ((casa_inicial_posicoes.left + casa_inicial_posicoes.width/2 - mira.width/2)+'px')
    mira.style.top = ((casa_inicial_posicoes.top + casa_inicial_posicoes.height/2 - mira.height/2)+'px')
    movement(1, 1)
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
        if (atirando) return;
        var tecla = event.key;
        if (tecla == 'Enter') {
            // ajeitar variável
            casaAtual = matriz_posicoes[linha][coluna]
            if (casaAtual.classList.contains('adicionado')) return
            animarTiro(jogador_div.getBoundingClientRect(), casaAtual.getBoundingClientRect(), tiro)
            return;
        }
        for (const casa of casas) {
            if (casa.classList.contains('pre_click')) {
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

        casa_movement = matriz_posicoes[linha][coluna]
        if (vitoria) return;
        let posicoes_casa_atual = casa_movement.getBoundingClientRect()
        mira.style.left = (posicoes_casa_atual.left + posicoes_casa_atual.width/2 - mira.width/2)+'px'
        mira.style.top = (posicoes_casa_atual.top + posicoes_casa_atual.height/2 - mira.height/2)+'px'
        
        if (matriz_posicoes[linha][coluna].innerHTML != '') return;
        adicionarValorTemporario(matriz_posicoes[linha][coluna])
    });
}

function animarTiro(posicao_from, posicao_to, element) {
    if (vitoria) return;
    atirando = true
    // const newspaperSpinning = [
    //     {top: posicao_from.top },
    //     { transform: "rotate(360deg) scale(0)" },
    // ];
    const laserAnimation = [
        {
            top: `${posicao_from.top}px`,
            left: `${(posicao_from.left + posicao_from.width / 2 - tiro.width / 2)}px`,
            visibility: 'visible'
        },
        {
            top: `${posicao_to.top}px`,
            left: `${(posicao_from.left + posicao_from.width / 2 - tiro.width / 2)}px`,
            visibility: 'hidden'
        },
    ];
    const laserTiming = {
        duration: 250,
        iterations: 1,
    };
    let anim = element.animate(laserAnimation, laserTiming)
    anim.onfinish = () => {
        element.style.visibility = 'hidden' 
        adicionarValor(casaAtual)
        invertTiro()
        atirando = false
        jogadas++
    }
}

const invertTiro = () => {
    if (tiro.classList.contains('good_beam')) {
        tiro.classList.remove('good_beam')
    }
    else {
        tiro.classList.add('good_beam')
    }
}