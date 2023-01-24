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
    transition("options","game",750);
    document.getElementById("title-logo").style.top = "24px";
    document.getElementById("title-logo").style.fontSize = "24px";
    document.getElementById("header-back").style.left = "20px";
    document.getElementById("header-refresh").style.right = "20px";
    document.getElementById("question-answer").innerHTML = "";
    refreshCategories();
    scene = 2;
  } else if (val == 2) {
  	//Regular Game
  } else if (val == 3) {
    transition("options","free-play");
    freePlay();
    scene = 5;
  } else if (val == 7) {
    transition("daily-how-to-play", "daily");
    document.getElementById("header-back").style.left = "20px";
    daily();
    scene = 8;
  } else if (val == 8) {
    transition("title", "daily-how-to-play");
    document.getElementById("title-logo").style.top = "24px";
    document.getElementById("title-logo").style.fontSize = "24px";
    scene = 8;
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
  } else if (scene == 8) {
    transition("daily","title");
  }
  document.getElementById("title-logo").style.top = "25vh";
  document.getElementById("title-logo").style.fontSize = "64px";
  document.getElementById("header-back").style.left = "-24px";
  document.getElementById("header-refresh").style.right = "-24px";
  scene = 0;
}

function changeTheme() {
  if (dark) {
  	document.documentElement.style.setProperty('--c1', '#E26310');
    document.documentElement.style.setProperty('--c2', '#F8D496');
    document.documentElement.style.setProperty('--c4', '#FFFFFF');
    document.documentElement.style.setProperty('--c5', '#000000');
    dark = false;
  } else {
    document.documentElement.style.setProperty('--c1', '#131313');
    document.documentElement.style.setProperty('--c2', '#824700');
    document.documentElement.style.setProperty('--c4', '#474747');
    document.documentElement.style.setProperty('--c5', '#EEEEEE');
    dark = true;
  }
}

function transition(to, from, duration) {
  if (duration == null) {
    duration = 300;
  }
  var a = setTimeout(function() {
    document.getElementById(to).style.display = "none";
      document.getElementById(from).style.display = "inline";
      document.getElementById("transition-layer").style.opacity = 0;
    }, duration);
  document.getElementById("transition-layer").style.opacity = 1;
}

function closeQuestion() {
  if (scene == 3) {
    document.getElementById("question").style.display = "none";
    document.getElementById("game").style.display = "inline";
    document.getElementById(tempCat + "-" + (tempIndex+1) * 200).innerHTML = "";
    document.getElementById(tempCat + "-" + (tempIndex+1) * 200).style.background = "none";
    gameBoard[tempCat][tempIndex] = 0;
    document.getElementById("question-answer").innerHTML = "";
    scene = 2;
    document.getElementById("header-back").style.display = "inline";
    document.getElementById("header-refresh").style.display = "inline";
    // grey out a finished category
    if (gameBoard[tempCat].every((val, i, arr) => val === 0 )) {
      document.getElementById("game-section-" + tempCat).style.opacity = "0.5";
    }
  } else if (scene == 5) {
    document.getElementById("question").style.display = "none";
    document.getElementById("free-play").style.display = "inline";
    document.getElementById("question-close").style.display = "inline";
    document.getElementById("header-back").style.display = "inline";
    document.getElementById("question-answer").innerHTML = "";
  } else if (scene == 8) {
    document.getElementById("question").style.display = "none";
    document.getElementById("daily").style.display = "inline";
    document.getElementById("question-answer").innerHTML = "";
    document.getElementById("daily-correct").style.display = "none";
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
  }, 750);
}

function showClue(cat, index) {
  document.getElementById("question").style.display = "inline";
  document.getElementById("game").style.display = "none";
  document.getElementById("question-category").innerHTML = category[cat].title.toUpperCase();
  document.getElementById("question-q").innerHTML = category[cat].clues[index].question;
  tempIndex = index;
  tempCat = cat;
  document.getElementById("header-back").style.display = "none";
  document.getElementById("header-refresh").style.display = "none";
  document.getElementById("question-close").style.display = "inline";
  scene = 3;
}

function showAnswer() {
  if (scene == 3) {
    document.getElementById("question-answer").innerHTML = category[tempCat].clues[tempIndex].answer;
  } else if (scene == 5) {
    document.getElementById("question-answer").innerHTML = freePlayCategoryData.clues[freePlayIndex].answer;
  } else if (scene == 8) {
    document.getElementById("daily-correct").style.display = "inline";
    if (dailyCat == 0) {
      document.getElementById("question-answer").innerHTML = daily0[2][dailyQues];
    } else if (dailyCat == 1) {
      document.getElementById("question-answer").innerHTML = daily1[2][dailyQues];
    } else if (dailyCat == 2) {
      document.getElementById("question-answer").innerHTML = daily2[2][dailyQues];
    }
  }
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
fetch('https://jservice.io/api/categories?count=100&offset=3000')
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

var dailyScore = [['x','x','x','x'],['x','x','x','x'],['x','x','x','x']];
var dailyTurn = 0;
var bonus = false;
var dailyDate;
var score = 0;

/*
var daily0;
var daily1;
var daily2;
var iteration;
*/

function daily() {
  document.getElementById("myScore").style.visibility = "none";
  //dailyScore = [['x','x','x','x'],['x','x','x','x'],['x','x','x','x']];
  //dailyTurn = 0;
  //bonus = false;
  //score = 0;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  dailyDate = today;
  document.getElementById("daily-date").innerHTML = today;
  getDailyQuestions(today);
  document.getElementById("daily-category0").innerHTML = daily0[0];
  document.getElementById("daily-category1").innerHTML = daily1[0];
  document.getElementById("daily-category2").innerHTML = daily2[0];
}

var dailyCat = 0;
var dailyQues = 0;

function dailyQ(cat,ques) {
  if (dailyScore[cat][ques] == 'x' && dailyTurn < 10) {
    showClueDaily(cat,ques);
    dailyCat = cat;
    dailyQues = ques;  
  }
}

function dailyCorrect(val) {
  document.getElementById("daily" + dailyCat + "-q" + dailyQues).style.borderColor = "var(--c1)";
  document.getElementById("daily" + dailyCat + "-q" + dailyQues).style.cursor = "auto";
  if (val == 0) {
    document.getElementById("daily" + dailyCat + "-q" + dailyQues).style.backgroundColor = "white";
    dailyScore[dailyCat][dailyQues] = 0;
  } else {
    document.getElementById("daily" + dailyCat + "-q" + dailyQues).style.backgroundColor = "var(--c1)";
    dailyScore[dailyCat][dailyQues] = 1;
    score++;
  }
  dailyTurn++;
  document.getElementById("header-back").style.display = "inline-block";
  closeQuestion();
  if (dailyTurn == 9) {
    document.getElementById("daily0-q3").style.display = "inline-block";
    document.getElementById("daily1-q3").style.display = "inline-block";
    document.getElementById("daily2-q3").style.display = "inline-block";
  } else if (dailyTurn == 10) {
    document.getElementById("daily-share").style.display = "inline-block";
    var i;
    for (i=0;i<3;i++) {
      if (dailyScore[i][3] == 'x') {
        document.getElementById("daily" + i + "-q3").style.backgroundColor = "white";
        document.getElementById("daily" + i + "-q3").style.border = "white";
        document.getElementById("daily" + i + "-q3").style.cursor = "auto";
      }
    }
  }
}

function showClueDaily(cat, index) {
  document.getElementById("question").style.display = "inline";
  document.getElementById("daily").style.display = "none";
  if (cat == 0) {
    document.getElementById("question-category").innerHTML = daily0[0];
    document.getElementById("question-q").innerHTML = daily0[1][index];
  } else if (cat == 1) {
    document.getElementById("question-category").innerHTML = daily1[0];
    document.getElementById("question-q").innerHTML = daily1[1][index];
  } else if (cat == 2) {
    document.getElementById("question-category").innerHTML = daily2[0];
    document.getElementById("question-q").innerHTML = daily2[1][index];
  }
  tempIndex = index;
  tempCat = cat;
  document.getElementById("header-back").style.display = "none";
  document.getElementById("header-refresh").style.display = "none";
  document.getElementById("question-close").style.display = "none";
}

function share() {
  var result = "";
  var i;
  var j;
  for (i=0;i<3;i++) {
    for (j=0;j<4;j++) {
      if (dailyScore[i][j] == 0) {
        result += "⬜";
      } else if (dailyScore[i][j] == 1) {
        result += "🟧";
      }
    }
    result += "\n";
  }
  result += "\nCalpardy Daily #" + iteration + "\n" + dailyDate + "\n" + score*10 + "%" + "\n\ncalvinchristensen96.github.io/calpardy";
  document.getElementById("myScore").value = result;
  var copyText = document.getElementById("myScore");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard
  .writeText(copyText.value)
  .then(() => {
    alert("Your score has been copied to your clipboard.\n\nThank you for playing!");
  })
  .catch(() => {
    alert("Unable to copy to clipboard. Please copy message manually to share.\n\nThank you for playing!");
  });
  document.getElementById("myScore").style.visibility = "visible";
}

function populate() {
  //document.getElementById("free-play-board").innerHTML = freePlayOptions + "<br><br>" + freePlayIds;
  for(var i = 0; i < allCategories.categories.length; i++) {
    var opt = allCategories.categories[i];
    var optId = allCategories.ids[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = optId;
    select.appendChild(el);
  }
  sortSelect(select); 
}

function sortSelect(selElem) {
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    return;
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

var freePlayCategoryData;
var freePlayIndex;
function freePlayCreateTable(raw) {
  freePlayCategoryData = raw;
  var curDate = raw.clues[0].airdate;
  var table = false;
  var result = getDate(raw.clues[0].airdate) + '<br>';
  for (i=0;i<raw.clues.length;i++) {
    if (raw.clues[i].airdate != curDate) {
      result += '</table>';
      table = false;
      result += '<br>' + getDate(raw.clues[i].airdate) + '<br>';
      curDate = raw.clues[i].airdate;
    } else {
      if (!table) {
	    result += '<table class="free-play-table">';
        table = true;
      }
      if (raw.clues[i].value == null) {
        raw.clues[i].value = 'DD';
      }
      result += '<td id="value' + i + '"onClick="showClueFreePlay(' + i + ')" style="background-color: var(--c2);">' + raw.clues[i].value + '</td>';
    }
  }
  document.getElementById("free-play-questions").innerHTML = result;
}

function showClueFreePlay(index) {
  document.getElementById("value" + index).style.backgroundColor = "white";
  freePlayIndex = index;
  document.getElementById("question").style.display = "inline";
  document.getElementById("free-play").style.display = "none";
  document.getElementById("question-category").innerHTML = freePlayCategoryData.title.toUpperCase();
  document.getElementById("question-q").innerHTML = freePlayCategoryData.clues[index].question;
  document.getElementById("header-back").style.display = "none";
  document.getElementById("header-refresh").style.display = "none";
}

// Takes a string in YYYY-MM-DD and returns in Month Day, Year.
function getDate(str) {
  var month = str.substring(5,7);
  if (month == '01') {
    month = 'January';
  } else if (month == '02') {
    month = 'February';
  } else if (month == '03') {
    month = 'March';
  } else if (month == '04') {
    month = 'April';
  } else if (month == '05') {
    month = 'May';
  } else if (month == '06') {
    month = 'June';
  } else if (month == '07') {
    month = 'July';
  } else if (month == '08') {
    month = 'August';
  } else if (month == '09') {
    month = 'September';
  } else if (month == '10') {
    month = 'October';
  } else if (month == '11') {
    month = 'November';
  } else if (month == '12') {
    month = 'December';
  }
  var day = str.substring(8,10);
  var year = str.substring(0,4);
  var result = month + ' ' + day + ', ' + year;
  return result;
}
