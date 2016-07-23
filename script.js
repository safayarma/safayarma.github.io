var board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

var oSvg = '<svg xmlns="http://www.w3.org/2000/svg">' +
               '<circle cx="75" cy="75" r="40" fill="transparent" stroke="white" stroke-width="20"/>' +
           '</svg>';
         
var xSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150">' +
                '<path stroke="white" stroke-width="20"  d="M35,35 L115,115 M115,35 L35,115"/>' +
            '</svg>';
         
var clickCounter = 0;
var gameOver = false;


function cellClicked(div, rowIndex, colIndex){
    console.log('Button clicked: ', div, ', rowIndex: ', rowIndex, ', colIndex: ', colIndex);

    if (gameOver === false && board[rowIndex][colIndex] === " ") {


        //Adds to the clickCounter variable
        clickCounter += 1;
        var player = ' ';
        if (clickCounter % 2 === 1){
            player = 'x';
            div.innerHTML = xSvg;
        } else {
            player = 'o';
            div.innerHTML = oSvg;
        }

        //sets the spot in the board that matches the spot the div is to x or o
        board[rowIndex][colIndex] = player;
        console.log('spot in the board at the given coordinate after update has:',  board[rowIndex][colIndex]  )


        //sets div label to x or o

        var winner = whoWon();
        console.log('who won? ', winner);

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
  winner = whoWonColumn()

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
        if (board[rowIndex][0] === board[rowIndex][1] && board[rowIndex][1] === board[rowIndex][2] && board[rowIndex][0] != " ") {
           whoWon = board[rowIndex][0];
           break;
        }
    }

    return whoWon;
}

function whoWonColumn(){
    var whoWon = ' ';
    for (var columnIndex=0; columnIndex<3; columnIndex++) {
        if (board[0][columnIndex] === board[1][columnIndex] && board[1][columnIndex] === board[2][columnIndex] && board[0][columnIndex] != " ") {
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


