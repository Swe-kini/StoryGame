export let currentWord = "";
export let attemptsLeft = 2;
export let scrambledWord = "";

// Function to scramble words for the puzzle
export function scrambleWord(word) {
    const wordArray = word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray.join("");
}

// Initialize the puzzle
export function initializePuzzle() {
    const words = ["HACK", "SYSTEM", "CODE", "BREAK", "ESCAPE", "PORTAL"];
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    scrambledWord = scrambleWord(currentWord);
    
    document.getElementById("scrambledWord").innerText = `Scrambled word: ${scrambledWord}`;
    document.getElementById("alertMessage").innerText = "";  // Reset message
    document.getElementById("alertMessage").style.color = ""; // Reset color
    attemptsLeft = 2;
}

// Check if the puzzle answer is correct
export function checkPuzzle(showStoryCallback) {
    const userInput = document.getElementById('codeInput').value.trim().toUpperCase();
    const alertMessage = document.getElementById('alertMessage');

    if (userInput === currentWord) {
        alertMessage.innerText = "Correct code! Access granted.";
        alertMessage.style.color = "green";
        showStoryCallback("major_glitch_event");
    } else {
        attemptsLeft--;
        alertMessage.style.color = "red"; 
        if (attemptsLeft > 0) {
            alertMessage.innerText = `Incorrect code! You have ${attemptsLeft} attempt(s) left.`;
        } else {
            alertMessage.innerText = "Incorrect code! The bomb has detonated!";
            showStoryCallback("bunker_explosion");
        }
    }
}

// Function to display the puzzle UI
export function showPuzzle(showStoryCallback) {
    const puzzleContainer = document.createElement('div');
    puzzleContainer.innerHTML = `
        <h2>Code Breaker Puzzle</h2>
        <p id="scrambledWord"></p> 
        <p>Enter the code to continue:</p>
        <input type="text" id="codeInput" placeholder="Enter code here" />
        <button id="submitPuzzle">Submit</button>
        <p id="alertMessage"></p>  
    `;
    document.getElementById('story-text').appendChild(puzzleContainer);
    
    initializePuzzle();

    document.getElementById("submitPuzzle").addEventListener("click", () => {
        checkPuzzle(showStoryCallback);
    });
}
