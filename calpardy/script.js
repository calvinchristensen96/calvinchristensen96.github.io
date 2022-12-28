var gameBoard = [[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]];
// 0 = main menu,  1 = options, 2 = game, 3 = question , 5 = free play
var scene = 0;
var category = [];
var tempIndex = 0;
var tempCat = 0;
var i;
var dark = false;

function start(val) {
  if (val == 0) {
    transition("title","options");
    document.getElementById("title-logo").style.top = "24px";
    document.getElementById("title-logo").style.fontSize = "24px";
    document.getElementById("header-back").style.left = "20px";
    updateCategories();
    scene = 1;
  } else if (val == 1) {
    transition("title","game");
    document.getElementById("title-logo").style.top = "24px";
    document.getElementById("title-logo").style.fontSize = "24px";
    document.getElementById("header-back").style.left = "20px";
    document.getElementById("question-a").innerHTML = "";
    refreshCategories();
    scene = 2;
  } else if (val == 2) {
  	//Regular Game
  } else if (val == 3) {
    transition("options","free-play");
    freePlay();
    scene = 5;
  }
}

function back() {
  if (scene == 1) {
    transition("options","title");
  } else if (scene == 2) {
    transition("game","title");
  }	 else if (scene == 3) {
    transition("question","title");
  } else if (scene == 5) {
    transition("free-play","title");
  }
  document.getElementById("title-logo").style.top = "25vh";
  document.getElementById("title-logo").style.fontSize = "64px";
  document.getElementById("header-back").style.left = "-24px";
  scene = 0;
}

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
    }, 500);
  document.getElementById("transition-layer").style.opacity = 1;
}

function closeQuestion() {
  document.getElementById("question").style.display = "none";
  document.getElementById("game").style.display = "inline";
  document.getElementById(tempCat + "-" + (tempIndex+1) * 200).innerHTML = "";
  document.getElementById(tempCat + "-" + (tempIndex+1) * 200).style.background = "none";
  gameBoard[tempCat][tempIndex] = 0;
  document.getElementById("question-a").innerHTML = "";
  scene = 2;
  document.getElementById("header-back").style.display = "inline";
  // grey out a finished category
  if (gameBoard[tempCat].every((val, i, arr) => val === 0 )) {
    document.getElementById("game-section-" + tempCat).style.opacity = "0.5";
  }
}

for (i=0;i<6;i++) {
  id = Math.floor(Math.random() * 5505);
  getCategories(i, id);
}

function updateCategories() {
  for (i=0;i<6;i++) {
    document.getElementById("cat-" + i).innerHTML = category[i].title.toUpperCase();
    document.getElementById("cat-" + i + "-date").innerHTML = category[i].clues[0].airdate.substring(0,4);
    document.getElementById("game-section-" + i).style.opacity = "1";
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
    id = Math.floor(Math.random() * 5505);
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
  document.getElementById("question-q").innerHTML = category[cat].clues[index].question;
  tempIndex = index;
  tempCat = cat;
  document.getElementById("header-back").style.display = "none";
  scene = 3;
}

function showAnswer() {
  document.getElementById("question-a").innerHTML = category[tempCat].clues[tempIndex].answer;
}

var players = 3;
function addPlayer(val) {
  players += val;
  if (players < 1) {
    players = 1;
  } else if (players > 5) {
    players = 5;
  }
  document.getElementById("option-number").innerHTML = players;
}



var select = document.getElementById("category-select");
var freePlayOptions = [];
var freePlayIds = [];
var categoryId = 0;

function freePlay() {
fetch('https://jservice.io/api/categories?count=1000')
  .then(response => response.text())
  .then((data) => {
    var raw = JSON.parse(data);
    for (i=0;i<100;i++) {
      freePlayOptions.push(raw[i].title.toUpperCase());
      freePlayIds.push(raw[i].id);
    }
    populate();
  })
}

function populate() {
  for(var i = 0; i < freePlayOptions.length; i++) {
    var opt = freePlayOptions[i];
    var optId = freePlayIds[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = optId;
    select.appendChild(el);
  }
}

function freePlayChange() {
  document.getElementById("free-play-questions").style.display = "block";
  freePlayGetClues(document.getElementById("category-select").value);
}

function freePlayGetClues(val) {
  fetch('https://jservice.io/api/category?id=' + val)
  .then(response => response.text())
  .then((data) => {
    var raw = JSON.parse(data);
    freePlayCreateTable(raw);
  })
}

function freePlayCreateTable(raw) {
  var curDate = raw.clues[0].airdate;
  var result = raw.clues_count + '<br>' + raw.clues[0].airdate;
  for (i=0;i<raw.clues.length;i++) {
    if (raw.clues[i].airdate != curDate) {
      result += '<br>' + raw.clues[i].airdate;
      curDate = raw.clues[i].airdate;
    }
  }
  document.getElementById("free-play-questions").innerHTML = result;
}
