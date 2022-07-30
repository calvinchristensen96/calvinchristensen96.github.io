/* TO-DO
- save score to cookies
- speed increase on level increase
- add move down button
- delay timer on ground move or rotate
- check that rotations are legal
- center start/resume button
*/
var boardHeight = 20;
var boardWidth = 10;
var activeCell = [-3,3];
var linesCleared = 0;

var occupiedCells = [[false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false],
                     [false,false,false,false,false,false,false,false,false,false]];

class block {
  constructor(name, body, color, rotations) {
    this.name = name;
    this.body = body;
    this.color = color;
    this.rotations = rotations;

    this.activeRotation = 0;
    this.canDrop = true;
  }
}

var score = 0;
var totalLinesCleared = 0;
var level = 1;

var squareBlock = new block("Square Block", [[1,1],[1,2],[2,1],[2,2]], "yellow", [[[1,1],[1,2],[2,1],[2,2]]]);
var sBlock = new block("S Block", [[2,0],[2,1],[1,1],[1,2]], "green", [[[2,0],[2,1],[1,1],[1,2]], [[0,1],[1,1],[1,2],[2,2]]]);
var zBlock = new block("Z Block", [[2,2],[2,1],[1,1],[1,0]], "red", [[[2,2],[2,1],[1,1],[1,0]],[[1,1],[2,1],[0,2],[1,2]]]);
var lBlock = new block("L Block", [[1,2],[2,2],[2,1],[2,0]], "orange", [[[1,2],[2,2],[2,1],[2,0]],[[1,1],[2,1],[3,1],[3,2]],[[1,0],[2,0],[1,1],[1,2]],[[3,2],[2,2],[1,2],[1,1]]]);
var jBlock = new block("J Block", [[1,0],[2,0],[2,1],[2,2]], "blue", [[[1,0],[2,0],[2,1],[2,2]],[[0,1],[0,2],[1,1],[2,1]],[[1,0],[1,1],[1,2],[2,2]],[[0,2],[1,2],[2,2],[2,1]]]);
var tBlock = new block("T Block", [[2,1],[1,1],[1,2],[1,0]], "purple", [[[2,1],[1,1],[1,2],[1,0]],[[0,2],[1,1],[1,2],[2,2]],[[2,0],[1,1],[2,1],[2,2]],[[0,1],[1,1],[1,2],[2,1]]]);
var lineBlock = new block("Line Block", [[1,3],[1,2],[1,1],[1,0]], "cyan", [[[1,3],[1,2],[1,1],[1,0]], [[0,1],[1,1],[2,1],[3,1]]]);

var queue = [squareBlock, sBlock, zBlock, lineBlock, jBlock, tBlock];
var reserveBlocks = [squareBlock, sBlock, zBlock, lBlock, jBlock, tBlock, lineBlock];
queue = shuffle(queue);

var heldBlock = null;
var droppedThisTurn = false;
var activeBlock = reserveBlocks[0];
var interval;
var paused = true;

function start() {
  document.getElementById("btn-start").style.display = "none";
  paused = false;
  interval = setInterval(function(){
    nextTurn();
  }, 200);
}

function pause() {
  if (!paused) {
    paused = true;
    document.getElementById("btn-start").style.display = "block";
    document.getElementById("btn-start").innerHTML = "Resume";
    clearInterval(interval);
  }
}

function updateTable() {
  var i, j, k;
  for (i=0;i<boardWidth;i++) {
    for (j=0;j<boardHeight;j++) {
      if (!occupiedCells[j][i]) {
        document.getElementById(j + '-' + i).style.backgroundColor = "white";
      }
    }
  }
  //color cells for active block
  for (k=0;k<activeBlock.body.length;k++) {
    if (activeCell[0]+activeBlock.body[k][0] < boardHeight && activeCell[1]+activeBlock.body[k][1] < boardWidth) {
      document.getElementById( (activeCell[0]+activeBlock.body[k][0]) + '-' + (activeCell[1]+activeBlock.body[k][1])).style.backgroundColor = activeBlock.color;
      document.getElementById( (activeCell[0]+activeBlock.body[k][0]) + '-' + (activeCell[1]+activeBlock.body[k][1])).style.border = "solid black 1px";
    }
  // color cells for placed blocks
  }
}


updateQueue();


function updateQueue() {
  clearQueue();
  var i, j, k, l;
  for (i=0;i<queue.length;i++) {
    for(j=0;j<4;j++) {
      for(k=0;k<4;k++) {
        for(l=0;l<queue[i].body.length;l++) {
          document.getElementById("q"+i+"-"+queue[i].rotations[0][l][0] + "-"+queue[i].rotations[0][l][1]).style.backgroundColor = queue[i].color;
          document.getElementById("q"+i+"-"+queue[i].rotations[0][l][0] + "-"+queue[i].rotations[0][l][1]).style.border = "solid black 1px";
        }
      }
    }
  }
}

function clearQueue() {
  var i, j, k;
  for (i=0;i<queue.length;i++) {
    for(j=0;j<4;j++) {
      for(k=0;k<4;k++) {
        document.getElementById("q"+i+"-"+j+ "-"+k).style.backgroundColor = "white";
        document.getElementById("q"+i+"-"+j+ "-"+k).style.border = "none";
      }
    }
  }
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function nextTurn() {
  var i;
  var drop = 0;

  for (i=0;i<activeBlock.body.length;i++) {
    if (activeCell[0]+activeBlock.body[i][0] >= boardHeight - 1) {
      drop++;
    }
    if (activeCell[0]+activeBlock.body[i][0] >= 0 && activeCell[0]+activeBlock.body[i][0] < boardHeight - 1) {
      if(occupiedCells[activeCell[0]+activeBlock.body[i][0]+1][activeCell[1]+activeBlock.body[i][1]]) {
        drop++;
      }
    }
  }

  if (drop != 0) {
    activeBlock.canDrop = false;
    cementBlock();
    checkForLineClears();
    dropNextBlock();
  } else {
    activeBlock.canDrop = true;
  }

  if (activeBlock.canDrop) {
    activeCell[0]++;
  }
  updateTable();
}

function checkForLineClears() {
  var i,j;
  var result;
  for(i=0;i<boardHeight;i++) {
    j = 0;
    result = occupiedCells[i][0];
    while (result && j < 10) {
      result = occupiedCells[i][j];
      j++;
    }

    while(result)
    if (j >= 10 && result) {
      clearLine(i);
      break;
    }
  }
}

function clearLine(row) {
  // Clear complete row
  linesCleared++;
  var i;
  for (i=0;i<boardWidth;i++) {
    occupiedCells[row][i] = false;
  }

  var tempRow = row;
  // Move above rows down
  while(tempRow > 0) {
    for (i=0;i<boardWidth;i++) {
      occupiedCells[tempRow][i] = occupiedCells[tempRow-1][i];
      document.getElementById((tempRow + '-' + i)).style.backgroundColor = document.getElementById(((tempRow-1) + '-' + i)).style.backgroundColor;
      document.getElementById((tempRow + '-' + i)).style.border = document.getElementById(((tempRow-1) + '-' + i)).style.border;
    }
    tempRow--;
  }
}

function cementBlock() {
  var i;
  for (i=0;i<activeBlock.body.length;i++) {
    occupiedCells[activeBlock.body[i][0] + activeCell[0]][activeBlock.body[i][1] + activeCell[1]] = true;
  }
}

function dropNextBlock() {
  droppedThisTurn = false;
  if (linesCleared  > 0) {
    addPoints(linesCleared);
    linesCleared = 0;
  }
  while (totalLinesCleared > (level * 10)) {
    level++;
  }
  activeBlock = queue.shift();
  rotate(2);
  reserveBlocks = shuffle(reserveBlocks);
  while (reserveBlocks[0] == queue[5]) {
    reserveBlocks = shuffle(reserveBlocks);
  }
  queue.push(reserveBlocks[0]);
  updateQueue();
  activeCell = [-3,3];
}

function addPoints(lines) {
  if (lines == 1) {
    score+= 40 * level;
  } else if (lines == 2) {
    score+= 100 * level;
  } else if (lines == 3) {
    score += 300 * level;
  } else if (lines == 4) {
    score += 1200 * level;
  }
  totalLinesCleared += lines;
  // Update score
  document.getElementById("score").innerHTML = "Score: " + score;
}

function move(direction) {
  var canMove = 0;
  var i;

  if (direction == 0) {
    // check entire body of block to ensure no part can go outside the board
    for (i=0;i<activeBlock.body.length;i++) {
      if (activeCell[1] + activeBlock.body[i][1] > 0 && !occupiedCells[activeCell[0] + activeBlock.body[i][0]][activeCell[1] + activeBlock.body[i][1]-1]) {
      } else {
        canMove++;
        break;
      }
    }
    if (canMove == 0) {
      activeCell[1]--;
    }
  } else if (direction == 1) {
    // check entire body of block to ensure no part can go outside the board
    for (i=0;i<activeBlock.body.length;i++) {
      if (activeCell[1] + activeBlock.body[i][1] < boardWidth - 1 && !occupiedCells[activeCell[0] + activeBlock.body[i][0]][activeCell[1] + activeBlock.body[i][1]+1]) {
      } else {
        canMove++;
        break;
      }
    }
    if (canMove == 0) {
      activeCell[1]++;
    }
  }
  updateTable();
}

function dropBlock() {
  var droppable = true;
  var dropToRow = activeCell[0];
  while (droppable && dropToRow < boardHeight-1) {

    if (occupiedCells[activeBlock.body[0][0] + dropToRow][activeBlock.body[0][1] + activeCell[1]]) {
      droppable = false;
    } else {
      dropToRow++;
    }
  }
  activeCell = [dropToRow-4, activeCell[1]];
}

function hold() {
  if (!droppedThisTurn) {
    droppedThisTurn = true;
    clearHold();
    var i, j;
    for(i=0;i<4;i++) {
      for(j=0;j<activeBlock.body.length;j++) {
        document.getElementById("h"+"-"+activeBlock.rotations[0][j][0] + "-"+activeBlock.rotations[0][j][1]).style.backgroundColor = activeBlock.color;
        document.getElementById("h"+"-"+activeBlock.rotations[0][j][0] + "-"+activeBlock.rotations[0][j][1]).style.border = "solid black 1px";
      }
    }
    if (heldBlock == null) {
      heldBlock = activeBlock;
      dropNextBlock();
      droppedThisTurn = true;
    } else {
      var temp = heldBlock;
      heldBlock = activeBlock;
      activeBlock = temp;
      activeCell = [-3, 3];
    }
  }
}

function clearHold() {
  var i, j;
  for(i=0;i<4;i++) {
    for(j=0;j<4;j++) {
      document.getElementById("h"+"-"+i + "-"+j).style.backgroundColor = "white";
      document.getElementById("h"+"-"+i + "-"+j).style.border = "none";
    }
  }
}

function rotate(direction) {
  // Clockwise
  if (direction == 0) {
    if (activeBlock.activeRotation < activeBlock.rotations.length - 1) {
      activeBlock.activeRotation++;
    } else {
      activeBlock.activeRotation = 0;
    }
  // Counterclockwise
  } else if (direction == 1) {
    if (activeBlock.activeRotation > 0) {
      activeBlock.activeRotation--;
    } else {
      activeBlock.activeRotation = activeBlock.rotations.length - 1;
    }
  }
  // reset
  else {
    activeBlock.activeRotation = 0;
  }
  activeBlock.body = activeBlock.rotations[activeBlock.activeRotation];
}
/*
function isOccupied(y, x) {
  if (document.getElementById(y + "-" + x).style.backgroundColor == "white" ) {
      return false;
  } else {
    return true;
  }
}
*/
