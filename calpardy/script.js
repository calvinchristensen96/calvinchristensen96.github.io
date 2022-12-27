var gameBoard = [[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]];

function start() {
  transition("title","game");
  updateCategories();
}

var dark = false;
function changeTheme() {
  if (dark) {
  	document.documentElement.style.setProperty('--c1', '#E26310');
    dark = false;
  } else {
    document.documentElement.style.setProperty('--c1', '#353535');
    dark = true;
  }
}

function transition(to, from) {
  var a = setTimeout(function() {
    document.getElementById(to).style.display = "none";
    document.getElementById(from).style.display = "inline";
    document.getElementById("transition-layer").style.opacity = 0;
  }, 250);
  document.getElementById("transition-layer").style.opacity = 1;
}

function closeQuestion() {
  document.getElementById("question").style.display = "none";
  document.getElementById("game").style.display = "inline";
  document.getElementById(tempCat + "-" + (tempIndex+1) * 200).innerHTML = "";
  document.getElementById(tempCat + "-" + (tempIndex+1) * 200).style.background = "none";
  gameBoard[tempCat][tempIndex] = 0;
  // grey out a finished category
  if (gameBoard[tempCat].every((val, i, arr) => val === 0 )) {
    document.getElementById("game-section-" + tempCat).style.color = "#454545";
      document.getElementById("game-section-" + tempCat).style.opacity = "0.5";
    }
}

var foo;
var category = [];
var tempIndex = 0;
var tempCat = 0;
var i;

for (i=0;i<6;i++) {
  id = Math.floor(Math.random() * 5505);
  getCategories(i, id);
}

function updateCategories() {
  for (i=0;i<6;i++) {
    document.getElementById("cat-" + i).innerHTML = category[i].title.toUpperCase();
    document.getElementById("cat-" + i + "-date").innerHTML = category[i].clues[0].airdate.substring(0,4);
    if (category[i].clues.length > 0) {
      document.getElementById(i + "-200").innerHTML = "$200";
      document.getElementById(i + "-200").style.backgroundColor = "var(--c2)";
    }
    if (category[i].clues.length > 1) {
      document.getElementById(i + "-400").innerHTML = "$400";
      document.getElementById(i + "-400").style.backgroundColor = "var(--c2)";
    }
    if (category[i].clues.length > 2) {
      document.getElementById(i + "-600").innerHTML = "$600";
      document.getElementById(i + "-600").style.backgroundColor = "var(--c2)";
    }
    if (category[i].clues.length > 3) {
      document.getElementById(i + "-800").innerHTML = "$800";
      document.getElementById(i + "-800").style.backgroundColor = "var(--c2)";
    }
    if (category[i].clues.length > 4) {
      document.getElementById(i + "-1000").innerHTML = "$1000";
      document.getElementById(i + "-1000").style.backgroundColor = "var(--c2)";
    }
  }
}

function getCategories(i, id) {
fetch('https://jservice.io/api/category?id=' + id)
  .then(response => response.text())
  .then((data) => {
  category.push(JSON.parse(data));
  document.getElementById("cat-" + i).innerHTML = category[i].title.toUpperCase();
  })
}

function refreshCategories() {
  category = [];
  tempIndex = 0;
  tempCat = 0;
  for (i=0;i<6;i++) {
    id = Math.floor(Math.random() * 2132);
    getCategories(i, id);
  }
  setTimeout(function() {
    updateCategories();
  }, 500);
}

function showClue(cat, index) {
  document.getElementById("question").style.display = "inline";
  document.getElementById("game").style.display = "none";
  document.getElementById("question-category").innerHTML = category[cat].title.toUpperCase();
  document.getElementById("question-card").innerHTML = category[cat].clues[index].question;
  tempIndex = index;
  tempCat = cat;
}

function showAnswer() {
  document.getElementById("question-card").innerHTML = category[tempCat].clues[tempIndex].answer;
}
