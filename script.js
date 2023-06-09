// Criação de variáveis:

const start = document.getElementById('botao_aviso')

const divs_linha = document.getElementsByClassName('linha')

const casas = document.getElementsByClassName('casa')

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
                vitoria = true 
                alert('Você venceu')
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

start.addEventListener('click', () => {
    const container_aviso = document.getElementById('aviso')
    container_aviso.setAttribute('class', 'hide')
    
    const bord = document.getElementsByClassName('game')[0]
    bord.classList.remove('desfoque')

    matriz_posicoes[1][1].classList.add("pre_click")
    matriz_posicoes[1][1].innerHTML = '<img src="X_icon_temp.png" class="icones">'
    movement(1,1)
})

const movement = (linha, coluna) => {
    document.addEventListener('keydown', (event) => {
        var tecla = event.key;
        if (tecla == 'Enter') {
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
                coluna--
                break;
            case 'ArrowRight':
                coluna++
                break;
            case 'ArrowUp':
                linha--
                break;
            case 'ArrowDown':
                linha++
                break;
        }
        adicionarValorTemporario(matriz_posicoes[linha][coluna])     
    });
}

// bugs: margin right e left no ArrowLeft e ArrowRight
// sobreposição de valor temporário pós-escolha: linha 124, if (matriz_posicoes[linha][coluna].innerHTML != '') return ?