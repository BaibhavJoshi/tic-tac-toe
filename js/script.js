const cells = document.querySelectorAll(".cell");
const gameBoard = document.getElementById("game-board");
const players = ["x", "o"];
const random = Math.floor((Math.random() * players.length));
const gameOverMessage = document.getElementById("game-over-message");
const gameOverScreen = document.querySelector(".game-over");
const restartBtn = document.getElementById("restart-btn");
const gameStartScreen = document.getElementById("game-start");
const pvp = document.getElementById("human-btn");
const pve = document.getElementById("ai-btn");
let whoPlays;
let x = [];
let o = [];


function getCombinations(arr) {
    if (arr.length === 0) {
        return [[]];
    }

    const firstElement = arr[0];
    const otherElements = arr.slice(1);

    const combinationsWithoutFirst = getCombinations(otherElements);
    const combinationsWithFirst = [];

    combinationsWithoutFirst.forEach(combination => {
        const combinationWithFirst = [...combination, firstElement];
        combinationsWithFirst.push(combinationWithFirst);
    });

    return [...combinationsWithFirst, ...combinationsWithoutFirst];

}

function markCell(cell, whoPlays) {

    cell.classList.add(whoPlays);
    cell.classList.add("marked");

    // Add to list
    if (whoPlays === "x") {
        x.push(Number(cell.querySelector(".magic-number").innerText))
    } else {
        o.push(Number(cell.querySelector(".magic-number").innerText))
    }

    cell.style.pointerEvents = "none";

}

function unmarkCell(cell, whoPlays) {

    cell.classList.remove(whoPlays);
    cell.classList.remove("marked");

    // Remove from list
    if (whoPlays === "x") {
        x.pop();
    } else {
        o.pop();
    }

    cell.style.pointerEvents = "";
}


function lifeHack(textToDisplay) {

    gameOverMessage.innerText = textToDisplay;
    gameOverScreen.classList.add("show");
    restartBtn.addEventListener("click", () => {
        location.reload();
    });

}

function gameOver(textToDisplay) {

    setTimeout(function () { lifeHack(textToDisplay) }, 200);

}

function checkWin(whoPlays) {

    let toReturn = "incomplete";

    if (whoPlays === "x") {

        if (x.length == 5) {
            toReturn = "d";
            //gameOver("Draw!");
        }

        if (x.length >= 3) {

            let allCombinations = getCombinations(x)

            allCombinations.forEach(arr => {
                let sum = 0;
                if (arr.length === 3) {
                    arr.forEach(e => {
                        sum = sum + e;
                    })
                }
                if (sum === 15) {
                    toReturn = "x"
                    //gameOver("X's victory!");
                }
            });
        }

    } else {

        if (o.length == 5) {
            toReturn = "d";
            //gameOver("Draw!");
        }

        if (o.length >= 3) {

            let allCombinations = getCombinations(o)

            allCombinations.forEach(arr => {
                let sum = 0;
                if (arr.length === 3) {
                    arr.forEach(e => {
                        sum = sum + e;
                    })
                }
                if (sum === 15) {
                    toReturn = "o";
                    //gameOver("O's victory!");
                }
            });
        }
    }

    return toReturn;
}

function switchTurns() {

    // Remove old player label
    gameBoard.classList.remove(whoPlays);

    // Switch player
    if (whoPlays === "x") {
        whoPlays = "o";
    } else {
        whoPlays = "x";
    }

    // Add new player label
    gameBoard.classList.add(whoPlays);

}

function botPlay(whoPlays) {

    // RANDOM CHOICE FOR NOW - UPDATE WITH MINIMAX LATER!!

    let unmarkedCells = [];

    cells.forEach(cell => {
        if (!cell.classList.contains("marked")) {
            unmarkedCells.push(cell);
        }
    });

    let botChoice = unmarkedCells[Math.floor(Math.random() * unmarkedCells.length)];

    console.log(botChoice);

    // ---------------------------------------------------

    setTimeout(function () {

        // Mark cell
        markCell(botChoice, whoPlays)

        // Check win
        let gameStatus = checkWin(whoPlays);
        if (gameStatus === "d") {
            gameOver("Draw!");
            return;
        } else if (gameStatus === "x") {
            gameOver("X's Victory!");
            return;
        } else if (gameStatus === "o") {
            gameOver("O's Victory!");
            return;
        }

        switchTurns();
    }, 200);

}

function handleClickPVP(e) {

    const cell = e.target;

    // Mark cell
    markCell(cell, whoPlays);

    // Check win
    let gameStatus = checkWin(whoPlays);
    if (gameStatus === "d") {
        gameOver("Draw!");
        return;
    } else if (gameStatus === "x") {
        gameOver("X's Victory!");
        return;
    } else if (gameStatus === "o") {
        gameOver("O's Victory!");
        return;
    }

    // Switch turns
    switchTurns();

}

function handleClickPVE(e) {

    const cell = e.target;

    // Mark cell
    markCell(cell, whoPlays);

    // Check win
    let gameStatus = checkWin(whoPlays);
    if (gameStatus === "d") {
        gameOver("Draw!");
        return;
    } else if (gameStatus === "x") {
        gameOver("X's Victory!");
        return;
    } else if (gameStatus === "o") {
        gameOver("O's Victory!");
        return;
    }

    // Switch turns
    switchTurns();

    // AI plays
    botPlay(whoPlays);

}

function startGame(against) {

    gameStartScreen.classList.remove("show");

    // Randomly choose first player
    whoPlays = players[random];

    gameBoard.classList.add(whoPlays);

    if (against === "pvp") {
        // Wait for click
        cells.forEach(cell => {
            cell.addEventListener("click", handleClickPVP, { once: true })
        });
    } else {
        // Wait for click
        cells.forEach(cell => {
            cell.addEventListener("click", handleClickPVE, { once: true })
        });
    }

}

function setGame() {

    // Show start screen
    gameStartScreen.classList.add("show");

    // Handle PVP
    pvp.addEventListener("click", function () { startGame("pvp") });

    // Handle PVE
    pve.addEventListener("click", function () { startGame("pve") });

}


setGame();








