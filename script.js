
const story = {
    start: {
        text: "You wake up on a mysterious island.The sky flickers unnaturally.",
        image: "images/island.jpeg",
        sound: "images/waves.mp3",
        choices: [
            { text: "Explore the Beach", nextScene: "beach" },
            { text: "Enter the Jungle", nextScene: "jungle" },
            { text: "Climb the Cliff", nextScene: "cliff" }
        ]
    },
    beach: {
        text: "You find a blinking device in the sand.",
        sound: "images/waves.mp3",
        image: "images/device.jpeg",
        choices: [
            { text: "Press the Button", nextScene: "beach_button_pressed" },
            { text: "Ignore it", nextScene: "move" }
        ]
    },
    move: {
        text: "You move forward and see a drone flying away.",
        image: "images/drone1.webp",
        choices: [
            { text: "Chase the drone", nextScene: "drone" },
            { text: "Destroy it", nextScene: "explosion" },
        ]
    },
    explosion: {},

    beach_button_pressed: {
        text: "The device lights up, revealing three colored buttons.",
        image: "images/button.jpeg",
        choices: [
            { text: "Press the Red Button", nextScene: "red_button" },
            { text: "Press the Blue Button", nextScene: "blue_button" },
            { text: "Press the Green Button", nextScene: "green_button" }
        ]
    },

    red_button: {
        text: "SYSTEM OVERLOAD IMMINENT!",
        image: "images/red.webp",
        choices: [
            { text: "Try to Shut it Down", nextScene: "glitch" },
            { text: "Let it Happen", nextScene: "control_ending" }
        ]
    },
    
    blue_button: {
        text: "The device projects a holographic map of the island.",
        image: "images/blue.webp",
        choices: [
            { text: "climb cliff", nextScene: "cliff" },
            { text: "enter jungle", nextScene: "jungle" }
        ]
    },

    green_button: {
        text: "Device explosion activated",
        image: "images/button.jpeg",
        
    },

    jungle: {
        text: "You hear strange noises in the jungle.",
        image: "images/forest.jpeg",
        sound: "images/jungle.mp3",
        choices: [
            { text: "Follow the Noises", nextScene: "bunker" },
            { text: "Hunt the Glitching Animal", nextScene: "animal" }
        ]
    },
    cliff: {
        text: "You notice the sun resetting every few minutes.Also you notices a tower at the edge of the cliff",
        image: "images/sun.jpeg",
        choices: [
            { text: "Head to the Tower", nextScene: "tower" },
            { text: "Think", nextScene: "vision" }
        ]
    },
    glitch: {
        text: "Reality distorts. A voice echoes: 'You are not supposed to be here.'",
        image: "images/beachglitch.jpeg",
        sound: "images/glitch.mp3",
        choices: [
            { text: "Hack the System", nextScene: "control_ending" },
            { text: "Escape Through the Portal", nextScene: "escape_ending" },
            { text: "Reset Simulation", nextScene: "start" }
        ]
    },
    drone: {
        text: "You move forward and see the drone moving away.You chase it and on the run you saw a boat on the shore",
        image: "images/sawboat.webp",
        choices: [
            { text: "Continue chasing", nextScene: "bunker" },
            { text: "take the boat", nextScene: "boat" }
        
        ]
    },
    boat: {
        text: "You are athe middle of the ocean and your boat starts to drown",
        image:"images/drown.webp",
       
    },
    
    bunker: {
        text: "You discover a hidden bunker entrance. A locked panel with a flickering screen stands in your way.",
        image: "images/bunker.jpeg",
        
        choices: [
            { text: "Attempt to Hack the Panel", nextScene: "bunker_task" },
            { text: "Turn Back", nextScene: "jungle" }
        ]
    },
    
    bunker_task: {
        text: "You must enter the correct sequence to bypass the security system. A timer starts counting down...",
        image: "images/bunker.jpeg",
        sound: "/timer-beeping.mp3",
        task: {
            type: "puzzle",
        }
    },
    
    bunker_explosion: {
        text: "You fail to hack the system in time. A siren blares, and suddenly, a loud explosion engulfs the bunker...",
        
        sound: "images/explosion.mp3",
        
    },
    
    animal: {
        text: "The creature is a glitch. You obtain a data chip.",
        image: "images/dead.webp",
        choices: [
            { text: "Decode Hidden Logs", nextScene: "glitch_event" },
            { text: "Run away", nextScene: "ignore" }

        ]
    },
    tower: {
        text: "You move towards the tower ",
        image: "images/tower.webp",
        choices: [
            { text: "Go inside", nextScene: "inside" },
            { text: "leave", nextScene: "ignore" }
        ]
    },
    ignore: {
        text: "You move forward and sees a drown",
        image: "images/ignore.jpeg",
        choices: [
            { text: "Chase the drone", nextScene: "drone" },
            { text: "Destroy it", nextScene: "explosion" },
        ]
    },
    inside: {
        text: "You find a malfunctioning control panel.",
        image: "images/insidebunker.jpeg",
        choices: [
            { text: "Manually Fix the System", nextScene: "control_ending" },
            { text: "Force Shutdown", nextScene: "mystery_ending" }
        ]
    },
    vision: {
        text: "You recall a memory of escaping a lab.",
        image: "images/lab.webp",
        choices: [
            { text: "Search for lab", nextScene: "bunker" },
            { text: "Ignore", nextScene: "ignore" },

        ]
    },
    glitch_event: {
        text: "Reality begins to collapse. What do you do?",
        image: "images/collapse.jpg",
        sound: "images/glitch.mp3",
        choices: [
            { text: "Hack the System", nextScene: "control_ending" },
            { text: "Escape Through a Portal", nextScene: "escape_ending" },
            { text: "Reset the Simulation", nextScene: "start" }
        ]
    },
    control_ending: { text: "You override the system and reshape reality. " ,image: "images/reality.webp"},
    escape_ending: { text: "You enter a portal, waking up in a different world. " ,image: "images/escape.web"},
    flashback_ending: { text: "You wake up in a lab, realizing you were a test subject. ",image: "images/lab.web" },
    mystery_ending: { text: "An unknown consequence unfolds... " ,image: "images/mystery.web"}
};


const words = ["HACK", "SYSTEM", "CODE", "BREAK", "ESCAPE", "PORTAL"];
let currentWord = "";
let attemptsLeft = 2;
let scrambledWord = "";
let currentAudio = null;

function playLoopingSound(url) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = new Audio(url);
    currentAudio.loop = true;
    currentAudio.play();
}

function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

function showPuzzle() {
    document.getElementById("game-container").style.display = "none"; // Hide main game container
    const puzzleContainer = document.getElementById("puzzle-container");
    puzzleContainer.style.display = "block"; // Show puzzle container
    
    puzzleContainer.innerHTML = `
        <h2>Code Breaker Puzzle</h2>
        <p id="scrambledWord"></p> 
        <p>Enter the code to continue:</p>
        <input type="text" id="codeInput" placeholder="Enter code here" />
        <button onclick="checkPuzzle()">Submit</button>
        <p id="alertMessage"></p>  
    `;
    
    initializePuzzle(); // Start the puzzle logic
}

function scrambleWord(word) {
    const wordArray = word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    return wordArray.join("");
}

function initializePuzzle() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    scrambledWord = scrambleWord(currentWord);
    
    document.getElementById("scrambledWord").innerText = `Scrambled word: ${scrambledWord}`;
    document.getElementById("alertMessage").innerText = "";  
    document.getElementById("alertMessage").style.color = ""; 
    attemptsLeft = 2;
}

function checkPuzzle() {
    const userInput = document.getElementById('codeInput').value.trim().toLowerCase(); // Convert input to lowercase
    const alertMessage = document.getElementById('alertMessage');
    const puzzleBox = document.getElementById('puzzle-container'); // Corrected the ID

    if (userInput === currentWord.toLowerCase()) { // Case-insensitive comparison
        document.getElementById("game-container").style.display = "block";
        puzzleBox.style.display = "none"; // Hide puzzle
        showStory("glitch_event"); // Proceed to glitch event
    } else {
        attemptsLeft--;
        alertMessage.style.color = "red";

        if (attemptsLeft > 0) {
            alertMessage.innerText = `Incorrect code! You have ${attemptsLeft} attempt(s) left.`;
        } else {
            showExplosionScene(); // If out of attempts, explosion happens
        }
    }
}


    


//boat puzzle
const puzzles = [
    {
        question: "What has to be broken before you can use it?",
        choices: ["Egg", "Mirror", "Glass", "Lock"],
        answer: "Egg"
    },
    {
        question: "I speak without a mouth and hear without ears. What am I?",
        choices: ["Shadow", "Echo", "Wind", "Fire"],
        answer: "Echo"
    },
    {
        question: "The more of me you take, the more you leave behind. What am I?",
        choices: ["Memory", "Footsteps", "Shadow", "Breath"],
        answer: "Footsteps"
    },
    {
        question: "I have keys but open no locks. What am I?",
        choices: ["Treasure Chest", "Piano", "Computer", "Car"],
        answer: "Piano"
    }
];

let timer;
let countdown = 20; 
function showDrowningPuzzle() {
    document.getElementById("game-container").style.display = "none"; // Hide the game container
    const puzzleContainer = document.getElementById("puzzle-container");
    puzzleContainer.style.display = "block"; // Show the puzzle container
    
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];

    let choicesHTML = "";
    randomPuzzle.choices.forEach(choice => {
        choicesHTML += `<button class="choice-button" onclick="checkPuzzleAnswer('${choice}', '${randomPuzzle.answer}')">${choice}</button>`;
    });

    puzzleContainer.innerHTML = `
        <h2>You're drowning! Solve this puzzle to stay alive:</h2>
        <p>${randomPuzzle.question}</p>
        <div id="timer">⏳ Time left: <span id="countdown">${countdown}</span> seconds</div>
        ${choicesHTML}
    `;

    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const countdownElement = document.getElementById("countdown");

    if (countdown > 0) {
        countdown--;
        countdownElement.textContent = countdown;
    } else {
        clearInterval(timer);
        showDrowningEnding(); 
    }
}

function checkPuzzleAnswer(selectedAnswer, correctAnswer) {
    clearInterval(timer); 

    if (selectedAnswer === correctAnswer) {
        playSound("success.mp3");
        showSurvivalEnding();
    } else {
        playSound("failure.mp3");
        showDrowningEnding(); 
    }
}

function showSurvivalEnding() {
    document.getElementById("game-container").style.display = "none";
    const puzzleContainer = document.getElementById("puzzle-container");
    puzzleContainer.style.display = "block";
    puzzleContainer.innerHTML = `
        <h1>You solved the puzzle and survived!</h1>
        <p>A mysterious force pulls you out of the water...</p>
        <button onclick="restartGame()">Restart</button>
    `;
}

function showDrowningEnding() {
    document.getElementById("game-container").style.display = "none";
    const puzzleContainer = document.getElementById("puzzle-container");
    puzzleContainer.style.display = "block";
    
    puzzleContainer.innerHTML = `
        <h1 class="fade-out">You drowned...</h1>
        <p>The ocean swallows you whole. Darkness surrounds you.</p>
        <button onclick="restartGame()">Restart</button>
    `;

    setTimeout(() => {
        document.querySelector(".fade-out").style.opacity = "0";
    }, 1000);
}


function restartGame() {
    clearInterval(timer);
    countdown = 10;
    showStory("start"); // Resets the game to the beginning
}

function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}



function showExplosionScene() {
    // Hide all existing game content
    document.getElementById("game-container").style.display = "none";
    document.getElementById("puzzle-container").style.display = "none";

    // Create an explosion video element
    const explosionVideo = document.createElement("video");
    explosionVideo.src = "images/explosion.mp4"; // Path to explosion video
    explosionVideo.autoplay = true;
    explosionVideo.muted = false;
    explosionVideo.controls = false;
    explosionVideo.id = "explosion-video";

    // Play explosion sound effect
    const explosionSound = new Audio("images/explosion.mp3");
    explosionVideo.onplay = () => {
        explosionSound.play().catch(error => console.log("Audio play failed:", error));
    };

    // Append video to the body
    document.body.appendChild(explosionVideo);

    // Ensure "GAME OVER" appears when the explosion ends
    explosionVideo.onended = function () {
        document.body.removeChild(explosionVideo);
        showGameOver(); // Show "GAME OVER" after video ends
    };

    
}
function showGameOver() {
    // Hide other containers
    document.getElementById("game-container").style.display = "none";
    document.getElementById("puzzle-container").style.display = "none";

    // Create a game over overlay container
    const gameOverScreen = document.createElement("div");
    gameOverScreen.id = "game-over-screen";

    gameOverScreen.innerHTML = `
        <div class="game-over-container">
            <h1 class="game-over">GAME OVER</h1>
            <p class="game-over-text">You are dead...</p>
            <div class="button-container">
                <button onclick="restart()">Retry</button>
                <button onclick="exitGame()">Exit</button>
            </div>
        </div>
    `;

    document.body.appendChild(gameOverScreen);
}


function restart() {
    // Remove the game over screen
    const gameOverScreen = document.getElementById("game-over-screen");
    if (gameOverScreen) {
        gameOverScreen.remove();
    }

    // Show the game container again
    document.getElementById("game-container").style.display = "block";

    // Restart the game from the beginning
    showStory("start");
}




document.addEventListener("DOMContentLoaded", function () {
    showHomeScreen(); // Show the home screen when the page loads
});

function showHomeScreen() {
    document.body.style.backgroundImage = "url('images/home.webp')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";

    document.getElementById("game-container").style.display = "none";

    const gameContainer = document.getElementById("home-container");
    gameContainer.innerHTML = `
        <div id="home-screen" class="fade-in">
            <h1>Reality Glitch: The Island of Illusions</h1>
            <p>
                The last thing you remember is falling asleep... Now, you wake up on an island where reality seems to flicker.  
                The sky shifts unnaturally. Shapes blur at the edges of your vision.  
                You are not alone. Something is watching. Something is... wrong.  
                <br><br>
                Every choice you make will reveal a hidden truth or trap you in the simulation forever.  
            </p>
            <button class="start-button" onclick="startGame()">Enter the Illusion</button>
        </div>
    `;
}


function startGame() {
    document.getElementById("home-container").style.display = "none";
    const gameContainer = document.getElementById("game-container");
    gameContainer.style.display = "block";
    gameContainer.innerHTML = `
        <div id="story-container">
           
            <p id="story-text"></p>
            <div id="choices"></div>
        </div>
    `;
    showStory("start"); 
}
function showEndingScreen(message) {
    const gameContainer = document.getElementById("game-container");
    if (gameContainer) gameContainer.style.display = "none"; 

    // Remove existing ending screen if it exists
    const existingEndingScreen = document.getElementById("ending-screen");
    if (existingEndingScreen) existingEndingScreen.remove();

    // Create a new ending screen
    const endingScreen = document.createElement("div");
    endingScreen.id = "ending-screen"; // Ensure it has the correct ID for styling

    endingScreen.innerHTML = `
        <h1>${message}</h1>
        <div>
            <button class="ending-buttons" onclick="restartGame()">Restart Game</button>
            <button class="ending-buttons" onclick="exitGame()">Exit</button>
        </div>
    `;

    document.body.appendChild(endingScreen);
}




function restartGame() {
    location.reload(); 
}

function exitGame() {
    window.close(); // Close the browser window (may not work on all browsers)
}

// Modify showStory function to handle endings
function showStory(storyKey) {
    const storyNode = story[storyKey];
    const storyTextDiv = document.getElementById("story-text");
    const choicesDiv = document.getElementById("choices");
    const storyImage = document.getElementById("story-image");

    // Clear existing content
    storyTextDiv.innerHTML = "";
    choicesDiv.innerHTML = "";
    storyImage.src = storyNode.image || "";

    // Stop previous sound
    stopAudio();

    // Play new sound if available
    if (storyNode.sound) {
        playLoopingSound(storyNode.sound);
    }

    // Check if the scene is an ending
    if (storyKey.endsWith("_ending")) {
        showEndingScreen(storyNode.text);
        return;
    }
    if (storyKey === "explosion" || storyKey === "green_button") {
        showExplosionScene();
        return;
    }
    
    if (storyKey === "boat") {
        showDrowningPuzzle();
        return;
    }
    

    // Show story text
    let i = 0;
    function typeWriter() {
        if (i < storyNode.text.length) {
            storyTextDiv.innerHTML += storyNode.text.charAt(i);
            i++;
            setTimeout(typeWriter, 70);
        } else {
            if (storyNode.task && storyNode.task.type === "puzzle") {
                showPuzzle(); // Show the puzzle if it's a puzzle task
            } else {
                showChoices(storyNode.choices);
            }
        }
    }
    typeWriter();
}

function showChoices(choices) {
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = ""; // Clear previous choices

    setTimeout(() => { 
        choices.forEach((choice, index) => {
            setTimeout(() => { // Stagger choice appearance
                const button = document.createElement("button");
                button.innerText = choice.text;
                button.classList.add("choice-button");
                button.style.opacity = "0"; // Start hidden
                choicesDiv.appendChild(button);

                // Smooth fade-in effect
                setTimeout(() => {
                    button.style.opacity = "1";
                    button.style.transition = "opacity 0.5s ease-in-out";
                }, 100);

                // Play sound on click and navigate
                button.onclick = () => {
                    playClickSound(); // Play sound effect
                    showStory(choice.nextScene); // Navigate to next scene
                };
            }, index * 300); // Staggered delay between choices
        });
    }, 900); // Delay before choices appear (adjust based on text speed)
}

// Function to play button click sound
function playClickSound() {
    const clickSound = new Audio("images/click.mp3"); // Replace with your sound file path
    clickSound.play();
}


