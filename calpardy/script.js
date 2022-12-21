function start() {
  	transition("title","game");
	updateCategories();
    	for (i=0;i<6;i++) {
		document.getElementById(i + "-200").innerHTML = "$200";
		document.getElementById(i + "-400").innerHTML = "$400";
		document.getElementById(i + "-600").innerHTML = "$600";
		document.getElementById(i + "-800").innerHTML = "$800";
		document.getElementById(i + "-1000").innerHTML = "$1000";
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
    	document.getElementById(tempCat + "-" + (tempIndex+1) * 200).style.backgroundColor = "white";
}

var foo;
var category = [];
var tempIndex = 0;
var tempCat = 0;
var i;

for (i=0;i<6;i++) {
	id = Math.floor(Math.random() * 2132);
	getCategories(i, id);
}

setTimeout(function() {
	updateCategories();
}, 500);

function updateCategories() {
	for (i=0;i<6;i++) {
		document.getElementById("cat-" + i).innerHTML = category[i].title.toUpperCase();
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
	for (i=0;i<6;i++) {
		document.getElementById(i + "-200").innerHTML = "$200";
		document.getElementById(i + "-400").innerHTML = "$400";
		document.getElementById(i + "-600").innerHTML = "$600";
		document.getElementById(i + "-800").innerHTML = "$800";
		document.getElementById(i + "-1000").innerHTML = "$1000";
	}
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
