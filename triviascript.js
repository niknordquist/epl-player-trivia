const playButton = document.querySelector("#play");
const newGameDisplay = document.querySelector("#newgame");

playButton.addEventListener("click", () => {
    document.getElementById("newgame").style.display = "none";
    document.getElementById("reveal-player").style.display = "block";
});

let secretPlayer;
const playerDB = fetch('./playerDatabase.json')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(playerDB) {
        secretPlayer = playerDB[Math.floor(Math.random() * playerDB.length)]
        document.getElementById('player-name').innerText = secretPlayer.answer;
        document.getElementById('player-image').src = secretPlayer.img; 
    });
