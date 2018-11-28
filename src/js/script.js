(function game() {
  const container = document.querySelector('.game');
  const shuffle = document.querySelector('.shuffle');
  const startArr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 'x']];
  const winСonditionArr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 'x']];

  const showFields = (arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < arr[i].length; j += 1) {
        const cell = document.createElement('div');
        container.appendChild(cell);
        arr[i][j] === 'x' ? cell.classList.add('game__empty') : console.log();
        cell.classList.add(`game__cell--${i}-${j}`, 'game__cell');
        cell.innerHTML = arr[i][j];
      }
      const br = document.createElement('br');
      container.appendChild(br);
    }
  };

  const removeOldCells = () => {
    container.innerHTML = '';
  };

  const sortCells = () => {
    startArr.sort(() => Math.random() - 0.5);
    for (let i = 0; i < startArr.length; i += 1) {
      let j; let temp;
      for (let k = startArr[i].length - 1; k > 0; k -= 1) {
        j = Math.floor(Math.random() * (k + 1));
        temp = startArr[i][j];
        startArr[i][j] = startArr[i][k];
        startArr[i][k] = temp;
      }
    }
    removeOldCells();
    showFields(startArr);
    container.removeEventListener('click', sortCells);
  };

  const checkWin = () => {
    function isEqualArray1(a1, a2) {
      return a1.length == a2.length && a1.every((v, i) => v == a2[i]);
    }
    function isEqualArray2(a1, a2) {
      return a1.length == a2.length && a1.every((v, i) => isEqualArray1(v, a2[i]));
    }
    if (isEqualArray2(startArr, winСonditionArr)) {
      alert('You WIN');
    }
  };

  const setChenges = (event) => {
    const emptyElem = [];
    for (let i = 0; i < startArr.length; i += 1) {
      for (let j = 0; j < startArr[i].length; j += 1) {
        if (startArr[i][j] === 'x') {
          emptyElem.push(i, j);
        }
      }
    }
    switch (event.keyCode) {
      case 38:
        if (emptyElem[0] >= 0) {
          startArr[emptyElem[0]][emptyElem[1]] = startArr[emptyElem[0] + 1][emptyElem[1]];
          startArr[emptyElem[0] + 1][emptyElem[1]] = 'x';
        }
        break;
      case 40:
        if (emptyElem[0] < startArr.length) {
          startArr[emptyElem[0]][emptyElem[1]] = startArr[emptyElem[0] - 1][emptyElem[1]];
          startArr[emptyElem[0] - 1][emptyElem[1]] = 'x';
        }
        break;
      case 37:
        if (emptyElem[1] < startArr.length - 1) {
          startArr[emptyElem[0]][emptyElem[1]] = startArr[emptyElem[0]][emptyElem[1] + 1];
          startArr[emptyElem[0]][emptyElem[1] + 1] = 'x';
        }
        break;
      case 39:
        if (emptyElem[1] > 0) {
          startArr[emptyElem[0]][emptyElem[1]] = startArr[emptyElem[0]][emptyElem[1] - 1];
          startArr[emptyElem[0]][emptyElem[1] - 1] = 'x';
        }
        break;
      default: break;
    }
    removeOldCells();
    showFields(startArr);
    checkWin();
  };

  const gameInit = () => {
    showFields(startArr);
    shuffle.addEventListener('click', sortCells);
    document.addEventListener('keyup', setChenges);
  };
  gameInit();
}());
