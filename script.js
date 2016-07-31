var board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

var xWinCount = 0
var oWinCount = 0

var oSvg = '<svg xmlns="http://www.w3.org/2000/svg">' +
               '<circle cx="75" cy="75" r="40" fill="transparent" stroke="white" stroke-width="20"/>' +
           '</svg>';

var xSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150">' +
                '<path stroke="white" stroke-width="20"  d="M35,35 L115,115 M115,35 L35,115"/>' +
            '</svg>';

var turnCounter = 0;
var gameOver = false;


function cellClicked(div, rowIndex, colIndex) {
    console.log('Button clicked: ', div, ', rowIndex: ', rowIndex, ', colIndex: ', colIndex);


    if (gameOver === false &&
        board[rowIndex][colIndex] ===null &&
        turnCounter % 2 === 0) {
        //Adds to the turnCounter variable
        turnCounter += 1;

        var player = null;
        if (turnCounter % 2 === 1) {
            player = 'x';
            div.innerHTML = xSvg;
        } else {
            player = 'o';
            div.innerHTML = oSvg;
        }

        //sets the spot in the board that matches the spot the div is to x or o
        board[rowIndex][colIndex] = player;
        console.log('spot in the board at the given coordinate after update has:',  board[rowIndex][colIndex]  )

        checkGameOver();

        if (gameOver == false) {
            setTimeout(aiPlay, 1000);
        }
    }
}

function checkGameOver() {
    var winner = whoWon(board);
    console.log('who won? ', winner);

    if (winner === 'x' || winner === 'o') {
        gameOver = true;

        showMessage('Congrats, player ' + winner + ' won!', true);

        if (winner === 'x') {
            xWinCount += 1;
        } else {
            oWinCount += 1;
        }

        document.getElementsByClassName('x-score')[0].innerHTML = 'X wins: ' + xWinCount;
        document.getElementsByClassName('o-score')[0].innerHTML = 'O wins: ' + oWinCount;
    }

    if (turnCounter === 9) {
        gameOver = true;
        showMessage('Draw', true);
    }
}

function showMessage(msg, showPlayAgain) {
    document.getElementsByClassName('messages')[0].innerHTML = msg;
    if (showPlayAgain === true) {
        document.getElementsByClassName('play-again')[0].innerHTML = 'click here to play again';
    } else {
        document.getElementsByClassName('play-again')[0].innerHTML = '';
    }
}

function playAgain() {
    console.log('----[ playAgain')
    if (gameOver === true) {
        board = [
          [null, null, null],
          [null, null, null],
          [null, null, null]
        ];

        gameOver = false;
        turnCounter = 0;

        showMessage('', false);

        var cells = document.getElementsByClassName('cell');
        for (var i = 0; i < cells.length; i++) {
            cells[i].innerHTML = '';
        }
    }
}

function printBoard(myBoard) {
    for (var i=0; i<3; i++) {
        console.log(myBoard[i][0], myBoard[i][1], myBoard[i][2]);
    }
}

function whoWon(myBoard) {
  // TODO: add checks to see if anyone won.
  // this functions should return x, o, or null.
  var winner = whoWonRow(myBoard)

  if (winner === 'x' || winner === 'o') {
    return winner;
  }

  // add other checks here
  winner = whoWonColumn(myBoard)

  if (winner === 'x' || winner === 'o') {
    return winner;
  }

  var winner = whoWonDiagonal(myBoard)

  if (winner === 'x' || winner === 'o') {
    return winner;
  }

  return null;
}

function whoWonRow(myBoard) {
    var whoWon = null;
    for (var rowIndex=0; rowIndex<3; rowIndex++) {
        if (myBoard[rowIndex][0] === myBoard[rowIndex][1] && myBoard[rowIndex][1] === myBoard[rowIndex][2] && myBoard[rowIndex][0] !== null) {
           whoWon = myBoard[rowIndex][0];
           break;
        }
    }

    return whoWon;
}

function whoWonColumn(myBoard) {
    var whoWon = null;
    for (var columnIndex=0; columnIndex<3; columnIndex++) {
        if (myBoard[0][columnIndex] === myBoard[1][columnIndex] && myBoard[1][columnIndex] === myBoard[2][columnIndex] && myBoard[0][columnIndex] !== null) {
           whoWon = myBoard[0][columnIndex];
           break;
        }
    }

    return whoWon;
}

function whoWonDiagonal(myBoard) {
    var whoWon = null;

    if (myBoard[0][0] === myBoard[1][1] && myBoard[1][1] === myBoard[2][2]) {
        whoWon = myBoard[0][0];
    }else if (myBoard[0][2] === myBoard[1][1] && myBoard[1][1] === myBoard[2][0]) {
        whoWon = myBoard[0][2];
    }

    return whoWon;
}

function printEmptyCells() {
    var emptyCellCounter = 9;

    for (var rowIndex=0; rowIndex<3; rowIndex++) {
        for (var columnIndex=0; columnIndex<3; columnIndex++) {
            if (board[rowIndex][columnIndex] ===null) {

                console.log('cell, rowIndex: ' + rowIndex +
                    ', columnIndex: ' + columnIndex +
                    ', value at board location: ' + board[rowIndex][columnIndex]
                );
            } else {
                emptyCellCounter -= 1;
            }
        }
    }

    console.log(emptyCellCounter);
}

function copyBoard() {
    // create empty board
    var newBoard = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    // copy every cell from board to new board
    for (var rowIndex=0; rowIndex<3; rowIndex++) {
        for (var columnIndex=0; columnIndex<3; columnIndex++) {
            newBoard[rowIndex][columnIndex] = board[rowIndex][columnIndex];
        }
    }

    return newBoard;
}

function aiPlay() {
    console.log('---[ aiPlay');

//  var madeMove = makeRandomMove();

//  var madeMove = makeFirstAvailableMove();

  var madeMove = makeWinningMove();

    if (madeMove === false) {
        madeMove = makeDefendingMove();
    }

    if (madeMove === false) {
        makeOtherMove();
    }

    checkGameOver();
}

function placeO(rowIndex, columnIndex) {
    board[rowIndex][columnIndex] = 'o';
    document.getElementsByClassName('border' + rowIndex + columnIndex)[0].innerHTML = oSvg;
    turnCounter += 1;
}

function makeWinningMove() {
    for (var rowIndex=0; rowIndex<3; rowIndex++) {
        for (var columnIndex=0; columnIndex<3; columnIndex++) {

            if (board[rowIndex][columnIndex] === null) {
                var newBoard = copyBoard();
                newBoard[rowIndex][columnIndex] = 'o';
                var winner = whoWon(newBoard)
                if (winner === 'o') {
                    placeO(rowIndex, columnIndex);
                    return true;
                }
            }
        }
    }

    return false;
}

function makeDefendingMove() {
    for (var rowIndex=0; rowIndex<3; rowIndex++) {
        for (var columnIndex=0; columnIndex<3; columnIndex++) {

            if (board[rowIndex][columnIndex] === null) {
                var newBoard = copyBoard();
                newBoard[rowIndex][columnIndex] = 'x';
                var winner = whoWon(newBoard)
                if (winner === 'x') {
                    placeO(rowIndex, columnIndex);
                    return true;
                }
            }
        }
    }

    return false;
}

function makeFirstAvailableMove() {
    for (var rowIndex=0; rowIndex<3; rowIndex++) {
        for (var columnIndex=0; columnIndex<3; columnIndex++) {

            if (board[rowIndex][columnIndex] === null) {
                placeO(rowIndex, columnIndex);
                return;
            }
        }
    }
}

function makeRandomMove() {

    while (true) {
        var randomRowIndex = getRandomInt(0, 2);
        var randomColumnIndex = getRandomInt(0, 2);

        console.log(randomRowIndex, randomColumnIndex);

        if (board[randomRowIndex][randomColumnIndex] === null) {
            placeO(randomRowIndex, randomColumnIndex);
            break;
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeOtherMove() {
    if (board[1][1] === null) {
        placeO(1, 1);
        return true;
    }

    //---- check corners
    if (board[0][0] === null) {
        placeO(0, 0);
        return true;
    }

    if (board[0][2] === null) {
        placeO(0, 2);
        return true;
    }

    if (board[2][0] === null) {
        placeO(2, 0);
        return true;
    }

    if (board[2][2] === null) {
        placeO(2, 2);
        return true;
    }

    //--- check sides
    if (board[0][1] === null) {
        placeO(0, 1);
        return true;
    }

    if (board[1][0] === null) {
        placeO(1, 0);
        return true;
    }

    if (board[1][2] === null) {
        placeO(1, 2);
        return true;
    }

    if (board[2][1] === null) {
        placeO(2, 1);
        return true;
    }

   // Note: should not be reachable
    return false;
}

