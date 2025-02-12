
const story = {
    start: {
        text: "You wake up on a mysterious island. The sky flickers unnaturally.",
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
        image: "images/device.jpeg",
        choices: [
            { text: "Press the Button", nextScene: "beach_button_pressed" },
            { text: "Ignore it", nextScene: "move" }
        ]
    },
    move: {
        text: "You move forward and see the  drone moving away.",
        choices: [
            { text: "Chase the drone", nextScene: "drone" },
            { text: "Destroy it", nextScene: "explosion" },
        ]
    },
    explosion: {
        text: "Oops, wrong decision",
    
    },

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
            { text: "Try to Shut it Down", nextScene: "glitch_event" },
            { text: "Let it Happen", nextScene: "control_ending" }
        ]
    },
    
    blue_button: {
        text: "The device projects a holographic map of the island.",
        image: "images/hologram.jpeg",
        choices: [
            { text: "Analyze the Map", nextScene: "tower" },
            { text: "Ignore the Map", nextScene: "jungle" }
        ]
    },

    green_button: {
        text: "The device starts scanning your body.",
        image: "images/scan.jpeg",
        choices: [
            { text: "Submit to the Scan", nextScene: "vision" },
            { text: "Destroy the Device", nextScene: "mystery_ending" }
        ]
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
            { text: "Observe Drone Scan", nextScene: "vision" }
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
        text: "You move forward and see the  drone moving away.The drone stores data and later activates, revealing logs.",
        choices: [
            { text: "Continue Exploring", nextScene: "glitch_event" }
        ]
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
            difficulty: "medium",
            successNextScene: "major_glitch_event",
            failNextScene: "bunker_explosion"
        }
    },
    
    bunker_explosion: {
        text: "You fail to hack the system in time. A siren blares, and suddenly, a loud explosion engulfs the bunker...",
        
        sound: "images/explosion.mp3",
        
    },
    
    animal: {
        text: "The creature is a glitch. You obtain a data chip.",
        choices: [
            { text: "Decode Hidden Logs", nextScene: "glitch_event" }
        ]
    },
    tower: {
        text: "You move towards the tower and sees a drone",
        choices: [
            { text: "Go inside", nextScene: "inside" },
            { text: "chase the drone", nextScene: "drone" }
        ]
    },
    inside: {
        text: "You find a malfunctioning control panel.",
        choices: [
            { text: "Manually Fix the System", nextScene: "control_ending" },
            { text: "Force Shutdown", nextScene: "mystery_ending" }
        ]
    },
    vision: {
        text: "You recall a memory of escaping a lab.",
        choices: [
            { text: "Continue", nextScene: "flashback_ending" }
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
    control_ending: { text: "You override the system and reshape reality. " ,image: "images/sun.jpeg",},
    escape_ending: { text: "You enter a portal, waking up in a different world. " },
    flashback_ending: { text: "You wake up in a lab, realizing you were a test subject. " },
    mystery_ending: { text: "An unknown consequence unfolds... " }
};


const words = ["HACK", "SYSTEM", "CODE", "BREAK", "ESCAPE", "PORTAL"];
let currentWord = "";
let attemptsLeft = 2;
let scrambledWord = "";
let currentAudio = null;


function playLoopingSound(url) {
    // Stop any previously playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Play the new sound
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
    const puzzleContainer = document.createElement('div');
    puzzleContainer.innerHTML = `
        <h2>Code Breaker Puzzle</h2>
        <p id="scrambledWord"></p> 
         <p>Enter the code to continue:</p>
        <input type="text" id="codeInput" placeholder="Enter code here" />
        <button onclick="checkPuzzle()">Submit</button>
        <p id="alertMessage"></p>  
    `;
    document.getElementById('story-text').appendChild(puzzleContainer);
    
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
    const words = ["HACK", "SYSTEM", "CODE", "BREAK", "ESCAPE", "PORTAL"];
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    scrambledWord = scrambleWord(currentWord);
    
    document.getElementById("scrambledWord").innerText = `Scrambled word: ${scrambledWord}`;
    document.getElementById("alertMessage").innerText = "";  // Reset message
    document.getElementById("alertMessage").style.color = ""; // Reset color
    attemptsLeft = 2;
}

function checkPuzzle() {
    const userInput = document.getElementById('codeInput').value.trim().toUpperCase();
    const alertMessage = document.getElementById('alertMessage');

    if (userInput === currentWord) {
        alertMessage.innerText = "Correct code! Access granted.";
        alertMessage.style.color = "green"; // Success message in green
        showStory("major_glitch_event");
    } else {
        attemptsLeft--;
        alertMessage.style.color = "red"; // Make alert text red
        if (attemptsLeft > 0) {
            alertMessage.innerText = `Incorrect code! You have ${attemptsLeft} attempt(s) left.`;
        } else {
            showExplosionScene();
        }
    }
}

function showExplosionScene() {
    // Clear existing content
    const storyContainer = document.getElementById("story-text");
    storyContainer.innerHTML = "";

    // Create a video element
    const explosionVideo = document.createElement("video");
    explosionVideo.src = "images/explosion.mp4"; // Set explosion video path
    explosionVideo.autoplay = true;
    explosionVideo.muted = false;
    explosionVideo.controls = false;
    explosionVideo.id = "explosion-video"; 

    const explosionSound = new Audio("images/explosion.mp3");
    explosionVideo.onplay = () => {
        explosionSound.play().catch(error => console.log("Audio play failed:", error)); // Handle autoplay restrictions
    };

    // Append video to the body
    document.body.appendChild(explosionVideo);
    setTimeout(() => {
        showGameOver(); // Pop up effect triggered before video ends
    }, explosionVideo.duration * 500); // Show "GAME OVER" 80% into the explosion

    // When video ends, remove it
    explosionVideo.onended = function () {
        document.body.removeChild(explosionVideo);
    };
}

function showGameOver() {
    const storyContainer = document.getElementById("story-text");
    storyContainer.innerHTML = `
        <h1 class="game-over">GAME OVER</h1>
        <p class="game-over-text">You are dead...</p>
        <div class="button-container">
            <button onclick="restart()">Retry</button>
            <button onclick="exitGame()">Exit</button>
        </div>
    `;
}


function restart() {
    showStory("bunker"); // Restart from the bunker checkpoint
}




document.addEventListener("DOMContentLoaded", function () {
    showHomeScreen(); // Show the home screen when the page loads
});

function showHomeScreen() {
    document.body.style.backgroundImage = "url('images/home.jpeg')";
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
                Every choice you make will reveal a hidden truth—or trap you in the simulation forever.  
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

function showEndingScreen(message, image) {
    const gameContainer = document.getElementById("game-container");
    
    gameContainer.innerHTML = `
        <div id="ending-screen">
            <h1>${message}</h1>
            
            <button class="ending-button" onclick="restartGame()">Restart Game</button>
            <button class="ending-button" onclick="exitGame()">Exit</button>
        </div>
    `;
    
}

function restartGame() {
    showHomeScreen(); // Restart the game from the home screen
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
        showEndingScreen(storyNode.text, storyNode.image);
        return;
    }
    if (storyKey === "explosion") {
        showExplosionScene();
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
                button.onclick = () => showStory(choice.nextScene);
                button.style.opacity = "0"; // Start hidden
                choicesDiv.appendChild(button);

                // Smooth fade-in effect
                setTimeout(() => {
                    button.style.opacity = "1";
                    button.style.transition = "opacity 0.5s ease-in-out";
                }, 100);
            }, index * 300); // Staggered delay between choices
        });
    }, 900); // Delay before choices appear (adjust based on text speed)
}

