const playButton = document.querySelector("#play");
const newGameDisplay = document.querySelector("#newgame");
const replayButton = document.querySelector("#replay-button");
const revealButton = document.querySelector("#reveal-button")

let playerDB;
let secretPlayer; 
let playerName;
let playerImage;
let playerClub;
let playerNation;
let playerPosition;
let playerValue;

playButton.addEventListener("click", () => {
    document.getElementById("newgame").style.display = "none";
    document.getElementById("gamehud").style.display = "block";
    document.getElementById("player-title").style.display = "none";
    revealButton.style.display = "block";
    document.getElementById("guesses").style.display = "block";
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

revealButton.addEventListener("click", () => {
    document.getElementById('player-name').innerText = playerName;
    document.getElementById('player-image').src = playerImage;
    document.getElementById('club').src = playerClub; 
    document.getElementById('nation').src = playerNation;
    document.getElementById('position').innerText = playerPosition;
    document.getElementById("player-title").style.display = "block";
    revealButton.style.display = "none";
    document.getElementById("guesses").style.display = "none";
})
