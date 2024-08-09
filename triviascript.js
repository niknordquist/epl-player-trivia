const playButton = document.querySelector("#play");
const newGameDisplay = document.querySelector("#newgame");
const replayButton = document.querySelector("#replay-button");
const submitButton = document.getElementById("submission");

let secretPlayer;
let playerName;
let playerImage;
let playerClub;
let playerNation;
let playerPosition;
let playerValue;

let guess = 1;
let clubFound = false;
let nationFound = false;
let positionFound = false;


playButton.addEventListener("click", () => {

    secretPlayer = playerDB[Math.floor(Math.random() * playerDB.length)]
    autocomplete(document.getElementById("userGuess"), playerDB);
    playerName = secretPlayer.answer;
    playerImage = `./img-players/${secretPlayer.club}/${secretPlayer.img}`;
    playerClub = `./img-clubs/${secretPlayer.club}.png`;
    playerNation = `./img-countries/${secretPlayer.nation}.png`;
    playerPosition = secretPlayer.position;
    playerValue = secretPlayer.value;

    guess = 1;
    clubFound = false;
    nationFound = false;
    positionFound = false;

    document.getElementById("newgame").style.display = "none";
    document.getElementById("gamehud").style.display = "block";
    document.getElementById("player-title").style.display = "none";
    document.getElementById("guesses").style.display = "block";

    for (let i = guess; i < 11; i++) {
        document.getElementById(`guess${i}`).innerHTML = `Guess #${i}: `
    }

    document.getElementById('searchbar').style.display = "block";
    document.getElementById('userGuess').value = "";
    document.getElementById('userGuessLabel').innerHTML = `Guess #${guess}:`;
    submitButton.style.display = "none";
    document.getElementById("congrats").style.display = "none";


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

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    submitButton.style.display = "none";
    const guessedPlayer = document.getElementById("userGuess").value
    if (guessedPlayer.toLowerCase() == secretPlayer.answer.toLowerCase()) {
        document.getElementById('searchbar').style.display = "none";
        document.getElementById("congrats").style.display = "block";
        reveal();
    } else {
        if (guess === 10) {
            reveal();
        }
        /* TODO: Add in hint functionality */
        const guessedPlayerObj = playerDB.find(x => x.answer === guessedPlayer);
        const guessedClub = guessedPlayerObj.club;
        const guessedNation = guessedPlayerObj.nation;
        const guessedPosition = guessedPlayerObj.position;
        if (guessedClub === secretPlayer.club && !clubFound) {
            clubFound = true;
            alert('Club unlocked!');
            document.getElementById('club').src = playerClub;
        }
        if (guessedNation === secretPlayer.nation && !nationFound) {
            nationFound = true;
            alert('Nation unlocked!');
            document.getElementById('nation').src = playerNation;
        }
        if (guessedPosition === secretPlayer.position && !positionFound) {
            positionFound = true;
            alert('Position unlocked!');
            document.getElementById('position').innerHTML = playerPosition;
        }
        document.getElementById(`guess${guess}`).innerHTML = `Guess #${guess}: ${guessedPlayer}`;
        document.getElementById('userGuess').value = "";
        if (guess === 6) {
            document.getElementById("hint1").innerHTML = `Market Value: £${playerValue}m`;
        } else if (guess === 9) {
            document.getElementById("hint2").innerHTML = secretPlayer.club;
            document.getElementById('club').src = `./img-clubs/${secretPlayer.club}.png`;
        }
    }
    guess++;
    document.getElementById('userGuessLabel').innerHTML = `Guess #${guess}:`;
});

function reveal() {
    document.getElementById("searchbar").style.display = "none";
    document.getElementById("submission").style.display = "none";
    document.getElementById('player-name').innerText = playerName;
    document.getElementById('player-image').src = playerImage;
    document.getElementById('club').src = playerClub;
    document.getElementById('nation').src = playerNation;
    document.getElementById('position').innerText = playerPosition;
    document.getElementById("guesses").style.display = "none";
    document.getElementById("player-title").style.display = "block";
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        submitButton.style.display = 'none';
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val || val.length < 3) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].answer.toUpperCase().includes(val.toUpperCase())) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = arr[i].answer;
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i].answer + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    const finalGuess = this.getElementsByTagName("input")[0].value;
                    inp.value = finalGuess;
                    submitButton.style.display = "block";
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
