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

    const resetBoard = () => {
        for(let i = 0; i < board.length; i++){
            board[i] = "";
        }
    }

    return {setBoard, getBoard, resetBoard};
})();

const displayController = (() => {
    const newGameEl = document.querySelector('.new-game');
    const resetGameEl = document.querySelector('.reset-game');
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
            gameController.resetGame();
            gameInfoEl.innerText = `It's ${gameController.getCurrentPlayerName()}'s turn`;
            modalEl.style.display = "none";
            gameBoardEl.classList.add('fade');

            gameBoard.resetBoard();
            resetDisplay();
            initializeBoard();
        }
    })

    resetGameEl.addEventListener('click', (e) => {
        resetDisplay();
        gameController.resetGame();
        gameBoard.resetBoard();
        gameInfoEl.innerText = `It's ${gameController.getCurrentPlayerName()}'s turn`;
    })

    

    const initializeBoard = () => {
        cells.forEach(cell => {
            cell.addEventListener('click', (e) => {
                if(gameController.gameOver()) return;
                gameController.playRound(e.target);
                           
            })
        })
    } 

    const updateGameInfoPlayer = (currentPlayerName) => {
        gameInfoEl.innerText = `It's ${currentPlayerName}'s turn`;
    }

    const updateGameInfoWinner = (currentPlayerName) => {
        gameInfoEl.innerText = `${currentPlayerName} has won!`
    }

    const resetDisplay = () => {
        cells.forEach(cell => {
            cell.innerText = "";
        })
    }

    return {updateGameInfoPlayer, updateGameInfoWinner};
})();

const gameController = (() => {
    const playerOne = Player('PlayerOne', 'X');
    const playerTwo = Player('PlayerTwo', 'O');
    let gameMode;
    let currentPlayer = playerOne;
    let isGameOver = false;

    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    const playRound = (cellEvent) => {
        if(gameMode === 'pvp'){
            playPlayerVsPlayerRound(cellEvent);
        }     
    }

    const setPlayers = (playerOneName, playerTwoName) => {
        playerOne.setName(playerOneName);
        playerTwo.setName(playerTwoName);
    }

    const setGameMode = (newGameMode) => {
        gameMode = newGameMode;
    }

    const getCurrentPlayerName = () => {
        return currentPlayer.getName();
    }

    const playPlayerVsPlayerRound = (cellEvent) => { 
        if(cellEvent.innerText === "X" || cellEvent.innerText === "O"){
            return;
        } else {
            cellEvent.innerText = currentPlayer.getMark();
        }
        gameBoard.setBoard(cellEvent.dataset.index, currentPlayer.getMark());
        if(checkForWin()){
            isGameOver = true;
            displayController.updateGameInfoWinner(currentPlayer.getName());
            return;
        } 
        currentPlayer = currentPlayer.getMark() === 'X' ? playerTwo : playerOne;
        displayController.updateGameInfoPlayer(currentPlayer.getName());
    }


    const checkForWin = () => {
        let hasWon = false;
        winConditions.forEach(condition => {
            if(gameBoard.getBoard(condition[0]) === currentPlayer.getMark() &&
               gameBoard.getBoard(condition[1]) === currentPlayer.getMark() &&
               gameBoard.getBoard(condition[2]) === currentPlayer.getMark()) {
                hasWon = true;
               } 
        })

        return hasWon;
    }

    const gameOver = () => {
        return isGameOver;
    }

    const resetGame = () => {
        currentPlayer = playerOne;
        isGameOver = false;
    }

    return {playRound, setPlayers, setGameMode, getCurrentPlayerName, resetGame, gameOver};
})();