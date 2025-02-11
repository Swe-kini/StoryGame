
const story = {
    start: {
        text: "You wake up on a mysterious island. The sky flickers unnaturally.",
        image: "/home/swethabenny/Downloads/island.jpeg",
        choices: [
            { text: "Explore the Beach", nextScene: "beach" },
            { text: "Enter the Jungle", nextScene: "jungle" },
            { text: "Climb the Cliff", nextScene: "cliff" }
        ]
    },
    beach: {
        text: "You find a blinking device in the sand.",
        image: "/home/swethabenny/Downloads/device.jpeg",
        choices: [
            { text: "Press the Button", nextScene: "glitch" },
            { text: "Ignore & Find a Drone", nextScene: "drone" }
        ]
    },
    jungle: {
        text: "You hear strange noises in the jungle.",
        image: "/home/swethabenny/Downloads/forest.jpeg",
        sound: "/home/swethabenny/Downloads/jungle.mp3",
        choices: [
            { text: "Follow the Noises", nextScene: "bunker" },
            { text: "Hunt the Glitching Animal", nextScene: "animal" }
        ]
    },
    cliff: {
        text: "You notice the sun resetting every few minutes.",
        image: "/home/swethabenny/Downloads/sun.jpeg",
        choices: [
            { text: "Head to the Tower", nextScene: "tower" },
            { text: "Observe Drone Scan", nextScene: "vision" }
        ]
    },
    glitch: {
        text: "Reality distorts. A voice echoes: 'You are not supposed to be here.'",
        sound: "/home/swethabenny/Downloads/glitch.mp3",
        choices: [
            { text: "Hack the System", nextScene: "control_ending" },
            { text: "Escape Through the Portal", nextScene: "escape_ending" },
            { text: "Reset Simulation", nextScene: "start" }
        ]
    },
    drone: {
        text: "The drone stores data and later activates, revealing logs.",
        choices: [
            { text: "Continue Exploring", nextScene: "glitch_event" }
        ]
    },
    bunker: {
        text: "You discover a hidden bunker entrance. A locked panel with a flickering screen stands in your way.",
        image: "/path-to-bunker-image.jpg",
        sound: "/path-to-bunker-sound.mp3",
        choices: [
            { text: "Attempt to Hack the Panel", nextScene: "bunker_task" },
            { text: "Turn Back", nextScene: "jungle" }
        ]
    },
    
    bunker_task: {
        text: "You must enter the correct sequence to bypass the security system. A timer starts counting down...",
        image: "/path-to-hacking-image.jpg",
        sound: "/timer-beeping.mp3",
        task: {
            type: "puzzle", // This can be a mini-game
            difficulty: "medium",
            successNextScene: "major_glitch_event",
            failNextScene: "bunker_explosion"
        }
    },
    
    bunker_explosion: {
        text: "You fail to hack the system in time. A siren blares, and suddenly, a loud explosion engulfs the bunker...",
        image: "/path-to-explosion-image.jpg",
        sound: "/explosion.mp3",
        choices: [
            { text: "Restart from Checkpoint", nextScene: "bunker" },
            { text: "Game Over", nextScene: "game_over" }
        ]
    },
    
    animal: {
        text: "The creature is a glitch. You obtain a data chip.",
        choices: [
            { text: "Decode Hidden Logs", nextScene: "glitch_event" }
        ]
    },
    tower: {
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
        image: "/home/swethabenny/Downloads/collapse.jpg",
        sound: "/home/swethabenny/Downloads/glitch.mp3",
        choices: [
            { text: "Hack the System", nextScene: "control_ending" },
            { text: "Escape Through a Portal", nextScene: "escape_ending" },
            { text: "Reset the Simulation", nextScene: "start" }
        ]
    },
    control_ending: { text: "You override the system and reshape reality. (Ending)" ,image: "/home/swethabenny/Downloads/sun.jpeg",},
    escape_ending: { text: "You enter a portal, waking up in a different world. (Ending)" },
    flashback_ending: { text: "You wake up in a lab, realizing you were a test subject. (Ending)" },
    mystery_ending: { text: "An unknown consequence unfolds... (Ending)" }
};

function startGame() {
    showStory("start");
}
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
        <p>Enter the code to continue:</p>
        <input type="text" id="codeInput" placeholder="Enter code here" />
        <button onclick="checkPuzzle()">Submit</button>
        <p id="puzzleMessage"></p>
    `;
    document.getElementById('story-text').appendChild(puzzleContainer);
}

function checkPuzzle() {
    const userInput = document.getElementById('codeInput').value.trim();
    const correctCode = "HACKTHECODE"; // The correct code for the puzzle
    
    if (userInput.toUpperCase() === correctCode) {
        document.getElementById('puzzleMessage').innerText = "Correct code! Access granted.";
        showStory("major_glitch_event"); // Move to the next scene on success
    } else {
        document.getElementById('puzzleMessage').innerText = "Incorrect code! Try again.";
    }
}

// Update `showStory` function to handle puzzle task
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

    // Show story text
    let i = 0;
    function typeWriter() {
        if (i < storyNode.text.length) {
            storyTextDiv.innerHTML += storyNode.text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
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
    choices.forEach(choice => {
        let button = document.createElement("button");
        button.innerText = choice.text;
        button.onclick = () => showStory(choice.nextScene);
        button.style.width = "200px";
        choicesDiv.appendChild(button);
    });
}

window.onload = startGame;