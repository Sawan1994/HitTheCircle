class Game {
  constructor() {
    this.count = 0;
    this.isGameStarted = false;
    this.selectedCircleIndex = -1;
    this.selectedElement = null;
    this.score = 0;
    this.scoreField = document.getElementById("score");
  }

  /**
   * returns random number between min (inclusive) and max (not included)
   * @param {number} min
   * @param {number} max
   */
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  /**
   * creates a grid of 6*6 circles
   */
  drawCircles() {
    var container = document.getElementById("circle-container");

    for (let i = 1; i <= 6; i++) {
      var row = document.createElement("div");
      row.classList.add("row");
      for (let j = 1; j <= 6; j++) {
        ++this.count;
        var circle = document.createElement("div");
        circle.classList.add("circle");
        circle.classList.add(`circle-index-${this.count}`);
        circle.dataset.indexNumber = this.count;
        circle.addEventListener("click", event =>
          this.hitTheCircle(event.target.dataset.indexNumber)
        );
        row.appendChild(circle);
      }

      container.appendChild(row);
    }
  }

  play() {
    this.isGameStarted = true;

    if (this.selectedElement !== null) {
      return alert("Stop the game first");
    }

    this.highlightCircle();
  }

  deEmphasizeCircle() {
    if (this.selectedElement !== null)
      this.selectedElement.classList.remove("highlight");

    this.selectedElement = null;
    this.selectedCircleIndex = -1;
  }

  highlightCircle() {
    this.deEmphasizeCircle();

    this.selectedCircleIndex = this.getRandomInt(1, 37);

    this.selectedElement = document.getElementsByClassName(
      `circle-index-${this.selectedCircleIndex}`
    )[0];

    this.selectedElement.classList.add("highlight");
  }

  stop() {
    if (!this.isGameStarted) {
      alert("You haven't started the game yet...");
      return;
    }
    this.deEmphasizeCircle();

    alert(`Your final score is ${this.score}`);

    this.reset();
  }

  showWarning(index) {
    const element = document.getElementsByClassName(`circle-index-${index}`)[0];

    element.classList.add("warning");

    setTimeout(() => element.classList.remove("warning"), 300);
  }

  hitTheCircle(index) {
    if (!this.isGameStarted) {
      alert("Start the game to play...");
      return;
    }
    if (this.selectedCircleIndex === parseInt(index)) {
      this.score++;
      this.highlightCircle();
    } else {
      this.score--;
      this.showWarning(index);
    }

    this.scoreField.value = this.score;
  }

  reset() {
    this.isGameStarted = false;
    this.score = 0;
    this.scoreField.value = this.score;
  }
}
