let arr = [9, 9, 9, 9, 9, 9, 9, 9, 9];

let isCross = true;
let gameWin = false;
let step = 0;
let cells = document.querySelectorAll(".cell");
let promt = document.querySelector("#promt");

cells.forEach((el) => {
  el.addEventListener("click", () => {
    if (step < 9) {
      if (isCross && !cellIsBusy(el) && !gameWin) {
        el.children[0].hidden = false;
        isCross = false;
        promt.textContent = "нолики ходят";
        step++;
      } else if (!cellIsBusy(el) && !gameWin) {
        el.children[1].hidden = false;
        isCross = true;
        promt.textContent = "крестики ходят";
        step++;
      }

      writeData(el.id, !isCross);

      if (isCross && isWin()) {
        promt.textContent = "победа ноликов!";
      } else if (!isCross && isWin()) {
        promt.textContent = "победа крестиков!";
      } else if (step == 9 && !gameWin) {
        promt.textContent = "ничья!";
      }
    }
  });
});

function isWin() {
  let combs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let comb of combs) {
    if (
      arr[comb[0]] == arr[comb[1]] &&
      arr[comb[1]] == arr[comb[2]] &&
      arr[comb[0]] != 9
    ) {
      gameWin = true;
      return true;
    }
  }
  gameWin = false;
  return false;
}

function writeData(id, isCross) {
  sym = 1;
  if (!isCross) sym = 0;
  arr[id - 1] = sym;
}

function cellIsBusy(cell) {
  if (!cell.children[0].hidden || !cell.children[1].hidden) {
    return true;
  }
  return false;
}
