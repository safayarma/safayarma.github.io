var board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

var clickCounter = 0;
var gameOver = false;

function cellClicked(button, rowIndex, colIndex){
    console.log('Button clicked: ', button, ', rowIndex: ', rowIndex, ', colIndex: ', colIndex);

    if (gameOver === false && board[rowIndex][colIndex] === " ") {


        //Adds to the clickCounter variable
        clickCounter += 1;
        var player = ' ';
        if (clickCounter % 2 === 1){
            player = 'x';
        } else {
            player = 'o';
        }

        //sets the spot in the board that matches the spot the button is to x or o
        board[rowIndex][colIndex] = player;
        console.log('spot in the board at the given coordinate after update has:',  board[rowIndex][colIndex]  )

        //sets button label to x or o
        button.innerHTML = player;

        var winner = whoWon();
        console.log('who won row? ', winner);

        if (winner === 'x' || winner === 'o') {
            alert('Congrats, player: ' + winner + ' won!');
            gameOver = true;
        }

        if (winner === 'x' || winner === 'o' || clickCounter === 9) {
            alert("Game Over");
            gameOver = true;

        }
    }
 }


function printBoard(){
    for (var i=0; i<3; i++){
        console.log(board[i][0], board[i][1], board[i][2]);
    }
}

function whoWon() {
  // TODO: add checks to see if anyone won.
  // this functions should return x, o, or ' '.
  var winner = whoWonRow()

  if (winner === 'x' || winner === 'o') {
    return winner;
  }

  // add other checks here
  var winner = whoWonColumn()

  if (winner === "x" || winner === "o") {
    return winner;
  }

  var winner = whoWonDiagonal()

  if (winner === "x" || winner === "o") {
    return winner;
  }


  return ' ';
}

function whoWonRow(){
    var whoWon = ' ';
    for (var rowIndex=0; rowIndex<3; rowIndex++) {
        if (board[rowIndex][0] === board[rowIndex][1] && board[rowIndex][1] === board[rowIndex][2]) {
           whoWon = board[rowIndex][0];
           break;
        }
    }

    return whoWon;
}

function whoWonColumn(){
    var whoWon = ' ';
    for (var columnIndex=0; columnIndex<3; columnIndex++) {
        if (board[0][columnIndex] === board[1][columnIndex] && board[1][columnIndex] === board[2][columnIndex]) {
           whoWon = board[0][columnIndex];
           break;
        }
    }

    return whoWon;
}

function whoWonDiagonal(){
    var whoWon = ' ';
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            whoWon = board[0][0];
        }else if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            whoWon = board[0][2];
        }

    return whoWon;
}
