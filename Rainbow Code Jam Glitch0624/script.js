var colorIds = ["p-red", "p-orange", "p-yellow", "p-green", "p-blue", "p-purple"];
var colorArray = ["red", "orange", "yellow", "green", "blue", "purple"];
var colorPercents = [0, 0, 0, 0, 0, 0];

var i = 0;
/*
var a = setTimeout(function() {
for (i=0; i<6; i++) {
  document.getElementById(colorIds[i]).style.width = (Math.floor(Math.random() * 11) * 10) + "%" ;
}
}, 20);
*/
var a = setTimeout(function() {
  document.getElementById(colorIds[i]).style.width = ((Math.floor(Math.random() * 7) + 4) * 10) + "%" ;
  i++;
}, 20);
var b = setTimeout(function() {
  document.getElementById(colorIds[i]).style.width = ((Math.floor(Math.random() * 7) + 4) * 10) + "%" ;
  i++;
}, 120);
var c = setTimeout(function() {
  document.getElementById(colorIds[i]).style.width = ((Math.floor(Math.random() * 7) + 4) * 10) + "%" ;
  i++;
}, 220);
var d = setTimeout(function() {
  document.getElementById(colorIds[i]).style.width = ((Math.floor(Math.random() * 7) + 4) * 10) + "%" ;
  i++;
}, 320);
var e = setTimeout(function() {
  document.getElementById(colorIds[i]).style.width = ((Math.floor(Math.random() * 7) + 4) * 10) + "%" ;
  i++;
}, 420);
var f = setTimeout(function() {
  document.getElementById(colorIds[i]).style.width = ((Math.floor(Math.random() * 7) + 4) * 10) + "%" ;
  i++;
}, 520);

function begin() {
  document.getElementById("scene-intro").style.display = "none";
  document.getElementById("scene-goals").style.display = "inline";
  document.getElementById("title").innerHTML = "Rainbow Fitness";
  document.getElementById("subtitle").style.display = "none";
}

var goal = 0;
function advanceGoals() {
  if (goal < 6) {
    document.getElementById("ct-" + goal).style.borderBottom = ("solid 0px " + colorArray[goal]);
    document.getElementById("goals" + goal).style.display = "none";
    document.getElementById("goal-" + goal).value = document.getElementById("goals-your-" + goal).value;
    goal++;
    document.getElementById("goals" + goal).style.display = "inline";
    document.getElementById("ct-" + goal).style.borderBottom = ("solid 2px " + colorArray[goal]);
  } else {
    submitGoals();
  }
}

function submitGoals() {
  document.getElementById("scene-goals").style.display = "none";
  document.getElementById("scene-rainbow").style.display = "inline";
}
