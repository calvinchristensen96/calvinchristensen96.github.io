var amount, potential;
var species;
var pkmn;
var minIV = 0;
var invert = [false,false,false,false];
var alolan = [19,20,26,27,28,37,38,50,51,52,53,74,75,76,88,89,103,105,'Alolan'];
var mega = [3,9,15,18,65,94,115,130,'Mega'];
var megax = [6,150, "Mega-X"];
var megay = [6,150, 'Mega-Y'];
var armored = [150,'Armored'];
var galarian = [52,83,110,263,264,'Galarian'];
var deoxys = [386];
var wormadam = [413];
var giratina = [487, 'Origin'];
var base_atk_wormadam = [141,141,127];
var base_def_wormadam = [180,180,175];
var base_sta_wormadam = [155,155,155];
var base_atk_giratina = [225];
var base_def_giratina = [187];
var base_sta_giratina = [284];
var base_atk_alolan = [103,135,201,125,177,96,170,108,201,99,158,132,164,211,135,190,230,144];
var base_def_alolan = [70,154,154,129,195,109,193,81,142,78,136,132,164,198,90,172,153,186];
var base_sta_alolan = [102,181,155,137,181,116,177,67,111,120,163,120,146,190,190,233,216,155];
var base_atk_mega = [241,264,303];
var base_def_mega = [246,237,148];
var base_sta_mega = [190,188,163];
var base_atk_megax = [273];
var base_def_megax = [213];
var base_sta_megax = [186];
var base_atk_megay = [319];
var base_def_megay = [212];
var base_sta_megay = [186];
var base_atk_galarian = [115,174,174,58,142];
var base_def_galarian = [92,114,197,80,128];
var base_sta_galarian = [137,141,163,116,186];
var base_atk_armored = [182];
var base_def_armored = [278];
var base_sta_armored = [214];
var base_atk_deoxys = [414,114,230];
var base_def_deoxys = [46,330,218];
var base_sta_deoxys = [137,137,137];

function modalOpen(val) {
	document.getElementById("modal").style.display = "none";
	document.getElementById("overlay").style.display = "none";
	if (val==0) {
		document.getElementById("modal").style.display = "block";
		document.getElementById("overlay").style.display = "block";
		document.getElementById("modal-title").innerHTML = "About";
		document.getElementById("modal-content").innerHTML = "<p>Combat Point Maximizer is a tool that can be used to find every IV combination a Pokemon can have to reach a specific CP.</p><br><br><br><br><hr>Pokémon And All Respective Names are Trademark & © of Nintendo 1996-2022<br>Pokémon GO is Trademark & © of Niantic, Inc.<br>I am not affiliated with Niantic Inc., The Pokemon Company, or Nintendo.<br>Pokemon images used from img.pokemondb.net.<br>For inquiries, contact calvinchristensen96@gmail.com";
	} else if (val==1) {
		document.getElementById("modal").style.display = "block";
		document.getElementById("modal-title").innerHTML = "Updates";
		document.getElementById("modal-content").innerHTML = "<h4>January 17th, 2022</h4><ul><li>Added minimum IVs setting</li><li>Added Pokemon from 808. Meltan to 893. Zarude</li></ul>";
	} else if (val==2) {
		document.getElementById("modal").style.display = "block";
		document.getElementById("modal-title").innerHTML = "Contact";
		document.getElementById("modal-content").innerHTML = "If you want to report any bugs, have any suggestions, or need to contact me for, please email me at calvinchristensen96@gmail.com.";
	}
}

function changeImage(suffix) {
  document.getElementById("pokemon-image").src = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + species + suffix + ".png";
}

function selectForme() {
	var choice = document.getElementById('forme-input').value;
	if (choice == "Normal") {
		calculate(base_atk[species-1], base_def[species-1],base_sta[species-1]);
		document.getElementById("pokemon-image").src = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + species + ".png";
	} else if (choice == "Alolan") {
		changeImage("_f2");
		calculate(base_atk_alolan[alolan.indexOf(parseInt(species))], base_def_alolan[alolan.indexOf(parseInt(species))], base_sta_alolan[alolan.indexOf(parseInt(species))]);
	} else if (choice == "Galarian") {
		changeImage("_f2");
		calculate(base_atk_galarian[galarian.indexOf(parseInt(species))], base_def_galarian[galarian.indexOf(parseInt(species))], base_sta_galarian[galarian.indexOf(parseInt(species))]);
	} else if (choice == "Mega") {
		changeImage("_f2");
		calculate(base_atk_mega[mega.indexOf(parseInt(species))], base_def_mega[mega.indexOf(parseInt(species))], base_sta_mega[mega.indexOf(parseInt(species))]);
	} else if (choice == "Mega-X") {
		changeImage("_f2");
		calculate(base_atk_megax[megax.indexOf(parseInt(species))], base_def_megax[megax.indexOf(parseInt(species))], base_sta_megax[megax.indexOf(parseInt(species))]);
	} else if (choice == "Armored") {
		calculate(base_atk_armored[armored.indexOf(parseInt(species))], base_def_armored[armored.indexOf(parseInt(species))], base_sta_armored[armored.indexOf(parseInt(species))]);
	} else if (choice == "Origin") {
		changeImage("_f2"); calculate(base_atk_giratina[giratina.indexOf(parseInt(species))], base_def_giratina[giratina.indexOf(parseInt(species))], base_sta_giratina[giratina.indexOf(parseInt(species))]);
	} else if (choice == "Plant") {
		calculate(base_atk_wormadam[0], base_def_wormadam[0], base_sta_wormadam[0]);
	} else if (choice == "Sandy") {
		changeImage("_f2");
		calculate(base_atk_wormadam[1], base_def_wormadam[1], base_sta_wormadam[1]);
	} else if (choice == "Trash") {
		changeImage("_f3");
		calculate(base_atk_wormadam[2], base_def_wormadam[2], base_sta_wormadam[2]);
	}
}

function openTab(evt, tabName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {

		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}



function changeMinIV() {
	var tempIV = document.getElementById("minIV").value;
	if (tempIV <= 0) {
		document.getElementById("minIV").value = 0;
		minIV = 0;
	} else if (tempIV >= 15) {
		document.getElementById("minIV").value = 15;
		minIV = 15;
	} else {
		minIV = tempIV;
	}
	calculate(base_atk[species-1], base_def[species-1],base_sta[species-1]);
}

function checkFormes(arr) {
	var options = "";
	if (arr == wormadam) {
		// options += '<option value="Plant"/><option value="Sandy"/><option value="Trash"/>';
		// document.getElementById("formes").style.display = "block";
		// document.getElementById("forme-list").innerHTML += options;
	} else {
		if (arr.includes(parseInt(species))) {
			options += '<option value=' + arr[arr.length-1] + '>';
			document.getElementById("formes").style.display = "block";
			document.getElementById("forme-list").innerHTML = '<option value="Normal"/>';
			document.getElementById("forme-list").innerHTML += options;
		}
	}
}

function begin(val) {
	var str = document.getElementById("input").value;
	species = str.substring(0, str.indexOf("."));
	checkFormes(alolan);
	checkFormes(mega);
	checkFormes(megax);
	checkFormes(galarian);
	checkFormes(armored);
	checkFormes(wormadam);
	checkFormes(giratina);
	while (species.length < 3) {
		species = '0' + species;
	}
	pkmn = str.substring(str.indexOf(".") + 2, str.length);
	var forms = document.getElementById("forms");
	if (val == 0) {
		calculate(base_atk[species-1], base_def[species-1],base_sta[species-1]);
		document.getElementById("restart").style.cursor = "pointer";
		document.getElementById('custom-cp').value = 0;
		document.getElementById("pokemon-image").src = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + species + ".png";
		document.getElementById("overview").style.height = "33vh";
		document.getElementById("content").style.backgroundColor = "#545454";
		document.getElementById("nav").style.opacity = "1";
		document.getElementById("settings").style.display = "inline";
		document.getElementById("nav").style.marginTop = "0px";
		document.getElementById("pokemon").style.display = "none";
		document.getElementById("selected-mon").innerHTML = pkmn;
		document.getElementById("table-div").style.opacity = "1";
	}
}

function startOver() {
	document.getElementById('forme-input').value = "";
	document.getElementById("formes").style.display = "none";
	document.getElementById("settings").style.display = "none";
	document.getElementById("restart").style.cursor = "default";
	document.getElementById("pokemon").style.display = "block";
	document.getElementById("content").style.backgroundColor = "#eee";
	document.getElementById("nav").style.opacity = "0";
	document.getElementById("nav").style.marginTop = "24px";
	document.getElementById("input").value = "";
	document.getElementById("overview").style.height = "100vh";
}

function sortTable(value) {
	var table, rows, switching, i, x, y, shouldSwitch;
	table = document.getElementById("myTable");
	switching = true;
	while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 1; i < (rows.length - 1); i++) {
			shouldSwitch = false;
			if (value != 4) {
				x = rows[i].getElementsByTagName("TD")[value];
				y = rows[i + 1].getElementsByTagName("TD")[value];
				if (invert[value]) {
					if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
						shouldSwitch = true;
						break;
					}
				} else {
					if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
						shouldSwitch = true;
						break;
				}
			}
		} else {
			x = rows[i].getElementsByTagName("TD")[value].innerHTML;
			y = rows[i + 1].getElementsByTagName("TD")[value].innerHTML;
			if (x == "☆☆☆☆") {
				x = 0;
			} else if (x == "★☆☆☆") {
				x = 1;
			} else if (x == "★★☆☆") {
				x = 2;
			} else if (x == "★★★☆") {
				x = 3;
			} else if (x == "★★★★") {
				x = 4;
			}
			if (y == "☆☆☆☆") {
				y = 0;
			} else if (y == "★☆☆☆") {
				y = 1;
			} else if (y == "★★☆☆") {
				y = 2;
			} else if (y == "★★★☆") {
				y = 3;
			} else if (y == "★★★★") {
				y = 4;
			}
			if (invert[value]) {
				if (x < y) {
					shouldSwitch = true;
					break;
				}
			} else {
				if (x > y) {
					shouldSwitch = true;
					break;
					}
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
		}
	}
	document.getElementById("th-level").style.border = "none";
	document.getElementById("th-attack").style.border = "none";
	document.getElementById("th-defense").style.border = "none";
	document.getElementById("th-stamina").style.border = "none";
	document.getElementById("th-rating").style.border = "none";
	if (value == 0) {
		document.getElementById("th-level").style.borderBottom = "solid white 2px";
	} else if (value == 1) {
		document.getElementById("th-attack").style.borderBottom = "solid white 2px";
	} else if (value == 2) {
		document.getElementById("th-defense").style.borderBottom = "solid white 2px";
	} else if (value == 3) {
		document.getElementById("th-stamina").style.borderBottom = "solid white 2px";
	} else if (value == 4) {
		document.getElementById("th-rating").style.borderBottom = "solid white 2px";
	}
		invert[value] = !invert[value];
}

var maxCp = 1008;
function custom() {
	var inputValue = document.getElementById("custom-cp").value;
	potential = inputValue;
	clearTable(3);
	var iv_atk;
	var iv_def;
	var iv_sta;
	var mult = 0;
	for (iv_atk = minIV; iv_atk <= 15; iv_atk++) {
		for (iv_def = minIV; iv_def <= 15; iv_def++) {
			for (iv_sta = minIV; iv_sta <= 15; iv_sta++) {
				for (mult = 0; mult < multiplier.length; mult++) {
					if (iv_atk == 15 && iv_def == 15 && iv_sta == 15 && mult == 100) {
						maxCp = Math.floor((((base_atk[species-1] + iv_atk) * (Math.pow(base_def[species-1] + iv_def,0.5)) * (Math.pow(base_sta[species-1] + iv_sta,0.5)) * Math.pow(multiplier[mult],2)) / 10));
						document.getElementById("maxCp").innerHTML = "Max CP: " + maxCp;
					}
					if (Math.floor((((base_atk[species-1] + iv_atk) * (Math.pow(base_def[species-1] + iv_def,0.5)) * (Math.pow(base_sta[species-1] + iv_sta,0.5)) * Math.pow(multiplier[mult],2)) / 10)) == potential) {
						addRow(mult,iv_atk, iv_def, iv_sta,"myTable3");
						amount++;
					}
				}
			}
		}
	}
	if (document.getElementById("myTable3").rows.length <= 1) {
		document.getElementById('custom-table-content').innerHTML = "No data available.";
		document.getElementById("myTable3").style.display = "none";
	}
}

function calculate(a,d,s) {
	potential = 1500;
	clearTable(1);
	var iv_atk;
	var iv_def;
	var iv_sta;
	var mult = 0;
	for (iv_atk = minIV; iv_atk <= 15; iv_atk++) {
		for (iv_def = minIV; iv_def <= 15; iv_def++) {
			for (iv_sta = minIV; iv_sta <= 15; iv_sta++) {
				for (mult = 0; mult < multiplier.length; mult++) {
					if (iv_atk == 15 && iv_def == 15 && iv_sta == 15 && mult == 100) {
						maxCp = Math.floor((((a + iv_atk) * (Math.pow(d + iv_def,0.5)) * (Math.pow(s + iv_sta,0.5)) * Math.pow(multiplier[mult],2)) / 10));
						document.getElementById("maxCp").innerHTML = "Max CP: " + maxCp;
					}
					if (Math.floor((((a + iv_atk) * (Math.pow(d + iv_def,0.5)) * (Math.pow(s + iv_sta,0.5)) * Math.pow(multiplier[mult],2)) / 10)) == potential) {
						addRow(mult,iv_atk, iv_def, iv_sta,"myTable");
						amount++;
					}
				}
			}
		}
	}
	if (document.getElementById("myTable").rows.length <= 1) {
		document.getElementById('great-table-content').innerHTML = "No data available.";
		document.getElementById("myTable").style.display = "none";
	}
	potential = 2500;
	clearTable(2);
	for (iv_atk = minIV; iv_atk <= 15; iv_atk++) {
		for (iv_def = minIV; iv_def <= 15; iv_def++) {
			for (iv_sta = minIV; iv_sta <= 15; iv_sta++) {
				for (mult = 0; mult < multiplier.length; mult++) {
					if (Math.floor((((a + iv_atk) * (Math.pow(d + iv_def,0.5)) * (Math.pow(s + iv_sta,0.5)) * Math.pow(multiplier[mult],2)) / 10)) == potential) {
						addRow(mult,iv_atk, iv_def, iv_sta,"myTable2");
						amount++;
					}
				}
			}
		}
	}
	if (document.getElementById("myTable2").rows.length <= 1) {
		document.getElementById('ultra-table-content').innerHTML = "No data available.";
		document.getElementById("myTable2").style.display = "none";
	}
}

function clearTable(tableNum) {
	amount = 0;
	if (tableNum == 1) {
		var table = document.getElementById("myTable");
		var x = document.getElementById("myTable").rows.length;
		document.getElementById("myTable").style.display = "inline";
		document.getElementById('great-table-content').innerHTML = "";
	} else if (tableNum == 2) {
		var table = document.getElementById("myTable2");
		var x = document.getElementById("myTable2").rows.length;
		document.getElementById("myTable2").style.display = "inline";
		document.getElementById('ultra-table-content').innerHTML = "";
	} else if (tableNum == 3) {
		var table = document.getElementById("myTable3");
		var x = document.getElementById("myTable3").rows.length;
		document.getElementById("myTable3").style.display = "inline";
		document.getElementById('custom-table-content').innerHTML = "";
	}
	var i;
	for (i = 1; i < x; i++) {
		var row = table.deleteRow(1);
	}
}

function addRow(l,a,d,s, tableId) {
	var table = document.getElementById(tableId);
	var row = table.insertRow(1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);
	cell1.innerHTML = level[l];
	cell2.innerHTML = a;
	cell3.innerHTML = d;
	cell4.innerHTML = s;
	if (a + d + s == 45) {
		cell5.innerHTML = "★★★★";
	} else if (a + d + s >= 37) {
		cell5.innerHTML = "★★★☆";
	} else if (a + d + s >= 30) {
		cell5.innerHTML = "★★☆☆";
	} else if (a + d + s >= 23) {
		cell5.innerHTML = "★☆☆☆";
	} else {
		cell5.innerHTML = "☆☆☆☆";
	}
}
