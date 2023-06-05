// começo do jogo:
const start = document.getElementById('botao_aviso')

start.addEventListener('click', () => {
    const container_aviso = document.getElementById('aviso')
    container_aviso.setAttribute('class', 'hide')
    
    const bord = document.getElementsByClassName('game')[0]
    bord.classList.remove('desfoque')

    const body = document.body
    const script = document.createElement('script')
    script.setAttribute('src', 'scriptGame.js')
    body.append(script)
})