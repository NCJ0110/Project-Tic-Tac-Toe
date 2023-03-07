const Player = (playerName, playerMark) => {
    let name = playerName
    let mark = playerMark;

    const setName = (updatedName) => {
        name = updatedName
    }

    const getName = () => {
        return name;
    }

    const getMark = () => {
        return mark;
    }

    return {getName, getMark, setName};
}

const displayController = (() => {
    const newGameEl = document.querySelector('.new-game');
    const closeModalEl = document.querySelector('.close-modal');
    const modalEl = document.querySelector('.modal-container');
    const startGameBtnEl = document.querySelector('.start-game-btn');
    const gameBoardEl = document.querySelector('.gameboard');
    const cells = document.querySelectorAll('.cell');
    const playerOneNameEl = document.querySelector('#name-input-one');
    const playerTwoNameEl = document.querySelector('#name-input-two');
    

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
        if(playerOneNameEl.value !== "" && playerTwoNameEl.value !== ""){
            gameController.setPlayers(playerOneNameEl.value, playerTwoNameEl.value);
        }
        
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
    const playerOne = Player('PlayerOne', 'X');
    const playerTwo = Player('PlayerTwo', 'O');

    const playRound = (cellIndex) => {
        console.log(cellIndex);
        
    }

    const setPlayers = (playerOneName, playerTwoName) => {
        playerOne.setName(playerOneName);
        playerTwo.setName(playerTwoName);
        
    }

    return {playRound, setPlayers};
})();