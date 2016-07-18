var board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

var clickCounter = 0;

function cellClicked(button, rowIndex, colIndex){
  console.log('Button clicked: ', button);
  clickCounter += 1;
  var player = ' ';
  if (clickCounter % 2 === 1){
    player = 'x';
  } else {
    player = 'o';
  }

  board[rowIndex][colIndex] = player;
  button.innerHTML = player;

  var winner = whoWon();

  if (winner === 'x' || winner === 'o') {
    alert('Congrats, player: ', winner, ' won!');
  }

  if (winner === 'x' || winner === 'o' || clickCounter === 9) {
    alert("Game Over");
  }
}

function printBoard(){
  for (var i=0; i<3; i++){
    console.log(board[i][0], board[i][1], board[i][2]);
  }
}

function whoWon() {
  // TODO: add checks to see if anyone won.
  // this functions shoudl return x, o, or ' '.
  return ' ';
}