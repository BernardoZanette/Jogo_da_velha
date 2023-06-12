// Criação de variáveis:

const start = document.getElementById('botao_aviso')

const divs_linha = document.getElementsByClassName('linha')

const casas = document.getElementsByClassName('casa')

const container_aviso = document.getElementById('aviso')

const bord = document.getElementsByClassName('game')[0]

let jogador = true 
let jogador_img = document.getElementById('jogador')
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
    right: 65,
    left: 65,
    middle: 0 
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
                mensagem_venceu.innerHTML = !jogador ? '<img src="jogador1.png" class="icones" id="icone_vitoria"> venceu!' : '<img src="jogador2.png" class="icones" id="icone_vitoria">venceu!'
                mensagem_venceu.setAttribute('id', 'mensagem_venceu')
                container_aviso.appendChild(mensagem_venceu)
            }
        }
    });
}

const adicionarValor = (casa_definitiva) => {
    if (vitoria) return;
    casa_definitiva.classList.remove('pre_click') 
    casa_definitiva.innerHTML = ''
    casa_definitiva.innerHTML = jogador ? '<img src="X_icon.png" class="icones">' : '<img src="O_icon.png" class="icones">'
    jogador = !jogador
    jogador ? jogador_img.src = 'jogador1.png' : jogador_img.src = 'jogador2.png'
    casa_definitiva.classList.add('adicionado')
    verificarVitoria()
}

const adicionarValorTemporario = (casa_atual) => {
    if (vitoria) return;
    casa_atual.classList.add('pre_click')
    casa_atual.innerHTML = jogador ? '<img src="X_icon_temp.png" class="icones">' : '<img src="O_icon_temp.png" class="icones">'
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

var posicao_atual = 0

start.addEventListener('click', () => {
    container_aviso.setAttribute('class', 'hide')

    bord.classList.remove('desfoque')

    matriz_posicoes[1][1].classList.add("pre_click")
    matriz_posicoes[1][1].innerHTML = '<img src="X_icon_temp.png" class="icones">'
    movement(1,1)
})

const moveJogador = (posicao) => {
    if (vitoria) return;
    switch (posicao) {
        case 'esquerda':
            posicao_atual--
            if (posicao_atual < -1) posicao_atual = -1
            break;
        case 'direita':
            posicao_atual++
            if (posicao_atual > 1) posicao_atual = 1
            break;
    }
    switch (posicao_atual) {
        case 0: 
            jogador_img.style.margin = '0px'
            break
        case 1:
            jogador_img.style.marginLeft = '65%'
            break
        case -1:
            jogador_img.style.marginRight = '65%'
            break
    }
    
}

const movement = (linha, coluna) => {
    if (vitoria) return;
    document.addEventListener('keydown', (event) => {
        var tecla = event.key;
        if (tecla == 'Enter') {
            console.log(matriz_posicoes[linha][coluna].className)
            if (matriz_posicoes[linha][coluna].className == 'casa adicionado') return
            adicionarValor(matriz_posicoes[linha][coluna])
            console.log('Valor definitivo')
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
                linha--
                if (linha < 0) linha = 0
                break;
            case 'ArrowDown':
                linha++
                if (linha > 2) linha = 2
                break;
        }
        if (matriz_posicoes[linha][coluna].innerHTML != '') return;
        adicionarValorTemporario(matriz_posicoes[linha][coluna])     
    });
}