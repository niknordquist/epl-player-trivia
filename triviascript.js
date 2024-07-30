const playButton = document.querySelector("#play");
const newGameDisplay = document.querySelector("#newgame");

playButton.addEventListener("click", () => {
    document.getElementById("newgame").style.display = "none";
    document.getElementById("reveal-player").style.display = "block";
});


