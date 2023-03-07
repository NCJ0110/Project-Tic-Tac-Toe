const Player = (name, mark) => {
    this.name = name
    this.mark = mark;

    const getName = () => {
        return this.name;
    }

    const getMark = () => {
        return this.mark;
    }

    return {getName, getMark};
}

const displayController = (() => {
    const newGameEl = document.querySelector('.new-game');
    const closeModalEl = document.querySelector('.close-modal');
    const modalEl = document.querySelector('.modal-container');
    const startGameBtnEl = document.querySelector('.start-game-btn');
    const gameBoardEl = document.querySelector('.gameboard');
    const cells = document.querySelectorAll('.cell');
    

    newGameEl.addEventListener('click', (e) => {
        modalEl.style.display = "flex";
    })

    closeModalEl.addEventListener('click', (e) => {
        modalEl.style.display = "none";
    })

    startGameBtnEl.addEventListener('click', (e) => {
        e.preventDefault();
        modalEl.style.display = "none";
        gameBoardEl.classList.add('fade');
        initializeBoard();

    })

    const initializeBoard = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                gameController.playRound(e.target.dataset.index);
                
            })
        })
    }

    
})();

const gameController = (() => {
    const playRound = (cellIndex) => {
        console.log(cellIndex);
    }

    return {playRound};
})();