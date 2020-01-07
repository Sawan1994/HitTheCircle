/** This file is implements solution without using ES6 classes */
var count = 0;

/**
 * returns random number between min (inclusive) and max (not included)
 * @param {number} min
 * @param {number} max
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * creates a grid of 6*6 circles
 */
function drawCircles() {
  var container = document.getElementById("circle-container");

  for (let i = 1; i <= 6; i++) {
    var row = document.createElement("div");
    row.classList.add("row");
    for (let j = 1; j <= 6; j++) {
      ++count;
      var circle = document.createElement("div");
      circle.classList.add("circle");
      circle.classList.add(`circle-index-${count}`);
      circle.dataset.indexNumber = count;
      circle.addEventListener("click", event =>
        hitTheCircle(event.target.dataset.indexNumber)
      );
      row.appendChild(circle);
    }

    container.appendChild(row);
  }
}

drawCircles();

var isGameStarted = false;
var selectedCircleIndex = -1;
var selectedElement = null;
var score = 0;

var scoreField = document.getElementById("score");

function play() {
  isGameStarted = true;

  if (selectedElement !== null) {
    return alert("Stop the game first");
  }

  highlightCircle();
}

function deEmphasizeCircle() {
  if (selectedElement !== null) selectedElement.classList.remove("highlight");

  selectedElement = null;
  selectedCircleIndex = -1;
}

function highlightCircle() {
  deEmphasizeCircle();

  selectedCircleIndex = getRandomInt(1, 37);

  selectedElement = document.getElementsByClassName(
    `circle-index-${selectedCircleIndex}`
  )[0];

  selectedElement.classList.add("highlight");
}

function stop() {
  if (!isGameStarted) {
    alert("You haven't started the game yet...");
    return;
  }
  deEmphasizeCircle();

  alert(`Your final score is : ${score}`);

  reset();
}

function hitTheCircle(index) {
  if (!isGameStarted) {
    alert("Start the game to play...");
    return;
  }
  if (selectedCircleIndex === parseInt(index)) {
    score++;
    highlightCircle();
  } else {
    score--;
  }

  scoreField.value = score;
}

function reset() {
  isGameStarted = false;
  score = 0;
  scoreField.value = score;
}
