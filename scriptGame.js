const divs_linha = document.getElementsByClassName('linha')
// console.log(divs_linha[0])

const casas = document.getElementsByClassName('casa')

let jogador = true 
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

const adicionarValor = (evento) => {
    if (vitoria) return;
    let casa_click = evento.target
    casa_click.innerHTML = jogador ? 'X' : 'O'
    jogador = !jogador
    verificarVitoria()
}

for (const casa of casas) {
    casa.addEventListener('click', adicionarValor, {once:true})
}