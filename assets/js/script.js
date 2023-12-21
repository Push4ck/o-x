// Select all elements with class "box"
const boxes = document.querySelectorAll(".box");

// Initialize game variables
let turn = "X";
let isGameOver = false;

// Loop through each box element
boxes.forEach(box => {
    // Clear innerHTML of each box
    box.innerHTML = "";
    
    // Add click event listener to each box
    box.addEventListener("click", () => {
        // Check if the game is not over and the box is empty
        if (!isGameOver && box.innerHTML === "") {
            // Update box content, check for win/draw, and change turn
            box.innerHTML = turn;
            checkWin();
            checkDraw();
            changeTurn();
        }
    });
});

// Function to change turn and update UI
function changeTurn() {
    turn = turn === "X" ? "O" : "X";
    document.querySelector(".bg").style.left = turn === "X" ? "0" : "95px";
}

// Function to check for a win
function checkWin() {
    // Define win conditions as an array of arrays
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    // Loop through win conditions
    for (const condition of winConditions) {
        // Extract innerHTML values of the boxes in the current condition
        const [v0, v1, v2] = condition.map(index => boxes[index].innerHTML);

        // Check for a win and update UI if true
        if (v0 !== "" && v0 === v1 && v0 === v2) {
            handleGameResult(`Congratulations! ${turn} wins`, condition);
        }
    }
}

// Function to check for a draw
function checkDraw() {
    // Check if the game is not over and all boxes are filled
    if (!isGameOver && [...boxes].every(box => box.innerHTML !== "")) {
        // Update UI for a draw
        handleGameResult("It's a draw");
    }
}

// Function to handle game results (win/draw) and update UI
function handleGameResult(result, winningCondition) {
    // Set game over flag
    isGameOver = true;

    // Update results text and display play again button
    document.querySelector("#results").innerHTML = result;
    document.querySelector("#play-again").style.display = "inline";

    // If win, highlight winning boxes
    if (winningCondition) {
        for (const index of winningCondition) {
            boxes[index].style.backgroundColor = "var(--button-background-color)";
            boxes[index].style.color = "var(--border-color)";
        }
    }
}

// Add click event listener to play again button
document.querySelector("#play-again").addEventListener("click", () => {
    // Reset game variables and UI
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    // Reset each box element
    boxes.forEach(box => {
        box.innerHTML = "";
        box.style.removeProperty("background-color");
        box.style.color = "var(--text-color)";
    });
});