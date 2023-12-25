const game = document.querySelector(".game");
const title = document.querySelector("h1");
const startBtn = document.querySelector(".start-btn");
const output = document.querySelector(".output");
const level = document.getElementById("level");
const dif = [100, 81, 49];
const numBombs = 16;
let arrayBombs = [];
let c = 0;

startBtn.addEventListener("click", function () {
  reset();
  arrayBombs = generateBombs();
  for (let i = 1; i <= dif[level.value]; i++) {
    createBox(i);
  }
});

function createBox(i) {
  const box = document.createElement("div");
  box.classList.add("box");
  box.classList.add("calc" + dif[level.value]);
  box.innerText = i;
  box.idBox = i;
  box.addEventListener("click", touchBox,{once:true});
  game.append(box);
}

function generateBombs() {
  const uniqueBombs = [];
  let bomb;
  while (uniqueBombs.length < numBombs) {
    bomb = getRandomNumber(1, dif[level.value]);
    if (!uniqueBombs.includes(bomb)) {
      uniqueBombs.push(bomb);
    }
  }
  return uniqueBombs;
}

function touchBox() {
  const boxes = document.querySelectorAll(".box");
  if (!arrayBombs.includes(this.idBox)) {
    this.classList.add("notBomb");
    c++;
    let total = boxes.length - numBombs;
    if (c === total) {
      endGame(true);
    }
  } else {
    this.classList.add("bomb");
    endGame(false);
  }
}

function endGame(isWin) {
  const boxes = document.querySelectorAll(".box");
  const total = boxes.length - numBombs;
  if (isWin) {
    output.classList.add("win");
    output.innerHTML = `Hai vinto hai cliccato tutto giusto `;
    showBombs();
  } else {
    output.classList.add("lose");
    output.innerHTML = `Hai perso e hai  fatto ${
      c == 1 ? " 1 punto" : c + " punti"
    }  su ${total} `;
    showBombs();
  }
}

function showBombs() {
  const boxes = document.querySelectorAll(".box");
  for (let i = 0; i < boxes.length; i++) {
    if (arrayBombs.includes(boxes[i].idBox)) {
      boxes[i].classList.add("bomb");
    }
    boxes[i].removeEventListener('click',touchBox);
  }
}

function reset() {
  game.innerHTML = "";
  output.innerHTML = "";
  title.innerHTML = "";
  c = 0;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}