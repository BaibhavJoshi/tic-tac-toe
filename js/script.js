const cells = document.querySelectorAll(".cell");
const gameBoard = document.getElementById("game-board");
const players = ["x", "o"];
const random=Math.floor((Math.random() * players.length));
const gameOverMessage = document.getElementById("game-over-message");
const gameOverScreen = document.querySelector(".game-over");
const restartBtn = document.getElementById("restart-btn");
let whoPlays;
let x = [];
let o = [];



function getCombinations(arr){
    if(arr.length === 0){
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

function markCell(cell, whoPlays){
    
    cell.classList.add(whoPlays);

    // Add to list
    if(whoPlays === "x"){
        x.push(Number(cell.querySelector(".magic-number").innerText))
    } else {
        o.push(Number(cell.querySelector(".magic-number").innerText))
    }

}

function lifeHack(textToDisplay){
    
    gameOverMessage.innerText = textToDisplay;
    gameOverScreen.classList.add("show");
    restartBtn.addEventListener("click", () => {
        location.reload();
    });

}

function gameOver(textToDisplay){

    setTimeout(function(){lifeHack(textToDisplay)}, 200);

}

function checkWin(){

    if(whoPlays === "x"){

        if(x.length == 5){
            gameOver("Draw!");
        }

        if(x.length >= 3){

            let allCombinations = getCombinations(x)

            allCombinations.forEach(arr => {
                let sum = 0;
                if(arr.length === 3){
                    arr.forEach(e =>{
                        sum = sum + e;
                    })
                }
                if(sum === 15){
                    gameOver("X's victory!");
                }
            });
        }

    } else {

        if(o.length == 5){
            gameOver("Draw!");
        }

        if(o.length >= 3){

            let allCombinations = getCombinations(o)

            allCombinations.forEach(arr => {
                let sum = 0;
                if(arr.length === 3){
                    arr.forEach(e =>{
                        sum = sum + e;
                    })
                }
                if(sum === 15){
                    gameOver("O's victory!");
                }
            });
        }
    }
}

function switchTurns(){

    // Remove old player label
    gameBoard.classList.remove(whoPlays);
    
    // Switch player
    if(whoPlays === "x"){
        whoPlays = "o";
    } else {
        whoPlays = "x";
    }

    // Add new player label
    gameBoard.classList.add(whoPlays);

}

function handleClick(e){
    
    const cell = e.target;
    
    // Mark cell
    markCell(cell, whoPlays); 

    // Check win
    checkWin(whoPlays);

    // Switch turns
    switchTurns(whoPlays);


}

function startGame(){

    // Randomly choose first player
    whoPlays=players[random];

    gameBoard.classList.add(whoPlays);

    // Wait for click
    cells.forEach(cell => {
        cell.addEventListener("click", handleClick, {once:true})
    })
    
}

startGame();








