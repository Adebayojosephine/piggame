var scores, roundScore, activePlayer, gamePlaying;

//call the init function, i.e what happens at the initialization of the game, declared in line 77
init();
document.querySelector(".btn--roll").addEventListener("click", function () {
  //check if the game is playing, so that is the only time the button should roll
  if (gamePlaying) {
    //Generate random number between 1 and 6
    var dice = Math.floor(Math.random() * 6) + 1;

    //Display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    //Update the roundScore IF the rolled number was NOT a 1
    if (dice !== 1) {
      //Add score
      roundScore += dice;

      //display it
      document.getElementById("current--" + activePlayer).textContent =
        roundScore;
    } else {
      //Next player's turn
      nextPlayer(); //calling the next player in line 43 because of the DRY Principle
    }
  }
});
//implementing the hold button
document.querySelector(".btn--hold").addEventListener("click", function () {
  //if gamePlaying is true, then the following should be implemented
  if (gamePlaying) {
    //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the UI, i.e Display it
    document.querySelector("#score--" + activePlayer).textContent =
      scores[activePlayer];

    //Check if the player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name--" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player--" + activePlayer)
        .classList.add("player--winner");
      document
        .querySelector(".player--" + activePlayer)
        .classList.remove("player--active");

      //turn gamePlaying to false since we have gotten our winner
      gamePlaying = false;
    } else {
      //Next player
      nextPlayer(); //calling the next player in line 55 because of the DRY Principle
    }
  }
});

//declare function next player so we don't have to repeat our code in another part - DRY Principle
function nextPlayer() {
  //Next player's turn
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current--0").textContent = "0";
  document.getElementById("current--1").textContent = "0";
  document.querySelector(".player--0").classList.toggle("player--active");
  document.querySelector(".player--1").classList.toggle("player--active");
  document.querySelector(".dice").style.display = "none";
}

//implement the new game button, so if clicked, it starts a new game with all scores and activePlayer back to zero
document.querySelector(".btn--new").addEventListener("click", init);

//declare an initialization(init) function as we are going to be using it in more than one part of the code
function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  //removing the dice image so it is not visible from scratch
  document.querySelector(".dice").style.display = "none";

  //changing the content of the value from JS, i.e manipulating the DOM
  document.getElementById("score--0").textContent = "0";
  document.getElementById("score--1").textContent = "0";
  document.getElementById("current--0").textContent = "0";
  document.getElementById("current--1").textContent = "0";

  //rename the winner to player 1 or 2
  document.getElementById("name--0").textContent = "Player 1";
  document.getElementById("name--1").textContent = "Player 2";

  //remove the style for the winner and return active player back to one
  document.querySelector(".player--0").classList.remove("player--winner");
  document.querySelector(".player--1").classList.remove("player--winner");
  document.querySelector(".player--0").classList.remove("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  document.querySelector(".player--0").classList.add("player--active");
}
