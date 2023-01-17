class TTT{
    constructor(){
        this.cpu = [5]
        this.player = []
        this.chosen = [5]
        this.score = {
            player: 0,
            cpu: 0
        }
        this.seqs = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],

            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],

            [1, 5, 9],
            [3, 5, 7]
        ]
        this.cells = document.querySelectorAll('.tic-toc-toe div')
        this.btn = document.querySelector('button')
        this.result = document.querySelector('.result')
        this.init()
    }

    init(){
        this.cells.forEach(cell => 
            cell.addEventListener('click', this.playerChosen, {once: true})
        )
        this.removeEvent(this.cells[4])
        this.cells[4].classList.add('o')
        this.btn.addEventListener('click', this.reset)
    }

    removeEvent(e){
        e.removeEventListener('click', this.playerChosen)
    }

    playerChosen(e){
        const escolha = Number(e.target.className)
        e.target.classList.add('x')
        game.player.push(escolha)
        game.chosen.push(escolha)
        if(game.checkWin(game.player, 'player')){
            game.renderModal('VOCÊ GANHOU!')
            game.scoreUpdate(1, 0)
            return
        }
        if(game.chosen.length < 9){
            setTimeout(game.cpuChosen, 300)
        }else{
            game.cells.forEach(cell => cell.classList.add('tie'))
            game.renderModal('EMPATE!')
        }
    }

    cpuChosen(){
        let test = game.checkCpu()
        test = test === null && !game.chosen.includes(9) ? 9 : test
        if(game.player.length < 2){
            if(test <= 0){
                if(!game.chosen.includes(5)){
                    test = 5
                }else{
                    test = (Math.floor(Math.random() * (9 - 1) + 1))
                    if(game.chosen.includes(test)){
                        test = (Math.floor(Math.random() * (9 - 1) + 1))
                        game.cpuChosen()
                        return
                    }
                }
            }
        }else{
            if(test <= 0){
                test = (Math.floor(Math.random() * (9 - 1) + 1))
                if(game.chosen.includes(test)){
                    test = (Math.floor(Math.random() * (9 - 1) + 1))
                    game.cpuChosen()
                    return
                }
            }
        }
        game.cpu.push(test)
        game.chosen.push(test)
        const div = document.getElementsByClassName(test)[0]
        div.classList.add('o')
        game.removeEvent(div)
        if(game.checkWin(game.cpu, 'cpu')){
            game.renderModal('VOCÊ PERDEU!')
            return
        }
        if(game.chosen.length === 9){
            setTimeout(() => {
                game.cells.forEach(cell => cell.classList.add('tie'))
                game.renderModal('EMPATE!')
            }, 500)
        }
    }

    checkCpu(){
        let best = null
        game.seqs.some((el, index, arr) => {
            const che = el.filter(a => {
               return game.player.includes(a)
            })
            if(che.length >= 2){
                const che2 = arr[index].filter(a =>{
                    if(!che.includes(a) && !game.chosen.includes(a)){
                    best = a
                    return
                    }
                })
            }
        })
        return best            
    }

    renderModal(message){
        setTimeout(() => {
            const h1 = game.result.querySelector('h1')
            h1.innerText = message
            game.result.classList.add('active')
        }, 500)
    }    

    checkWin(values, who){
        const result = game.seqs.some(arr => {
            const combo = arr.filter((el) => values.includes(el))
            if(combo.length >= 3){
                if(who === 'player'){
                    setTimeout(() => {
                        arr.forEach(x => game.cells[x-1].classList.add('win'))
                        game.scoreUpdate(1, 0)
                    }, 500)
                }else{
                    setTimeout(() => {
                        arr.forEach(x => game.cells[x-1].classList.add('lose'))
                        game.scoreUpdate(0, 1)
                    }, 500)
                }
                return true
            }
        })
        return result
    }

    scoreUpdate(player, cpu){
        const elPlayer = document.querySelector('.player')
        const elCpu = document.querySelector('.cpu')
        game.score.player += player
        game.score.cpu += cpu
        elPlayer.innerHTML = game.score.player
        elCpu.innerHTML = game.score.cpu
    }

    reset(){
        game.cpu = [5]
        game.player = []
        game.chosen = [5]
        game.cells.forEach(cell => cell.classList.remove('x', 'o', 'win', 'lose', 'tie'))
        game.result.classList.remove('active')
        game.init()
    }

}


const game = new TTT()