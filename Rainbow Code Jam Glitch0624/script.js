var colorIds = ["p-red", "p-orange", "p-yellow", "p-green", "p-blue", "p-purple"];
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
