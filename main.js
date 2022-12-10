/* ***************** Frogger GAME ***************** */

// || M O D E L:
//DOM connections:
const leftTime = document.querySelector("#leftSeconds");
const result = document.querySelector("#resultFrogger");
const startBtn = document.querySelector("#startPauseBtn");
const refreshBtn = document.querySelector("#refreshBtn");
const squares = document
  .querySelector(".froggerGridDiv")
  .querySelectorAll("div");
const logLeft = document.querySelectorAll(".log_left");
const logRight = document.querySelectorAll(".log_right");
const carLeft = document.querySelectorAll(".car_left");
const carRight = document.querySelectorAll(".car_right");
const secInput = document.getElementById("secondsInput");
const setSecBtn = document.getElementById("setTimeBtn");

let currentIndex = 76;
const rowWidth = 9;
let movingDivs;
let gameStarted = false;
let gameOver = false;
let timer = 0;

function moveFrog(e) {
  removingFrog();

  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex % rowWidth !== 0) {
        currentIndex -= 1;
      }
      break;
    case "ArrowRight":
      if (currentIndex % rowWidth < rowWidth - 1) {
        currentIndex += 1;
      }
      break;
    case "ArrowUp":
      if (currentIndex - rowWidth >= 0) {
        currentIndex -= rowWidth;
      }
      break;
    case "ArrowDown":
      if (currentIndex + rowWidth < rowWidth * rowWidth) {
        currentIndex += rowWidth;
      }
      break;
  }

  addingFrog();
}

function removingFrog() {
  if (
    squares[currentIndex].classList.contains("c2") ||
    squares[currentIndex].classList.contains("c3")
  ) {
    squares[currentIndex].classList.remove("frogOnRoad");
  } else if (
    squares[currentIndex].classList.contains("l1") ||
    squares[currentIndex].classList.contains("l2") ||
    squares[currentIndex].classList.contains("l3")
  ) {
    squares[currentIndex].classList.remove("frogOnTruck");
  } else if (squares[currentIndex].classList.contains("ground")) {
    squares[currentIndex].classList.remove("frog");
  }
}

function addingFrog() {
  if (
    squares[currentIndex].classList.contains("c2") ||
    squares[currentIndex].classList.contains("c3")
  ) {
    squares[currentIndex].classList.add("frogOnRoad");
  } else if (
    squares[currentIndex].classList.contains("l1") ||
    squares[currentIndex].classList.contains("l2") ||
    squares[currentIndex].classList.contains("l3")
  ) {
    squares[currentIndex].classList.add("frogOnTruck");
  } else if (squares[currentIndex].classList.contains("ground")) {
    squares[currentIndex].classList.add("frog");
  }
}

function autoMoveDivs() {
  timer--;
  leftTime.textContent = timer;
  logLeft.forEach((each) => {
    moveLogsLeft(each);
  });
  logRight.forEach((each) => {
    moveLogsRight(each);
  });
  carLeft.forEach((each) => {
    moveCarsLeft(each);
  });
  carRight.forEach((each) => {
    moveCarsRight(each);
  });
}

function lose() {
  if (
    squares[currentIndex].classList.contains("cr1") ||
    squares[currentIndex].classList.contains("cl1")
  ) {
    showLossOrWin("You Lost. A Car hit you!", "red");
    squares[currentIndex].classList.remove("frogOnRoad");
    clearInterval(movingDivs);
    document.removeEventListener("keydown", moveFrog);
    startBtn.textContent = "Start";
    gameStarted = false;
    gameOver = true;
    timer = 0;
  } else if (
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5")
  ) {
    showLossOrWin("You Lost. You fell into River!", "red");
    squares[currentIndex].classList.remove("frogOnTruck");
    clearInterval(movingDivs);
    document.removeEventListener("keydown", moveFrog);
    startBtn.textContent = "Start";
    gameStarted = false;
    gameOver = true;
    timer = 0;
  } else if (timer === 0) {
    showLossOrWin("You Lost. You ran out-of TIME", "red");
    if (squares[currentIndex].classList.contains("frogOnRoad")) {
      squares[currentIndex].classList.remove("frogOnRoad");
    } else if (squares[currentIndex].classList.contains("frogOnTruck")) {
      squares[currentIndex].classList.remove("frogOnTruck");
    } else {
      squares[currentIndex].classList.remove("frog");
    }
    clearInterval(movingDivs);
    document.removeEventListener("keydown", moveFrog);
    startBtn.textContent = "Start";
    gameStarted = false;
    gameOver = true;
  }
}

function win() {
  if (squares[currentIndex].classList.contains("ending_block")) {
    squares[currentIndex].classList.add("frogOnFinish");
    showLossOrWin("Wohoo, You got to Finish!", "green");
    clearInterval(movingDivs);
    document.removeEventListener("keydown", moveFrog);
    startBtn.textContent = "Start";
    gameStarted = false;
    gameOver = true;
    timer = 0;
  }
}

function loseAndWinCheck() {
  lose();
  win();
}

// || V I E W:
function moveLogsLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
  }
}

function moveLogsRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
  }
}

function moveCarsLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c2");
      break;
    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("cl1");
      break;
    case carLeft.classList.contains("cl1"):
      carLeft.classList.remove("cl1");
      carLeft.classList.add("c3");
      break;
  }
}

function moveCarsRight(carRight) {
  switch (true) {
    case carRight.classList.contains("cr1"):
      carRight.classList.remove("cr1");
      carRight.classList.add("c2");
      break;
    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c3");
      break;
    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("cr1");
      break;
  }
}

function showLossOrWin(text, color) {
  result.textContent = text;
  result.style.color = color;
}

// || C O N T R O L L E R:
startBtn.addEventListener("click", () => {
  if (gameStarted === false && gameOver === false && timer !== 0) {
    gameStarted = true;
    document.addEventListener("keydown", moveFrog);
    movingDivs = setInterval(autoMoveDivs, 1000);
    checkForLoseAndWins = setInterval(loseAndWinCheck, 50);
    startBtn.textContent = "Pause";
  } else if (gameOver === true && timer === 0 && gameStarted === false) {
    alert("Please, hit the REFRESH button to start over again!");
  } else if (timer === 0) {
    alert("Please, set Some Time to start playing!");
  } else {
    document.removeEventListener("keydown", moveFrog);
    clearInterval(movingDivs);
    startBtn.textContent = "Start";
    gameStarted = false;
  }
});

refreshBtn.addEventListener("click", () => {
  location.reload();
});

setSecBtn.addEventListener("click", () => {
  let value = Number(secInput.value);
  timer = value;
  leftTime.textContent = value;
  secInput.value = "";
});

/*******************************************************************/
