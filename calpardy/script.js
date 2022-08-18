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
		document.getElementById("cat" + i).innerHTML = category[i].title;
	}
}

function getCategories(i, id) {
fetch('https://jservice.io/api/category?id=' + id)
  .then(response => response.text())
  .then((data) => {
    category.push(JSON.parse(data));
    document.getElementById("cat" + i).innerHTML = category[i].title;
    }
  )
}

function showClue(cat, index) {
  document.getElementById("clue-modal").style.display = "inline-block";
  document.getElementById("question").innerHTML = category[cat].clues[index].question;
  tempIndex = index;
  tempCat = cat;
}

function showAnswer() {
  document.getElementById("question").innerHTML = category[tempCat].clues[tempIndex].answer;
}

function hideClue() {
  document.getElementById("clue-modal").style.display = "none";
  document.getElementById(tempCat + "-" + (tempIndex+1) * 200).innerHTML = "";
}

function addScore(player) {
	document.getElementById("score" + player).innerHTML = "$" + (tempIndex + 1) * 200;
}

function subScore(player) {

}
