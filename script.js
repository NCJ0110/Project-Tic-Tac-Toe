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

const gameBoard = (() => {
    const board = ['', '', '','', '', '','', '', '',];

    const setBoard = (cellIndex, mark) => {
        board[cellIndex] = mark;
    }

    const getBoard = (cellIndex) => {
        return board[cellIndex];
    }

    return {setBoard, getBoard};
})();

const displayController = (() => {
    const newGameEl = document.querySelector('.new-game');
    const closeModalEl = document.querySelector('.close-modal');
    const modalEl = document.querySelector('.modal-container');
    const startGameBtnEl = document.querySelector('.start-game-btn');
    const gameBoardEl = document.querySelector('.gameboard');
    const cells = document.querySelectorAll('.cell');
    const playerOneNameEl = document.querySelector('#name-input-one');
    const playerTwoNameEl = document.querySelector('#name-input-two');
    const gameInfoEl = document.querySelector('.game-info');
    const pvpRadioEl = document.querySelector('#pvp');
    const aiEasyRadioEl = document.querySelector('#ai-easy');
    

    newGameEl.addEventListener('click', (e) => {
        modalEl.style.display = "flex";
    })

    closeModalEl.addEventListener('click', (e) => {
        modalEl.style.display = "none";
    })

    startGameBtnEl.addEventListener('click', (e) => {
        e.preventDefault();

        if(playerOneNameEl.value === "" || playerTwoNameEl.value === ""){
            playerOneNameEl.style.borderColor = playerOneNameEl.value === "" ? 'red' : 'green';
            playerTwoNameEl.style.borderColor = playerTwoNameEl.value === "" ? 'red' : 'green';
            return;
            
        } else {
            gameController.setPlayers(playerOneNameEl.value, playerTwoNameEl.value);
            if(pvpRadioEl.checked){
                gameController.setGameMode(pvpRadioEl.value);
            } else if(aiEasyRadioEl.checked){
                gameController.setGameMode(aiEasyRadioEl.value);
            }
            gameInfoEl.innerText = `It is ${gameController.getCurrentPlayerName()}'s turn`;
            modalEl.style.display = "none";
            gameBoardEl.classList.add('fade');
            resetDisplay();
            initializeBoard();
        }
       

    })

    const initializeBoard = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                gameController.playRound(e.target);
                
            })
        })
    } 

    const updateGameInfoPlayer = (currentPlayerName) => {
        gameInfoEl.innerText = `It is ${currentPlayerName}'s turn`;
    }

    const resetDisplay = () => {
        cells.forEach(cell => {
            cell.innerText = "";
        })
    }

    return {updateGameInfoPlayer};
})();

const gameController = (() => {
    const playerOne = Player('PlayerOne', 'X');
    const playerTwo = Player('PlayerTwo', 'O');
    let gameMode;
    let currentPlayer = playerOne;

    // const winConditions = [
    //     [0,1,2],
    //     [3,4,5],
    //     [6,7,8],
    //     [0,3,6],
    //     [1,4,7],
    //     [2,5,8],
    //     [0,4,8],
    //     [2,4,6]
    // ]

    const playRound = (cellEvent) => {
        if(gameMode === 'pvp'){
            
            playPlayerVsPlayerRound(cellEvent);
        }
       
        
    }

    const setPlayers = (playerOneName, playerTwoName) => {
        playerOne.setName(playerOneName);
        playerTwo.setName(playerTwoName);
        
    }

    const getCurrentPlayerName = () => {
        return currentPlayer.getName();
    }

    const setGameMode = (newGameMode) => {
        gameMode = newGameMode;
    }

    const playPlayerVsPlayerRound = (cellEvent) => {
        if(cellEvent.innerText === "X" || cellEvent.innerText === "O"){
            return;
        } else {
            cellEvent.innerText = currentPlayer.getMark();
        }
        
        currentPlayer = currentPlayer.getMark() === 'X' ? playerTwo : playerOne;
        displayController.updateGameInfoPlayer(currentPlayer.getName());
    }

    return {playRound, setPlayers, setGameMode, getCurrentPlayerName};
})();