var ledger = ["c0","d0","e0","f0","g0","a0","b0","c1","d1","e1","f1","g1","a1","b1","c2","d2","e2","f2","g2","a2","b2"];
var notes = ["c","c♯","d","d♯","e","f","f♯","g","g♯","a","a♯","b"];
var rootNote = "?";
var order = [];
var root = 'C';
var chordName = 'maj'
var roots=['A','A♯','B','C','C♯','D','D♯','E','F','F♯','G'];
var types=['maj','min','o','aug','7','maj7','min7','maj6','aug7','min6','mM7','o7','halfdim7','augM7','7flat5','maj9','9','7flat9','11','13','7aug5','7aug9','7aug11','7flat13','2','4','6','6-9','7-6','sus2','sus4','9sus4'];
var typeNames = ['Major','Minor','Diminished','Augmented','7','Major 7','Minor 7','Major 6','Augmented 7','Minor 6','Minor Major 7','Diminished 7','Half Diminished 7','Augmented Major 7','7 Flat 5','Major 9','9','7 Flat 9','11','13','7 Augmented 5','7 Augmented 9','7 Augmented 11','7 Flat 13','2','4','6','6-9','7-6','Suspended 2','Suspended 4','9 Suspended 4'];

// Set position for notes on the staff
var mm;
for (mm=0;mm<ledger.length;mm++) {
	document.getElementById("note-" + ledger[mm]).style.marginTop = 174 - (12 * mm) + "px";
}

//Set default chord
reset();
function reset() {
	changeKey('C');
	changeChord('maj');
}

function changeKey(note) {
	// Highlight keys on piano display when key is changed
	resetLedger();
	for (mm=0;mm<roots.length;mm++) {
		if (roots[mm] == note) {
			document.getElementById("btn" + mm).style.backgroundColor = "#ffb900";
			root=note;
		} else {
			document.getElementById("btn" + mm).style.backgroundColor = "white";
		}
 	}
	var tmpRoot = root;
	if (!sharps) {
		if(root == "A♯") {
			tmpRoot = "B♭";
		} else if(root == "C♯") {
			tmpRoot = "D♭";
		} else if(root == "D♯") {
			tmpRoot = "E♭";
		} else if(root == "F♯") {
			tmpRoot = "G♭";
		}
	}
    // Change chord names to reflect key
	document.getElementById("name-key").innerHTML = tmpRoot;
	document.getElementById("maj").innerHTML = tmpRoot + "maj";
	document.getElementById("min").innerHTML = tmpRoot + "min";
	document.getElementById("o").innerHTML = tmpRoot + "o";
	document.getElementById("aug").innerHTML = tmpRoot + "+";
	document.getElementById("7").innerHTML = tmpRoot + "7";
	document.getElementById("maj7").innerHTML = tmpRoot + "maj7";
	document.getElementById("min7").innerHTML = tmpRoot + "min7";
	document.getElementById("maj6").innerHTML = tmpRoot + "maj6";
	document.getElementById("aug7").innerHTML = tmpRoot + "+7";
	document.getElementById("min6").innerHTML = tmpRoot + "min6";
	document.getElementById("mM7").innerHTML = tmpRoot + "mM7";
	document.getElementById("o7").innerHTML = tmpRoot + "o7";
	document.getElementById("halfdim7").innerHTML = tmpRoot + "ø7";
	document.getElementById("augM7").innerHTML = tmpRoot + "+M7";
	document.getElementById("7flat5").innerHTML = tmpRoot + "7♭5";
	document.getElementById("maj9").innerHTML = tmpRoot + "maj9";
	document.getElementById("9").innerHTML = tmpRoot + "9";
	document.getElementById("7flat9").innerHTML = tmpRoot + "7♭9";
	document.getElementById("11").innerHTML = tmpRoot + "11";
	document.getElementById("13").innerHTML = tmpRoot + "13";
	document.getElementById("7aug5").innerHTML = tmpRoot + "7+5";
	document.getElementById("7aug9").innerHTML = tmpRoot + "7+9";
	document.getElementById("7aug11").innerHTML = tmpRoot + "7+11";
	document.getElementById("7flat13").innerHTML = tmpRoot + "7♭13";
	document.getElementById("2").innerHTML = tmpRoot + "2";
	document.getElementById("4").innerHTML = tmpRoot + "4";
	document.getElementById("6").innerHTML = tmpRoot + "6";
	document.getElementById("6-9").innerHTML = tmpRoot + "6/9";
	document.getElementById("7-6").innerHTML = tmpRoot + "7/6";
	document.getElementById("sus2").innerHTML = tmpRoot + "sus2";
	document.getElementById("sus4").innerHTML = tmpRoot + "sus4";
	document.getElementById("9sus4").innerHTML = tmpRoot + "9sus4";
	begin();
}

function begin() {
	if (root != null && chordName != null) {
		checkChord(root,chordName);
	}
}

// Clear all notes on the staff
function resetLedger() {
	for (mm=0;mm<3;mm++) {
		document.getElementById("note-c" + mm).style.opacity = "0";
		document.getElementById("note-d" + mm).style.opacity = "0";
		document.getElementById("note-e" + mm).style.opacity = "0";
		document.getElementById("note-f" + mm).style.opacity = "0";
		document.getElementById("note-g" + mm).style.opacity = "0";
		document.getElementById("note-a" + mm).style.opacity = "0";
		document.getElementById("note-b" + mm).style.opacity = "0";
		document.getElementById("note-c" + mm + "-a").innerHTML = "";
		document.getElementById("note-d" + mm + "-a").innerHTML = "";
		document.getElementById("note-e" + mm + "-a").innerHTML = "";
		document.getElementById("note-f" + mm + "-a").innerHTML = "";
		document.getElementById("note-g" + mm + "-a").innerHTML = "";
		document.getElementById("note-a" + mm + "-a").innerHTML = "";
		document.getElementById("note-b" + mm + "-a").innerHTML = "";
	}
}

function changeChord(type) {
	// Highlight keys on piano display when chord is changed
	resetLedger();
	document.getElementById("name-chord").innerHTML = typeNames[types.indexOf(type)];
	for (mm=0;mm<types.length;mm++) {
		if (types[mm] == type) {
			document.getElementById(types[mm]).style.backgroundColor = "#ffb900";
			chordName=type;
		} else {
			document.getElementById(types[mm]).style.backgroundColor = "white";
		}
	}
	begin();
}

// Change key names between sharps and flats
var sharps = true;
function sharpsToFlats() {
	if (sharps) {
		document.getElementById("k-a").innerHTML = "B";
		document.getElementById("k-c").innerHTML = "D";
		document.getElementById("k-d").innerHTML = "E";
		document.getElementById("k-f").innerHTML = "G";
		document.getElementById("a-a").innerHTML = "♭";
		document.getElementById("c-a").innerHTML = "♭";
		document.getElementById("d-a").innerHTML = "♭";
		document.getElementById("f-a").innerHTML = "♭";
		document.getElementById("stof").innerHTML = "Flats";
		sharps = false;
	} else {
		document.getElementById("k-a").innerHTML = "A";
		document.getElementById("k-c").innerHTML = "C";
		document.getElementById("k-d").innerHTML = "D";
		document.getElementById("k-f").innerHTML = "F";
		document.getElementById("a-a").innerHTML = "♯";
		document.getElementById("c-a").innerHTML = "♯";
		document.getElementById("d-a").innerHTML = "♯";
		document.getElementById("f-a").innerHTML = "♯";
		document.getElementById("stof").innerHTML = "Sharps";
		sharps = true;
	}
	changeKey(root);
}

// Show notes on the staff
function produceChord(rI, arr) {
	var pos = 1;
	var pos2 = 2;
	if (rI >= 7) {
		pos = 0;
		pos2 = 1;
	}
	var ee = 0;
	while (ee < arr.length) {
		if (rI + arr[ee] > 11) {
			light("key-" + notes[(rI + arr[ee]) - 12] + pos2,notes[rI + arr[ee]],"1");
		} else {
			light("key-" + notes[rI + arr[ee]] + pos,notes[rI + arr[ee]],"1");
		}
		ee++;
	}
}

function checkChord(key,crd) {
	// Reset keys on piano roll
	for (i=0;i<notes.length;i++) {
		for (j=0; j<3; j++) {
			if (i == 1 || i == 3 || i == 6 || i == 8 || i == 10) {
				// Black keys
				document.getElementById('key-' + notes[i] + j).style.backgroundColor = "#242424";
			} else {
				// White keys
				document.getElementById('key-' + notes[i] + j).style.backgroundColor = "white";
			}
		}
		document.getElementById(notes[i]).checked = false;
	}
	var rootIndex = notes.indexOf(key.toLowerCase());
	var ll;
	// Find order of keys on piano roll to highlight given selected chord
	if (crd == "maj") {
		produceChord(rootIndex,[0,4,7]);
	} else if (crd == "min") {
		produceChord(rootIndex,[0,3,7]);
	} else if (crd == "aug") {
		produceChord(rootIndex,[0,4,8]);
	} else if (crd == "o") {
		produceChord(rootIndex,[0,3,6]);
	} else if (crd == "7") {
		produceChord(rootIndex,[0,4,7,10]);
	} else if (crd == "maj7") {
		produceChord(rootIndex,[0,4,7,11]);
	} else if (crd == "min7") {
		produceChord(rootIndex,[0,3,7,10]);
	} else if (crd == "maj6") {
		produceChord(rootIndex,[0,4,7,9]);
	} else if (crd == "7") {
		produceChord(rootIndex,[0,4,7,10]);
	} else if (crd == "aug7") {
		produceChord(rootIndex,[0,4,8,10]);
	} else if (crd == "min6") {
		produceChord(rootIndex,[0,3,7,10]);
	} else if (crd == "mM7") {
		produceChord(rootIndex,[0,3,7,11]);
	} else if (crd == "o7") {
		produceChord(rootIndex,[0,3,6,9]);
	} else if (crd == "halfdim7") {
		produceChord(rootIndex,[0,3,6,10]);
	} else if (crd == "augM7") {
		produceChord(rootIndex,[0,4,8,11]);
	} else if (crd == "7flat5") {
		produceChord(rootIndex,[0,4,6,10]);
	} else if (crd == "maj9") {
		produceChord(rootIndex,[0,2,4,7,11]);
	} else if (crd == "9") {
		produceChord(rootIndex,[0,2,4,7,10]);
	} else if (crd == "7flat9") {
		produceChord(rootIndex,[0,1,4,7,10]);
	} else if (crd == "11") {
		produceChord(rootIndex,[0,2,4,5,7,10]);
	} else if (crd == "13") {
		produceChord(rootIndex,[0,2,4,5,7,9,10]);
	} else if (crd == "13") {
		produceChord(rootIndex,[0,2,4,5,7,9,10]);
	} else if (crd == "7aug5") {
		produceChord(rootIndex,[0,4,8,10]);
	} else if (crd == "7aug9") {
		produceChord(rootIndex,[0,3,4,7,10]);
	} else if (crd == "7aug11") {
		produceChord(rootIndex,[0,2,4,6,7,10]);
	} else if (crd == "7flat13") {
		produceChord(rootIndex,[0,2,4,5,7,8,10]);
	} else if (crd == "2") {
		produceChord(rootIndex,[0,2,4,7]);
	} else if (crd == "4") {
		produceChord(rootIndex,[0,4,5,7]);
	} else if (crd == "6") {
		produceChord(rootIndex,[0,4,7,9]);
	} else if (crd == "6-9") {
		produceChord(rootIndex,[0,2,4,7,9]);
	} else if (crd == "7-6") {
		produceChord(rootIndex,[0,4,7,9,10]);
	} else if (crd == "sus2") {
		produceChord(rootIndex,[0,2,7]);
	} else if (crd == "sus4") {
		produceChord(rootIndex,[0,5,7]);
	} else if (crd == "9sus4") {
		produceChord(rootIndex,[0,2,4,7,10]);
	}
}

function light(id, note, val) {
	if (id.substring(5,6) == '♯') {
		if (document.getElementById(id).style.backgroundColor != "rgb(255, 185, 0)") {
			document.getElementById(id).style.backgroundColor = "#ffb900";
			document.getElementById("note-" + id.substring(4,5)  + id.substring(6,7)).style.opacity = "1";
			document.getElementById("note-" + id.substring(4,5)  + id.substring(6,7)).innerHTML = "o";
			document.getElementById("note-" + id.substring(4,5)  + id.substring(6,7) + "-a").style.opacity = "1";
			document.getElementById("note-" + id.substring(4,5)  + id.substring(6,7) + "-a").innerHTML = "♯";
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
	}
}
