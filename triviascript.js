const playButton = document.querySelector("#play");
const newGameDisplay = document.querySelector("#newgame");
const replayButton = document.querySelector("#play-2");

playButton.addEventListener("click", () => {
    document.getElementById("newgame").style.display = "none";
    document.getElementById("reveal-player").style.display = "block";
    const playerDB = fetch('./playerDatabase.json')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(playerDB) {
        secretPlayer = playerDB[Math.floor(Math.random() * playerDB.length)]
        document.getElementById('player-name').innerText = secretPlayer.answer;
        document.getElementById('player-image').src = `./img-players/${secretPlayer.club}/${secretPlayer.img}`;
        document.getElementById('club').src = `img-clubs/${secretPlayer.club}.png` 
        document.getElementById('nation').src = `img-countries/${secretPlayer.nation}.png`
        document.getElementById('position').innerText = secretPlayer.position;
    });
});

replayButton.addEventListener("click", () => {
    /* Change to reveal play game screen instead of new game screen*/
    document.getElementById("newgame").style.display = "block";
    document.getElementById("reveal-player").style.display = "none";
    const playerDB = fetch('./playerDatabase.json')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(playerDB) {
        secretPlayer = playerDB[Math.floor(Math.random() * playerDB.length)]
        document.getElementById('player-name').innerText = secretPlayer.answer;
        document.getElementById('player-image').src = `./img-players/${secretPlayer.club}/${secretPlayer.img}`;
        document.getElementById('club').src = `img-clubs/${secretPlayer.club}.png` 
        document.getElementById('nation').src = `img-countries/${secretPlayer.nation}.png`
        document.getElementById('position').innerText = secretPlayer.position;
    });
});

let secretPlayer; 
