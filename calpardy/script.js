var foo;
var category;
var catid = Math.floor(Math.random() * 2132);
var tempIndex = 0;

fetch('https://jservice.io/api/category?id=' + catid)
  .then(response => response.text())
  .then((data) => {
  //  alert(data);
    category = JSON.parse(data);
    document.getElementById("cat0").innerHTML = category.title;
    }
  )

function showClue(index) {
  document.getElementById("clue-modal").style.display = "inline-block";
  document.getElementById("question").innerHTML = category.clues[index].question;
  tempIndex = index;
}

function showAnswer() {
  document.getElementById("question").innerHTML = category.clues[tempIndex].answer;
}

function hideClue() {
  document.getElementById("clue-modal").style.display = "none";
}
