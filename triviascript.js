const playButton = document.querySelector("#play");
const newGameDisplay = document.querySelector("#newgame");
const replayButton = document.querySelector("#replay-button");

let playerDB;
let secretPlayer; 
let playerName;
let playerImage;
let playerClub;
let playerNation;
let playerPosition;
let playerValue;

let guess = 1;
let clubFound = 0;
let nationFound = 0;

playButton.addEventListener("click", () => {
    guess = 1;
    clubFound = 0;
    nationFound = 0;
    document.getElementById("newgame").style.display = "none";
    document.getElementById("gamehud").style.display = "block";
    document.getElementById("player-title").style.display = "none";
    document.getElementById("guesses").style.display = "block";
    document.getElementById('searchbar').style.display = "block";
    document.getElementById('userGuess').value = "";
    playerDB = fetch('./playerDatabase.json')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(playerDB) {
        secretPlayer = playerDB[Math.floor(Math.random() * playerDB.length)]
        playerName = secretPlayer.answer;
        playerImage = `./img-players/${secretPlayer.club}/${secretPlayer.img}`;
        playerClub = `./img-clubs/${secretPlayer.club}.png`;
        playerNation = `./img-countries/${secretPlayer.nation}.png`;
        playerPosition = secretPlayer.position;
        playerValue = secretPlayer.value;
        console.log(`This print statement is a way to cheat and find who the player is! The answer is: ${secretPlayer.answer}`);
    });
});

replayButton.addEventListener("click", () => {
    document.getElementById("newgame").style.display = "block";
    document.getElementById("gamehud").style.display = "none";
    document.getElementById('player-name').innerText = "";
    document.getElementById('player-image').src = "unknown.png";
    document.getElementById('club').src = "unknown.png"; 
    document.getElementById('nation').src = "unknown.png";
    document.getElementById('position').innerText = "";
});

const submitButton = document.getElementById("submission");

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    if ((document.getElementById("userGuess").value).toLowerCase() == secretPlayer.name.toLowerCase()) {
        document.getElementById('searchbar').style.display = "none";
        reveal();
    } else {
        /* TODO: Add in hint functionality */
        document.getElementById(`guess${guess}`).innerHTML = document.getElementById("userGuess").value;
        document.getElementById('userGuess').value = "";
        if (guess === 6) {
            document.getElementById("hint1").innerHTML = `Market Value: £${playerValue}m`;
        } else if (guess === 9) {
            document.getElementById("hint2").innerHTML = secretPlayer.club;
            document.getElementById('club').src = `./img-clubs/${secretPlayer.club}.png`;
        } else if (guess === 10) {
            reveal();
        }
    }
    guess++;
}); 

function reveal() {
    document.getElementById('player-name').innerText = playerName;
    document.getElementById('player-image').src = playerImage;
    document.getElementById('club').src = playerClub; 
    document.getElementById('nation').src = playerNation;
    document.getElementById('position').innerText = playerPosition;
    document.getElementById("guesses").style.display = "none";
    document.getElementById("player-title").style.display = "block";
}