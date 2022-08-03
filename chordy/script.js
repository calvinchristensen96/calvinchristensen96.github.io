var ledger = ["c0","d0","e0","f0","g0","a0","b0","c1","d1","e1","f1","g1","a1","b1","c2","d2","e2","f2","g2","a2","b2"];

var mm;
for (mm=0;mm<ledger.length;mm++) {
  document.getElementById("note-" + ledger[mm]).style.marginTop = 174 - (12 * mm) + "px";
}

var notes = ["c","c♯","d","d♯","e","f","f♯","g","g♯","a","a♯","b"];
var rootNote = "?";
var order = [];

function reset(val) {
	if (val != 0) {
		document.getElementById("result").innerHTML = "Chord not found. Try removing or adding other notes.";
		var jj;
		for (jj=0;jj<ledger.length;jj++) {
			document.getElementById("note-" + ledger[jj]).style.opacity = "0";
		}
		var i;
		var j;
		for (i=0;i<notes.length;i++) {
			for (j=0; j<3; j++) {
				if (i == 1 || i == 3 || i == 6 || i == 8 || i == 10) {
					document.getElementById('key-' + notes[i] + j).style.backgroundColor = "#242424";
				} else {
					document.getElementById('key-' + notes[i] + j).style.backgroundColor = "white";
				}
			}
			if (val != 1) {
				document.getElementById(notes[i]).checked = false;
			}
		}
	}
}

function demo() {
	var selected = [];
	var selectedNum = [];
	var i, n, m;
	for (i=0;i<notes.length;i++) {
		if (document.getElementById(notes[i]).checked == true) {
			selected.push(notes[i]);
			selectedNum.push(i);
		}
	}
	if (selectedNum[0] > selectedNum[1]) {
		selectedNum[0] = selectedNum[0] - 12;
	}
	if (selected.length < 3) {
		reset(0);
		document.getElementById("number").innerHTML = 3 - selected.length;
		if (selected.length == 2) {
			document.getElementById("plural").innerHTML = "";
		} else {
			document.getElementById("plural").innerHTML = "s";
		}
	}
	// 3
	if (selectedNum.length == 3) {
		if (selectedNum[0] + 4 == selectedNum[1] && selectedNum[0] + 8 == selectedNum[2]) {
			for (n=0; n<notes.length; n++) {
				for (m=0; m<3; m++) {
					if (document.getElementById("key-" + notes[n] + m).style.backgroundColor == "rgb(255, 185, 0)") {
						getChord(notes[n],"Augmented");
						break;
					}
				}
			}
		} else if (chordCheck(selectedNum, [4,7])) {
			getChord(selected[0],"Major");
		} else if (chordCheck(selectedNum, [5,9])) {
			getChord(selected[1],"Major");
		} else if (chordCheck(selectedNum, [3,8])) {
			getChord(selected[2],"Major");
		} else if (chordCheck(selectedNum, [3,7])) {
			getChord(selected[0],"Minor");
		} else if (chordCheck(selectedNum, [5,8])) {
			getChord(selected[1],"Minor");
		} else if (chordCheck(selectedNum, [4,9])) {
			getChord(selected[2],"Minor");
		} else if (chordCheck(selectedNum, [3,6])) {
			getChord(selected[0],"Diminished");
		} else if (chordCheck(selectedNum, [6,9])) {
			getChord(selected[1],"Diminished");
		} else if (chordCheck(selectedNum, [3,9])) {
			getChord(selected[2],"Diminished");
		} else if (chordCheck(selectedNum, [5,7])) {
			getChord(selected[0],"Suspended");
		} else if (chordCheck(selectedNum, [5,10])) {
			getChord(selected[1],"Suspended");
		} else if (chordCheck(selectedNum, [2,7])) {
			getChord(selected[2],"Suspended");
		} else {
			catchAll();
		}
	} else if (selectedNum.length == 4) {
		if (chordCheck(selectedNum, [4,7,10])) {
			getChord(selected[0],"Major 7");
		} else if (chordCheck(selectedNum, [2,6,9])) {
			getChord(selected[1],"Major 7");
		} else if (chordCheck(selectedNum, [3,5,9])) {
			getChord(selected[2],"Major 7");
		} else if (chordCheck(selectedNum, [3,6,8])) {
			getChord(selected[3],"Major 7");
		} else if (chordCheck(selectedNum, [3,7,10])) {
			getChord(selected[0],"Minor 7");
		} else if (chordCheck(selectedNum, [2,5,9])) {
			getChord(selected[1],"Minor 7");
		} else if (chordCheck(selectedNum, [3,5,8])) {
			getChord(selected[2],"Minor 7");
		} else if (chordCheck(selectedNum, [4,7,9])) {
			getChord(selected[3],"Minor 7");
		} else {
			catchAll();
		}
	}
}

function chordCheck(values, intervals) {
	var checks = [];
	var ll;
	for (ll=0;ll<intervals.length;ll++) {
		checks.push(false);
	}
	for (ll=0;ll<intervals.length;ll++) {
		if (values[0] + intervals[ll] == values[ll+1]) {
			checks[ll] = true;
		} else {
			return false;
		}
	}
	if (!checks.includes(false)) {
		return true;
	} else {
		return false;
	}
}

function catchAll() {
	document.getElementById("result").innerHTML = "Chord not found. Try removing or adding other notes.";
	reset(0);
}

function getChord(note, chord) {
	rootNote = note;
	if (chord == "Major") {
		order = [0,4,7];
	} else if (chord == "Minor") {
		order = [0,3,7];
	}
	setTimeout(function() {
		document.getElementById("card1").style.top = "0px";
		document.getElementById("card1").style.opacity = "1";
	}, 0);
	setTimeout(function() {
		document.getElementById("card2").style.top = "0px";
		document.getElementById("card2").style.opacity = "1";
	}, 100);
	setTimeout(function() {
		document.getElementById("card3").style.top = "0px";
		document.getElementById("card3").style.opacity = "1";
	}, 200);
	if (note.substring(0,1) == 'a' || note == 'e' || note.substring(0,1) == 'f') {
		document.getElementById("result").innerHTML = "This is an " + note.toUpperCase() + " " + chord + " chord.";
	} else {
		document.getElementById("result").innerHTML = "This is a " + note.toUpperCase() + " " + chord + " chord.";
	}
}

function light(id, note, val) {
	if (id.substring(5,6) == '♯') {
		if (document.getElementById(id).style.backgroundColor != "rgb(255, 185, 0)") {
			document.getElementById(id).style.backgroundColor = "#ffb900";
			document.getElementById("note-" + id.substring(4,5)  + id.substring(6,7)).style.opacity = "1";
			document.getElementById("note-" + id.substring(4,5)  + id.substring(6,7)).innerHTML = "o#";
		} else {
			document.getElementById(id).style.backgroundColor = "#242424";
			document.getElementById("note-" + id.substring(4,5)  + id.substring(6,7)).style.opacity = "0";
		}
	} else {
		if (document.getElementById(id).style.backgroundColor != "rgb(255, 185, 0)") {
			document.getElementById(id).style.backgroundColor = "#ffb900";
			document.getElementById("note-" + id.substring(4,6)).style.opacity = "1";
			document.getElementById("note-" + id.substring(4,6)).innerHTML = "o";
		} else {
			document.getElementById(id).style.backgroundColor = "#ffffff";
			document.getElementById("note-" + id.substring(4,6)).style.opacity = "0";
		}
	}
	if (val != 1) {
		if (document.getElementById(id.substring(0,id.length-1) + '0').style.backgroundColor != "rgb(255, 185, 0)" && document.getElementById(id.substring(0,id.length-1) + '1').style.backgroundColor != "rgb(255, 185, 0)" && document.getElementById(id.substring(0,id.length-1) + '2').style.backgroundColor != "rgb(255, 185, 0)") {
			document.getElementById(note).checked = false;
		} else {
			document.getElementById(note).checked = true;
		}
		demo();
	}
}
