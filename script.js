const banner = document.getElementById("Banner");
document.addEventListener('DOMContentLoaded', function() {
	loadGitHubDb(true);
	
	const bannerTime = setTimeout(() => {banner.classList.add('fade-in');}, 300);
	const studentTime = setTimeout(() => {btnEstudiantes.classList.add('fade-in');}, 600);
	const docenTime = setTimeout(() => {btnDocentes.classList.add('fade-in');}, 900);
	const raceTime = setTimeout(() => {btnCarreras.classList.add('fade-in');}, 1200);
	const asigTime = setTimeout(() => {btnAsignaturas.classList.add('fade-in');}, 1500);
	const titleTime = setTimeout(() => {titleText.classList.add('fade-in');}, 1800);
	const searchTime = setTimeout(() => {searchBoxx.classList.add('fade-in');}, 2200);
	const clickTime = setTimeout(() => {canClick = true;}, 2700);
});

const dataRepo = "https://raw.githubusercontent.com/unesrcamaguan/unesrcamaguan.github.io/refs/heads/main/data/";
var dbInUse = "Estudiantes";
var dbArray = [];
const titleText = document.getElementById("Title");
const tabla = document.getElementById("database-table");
const searchBoxx = document.getElementById("searchbox");
let inTimer = "";

async function loadGitHubDb(firstTrans = false) {
	const dbToFetch = `${dataRepo}${dbInUse}/database.csv`;
	const response = await fetch(dbToFetch);
	
	const data = await response.text();
	Papa.parse(data, {
		header: true,
		complete: function(results) {
			dbArray = results.data;
		}, error: function(error) {
			console.error('Error parsing CSV:', error);
		}
	});

	titleText.classList.remove('fade-in');
	searchBoxx.classList.remove('fade-in');
	
	canClick = false;
	inTimer = setTimeout(() => {
		titleText.textContent = `Busqueda de ${dbInUse}`;
		titleText.classList.add('fade-in');
		searchBoxx.classList.add('fade-in');
		canClick = true;
		
		createFilters();
	}, 500);
	if (firstTrans) {clearTimeout(inTimer); createFilters();} else {tabla.classList.remove('fade-in');}
}

var tablaFilters = [];
function createFilters() {
	searchFilters.innerHTML = "";
	
	var tablaFiltersTxt = [];
	switch (dbInUse) {
		case "Estudiantes": tablaFilters = ["byName", "bySname", "byCI", "byRace", "byLie", "byTime"]; tablaFiltersTxt = ["Por nombres", "Por apellidos", "Por cédula", "Por carrera", "Por mención", "Por cohorte"]; break;
		case "Docentes": tablaFilters = ["byName", "bySname", "byCI", "bySpecial"]; tablaFiltersTxt = ["Por nombres", "Por apellidos", "Por cédula", "Por especialidad"]; break;
		case "Carreras": tablaFilters = ["byRace", "byLie"]; tablaFiltersTxt = ["Por carrera", "Por mención"]; break;
		case "Asignaturas": tablaFilters = ["byWork", "byHours", "byRace", "byLie", "byTime"]; tablaFiltersTxt = ["Por asignatura", "Por horas", "Por carrera", "Por mención", "Por cohorte"]; break;
	}
	
	for (var i = 0; i < tablaFilters.length; i++) {
		const element = document.createElement("option");
		element.value = tablaFilters[i];
		element.textContent = tablaFiltersTxt[i];
		searchFilters.appendChild(element);
	}
}

const btnEstudiantes = document.getElementById("btnEstudiantes");
const btnDocentes = document.getElementById("btnDocentes");
const btnCarreras = document.getElementById("btnCarreras");
const btnAsignaturas = document.getElementById("btnAsignaturas");
var canClick = false;

btnEstudiantes.onclick = () => {if (canClick) {dbInUse = "Estudiantes"; loadGitHubDb();}}
btnDocentes.onclick = () => {if (canClick) {dbInUse = "Docentes"; loadGitHubDb();}}
btnCarreras.onclick = () => {if (canClick) {dbInUse = "Carreras"; loadGitHubDb();}}
btnAsignaturas.onclick = () => {if (canClick) {dbInUse = "Asignaturas"; loadGitHubDb();}}

let searchBox = document.querySelector("#search-box");
let searchFilters = document.querySelector("#filters");
searchBox.oninput = () => {
	resetTabla();
	
	let buffer = searchBox.value.toLowerCase();
	if (buffer != "" && buffer != " ") {
		for (var i = 0; i < dbArray.length; i++) {
			let sFilter = searchFilters.value;
			search(sFilter, buffer, i);
		}
	}
}

function resetTabla() {
	tabla.innerHTML = "";
	var tablaHeads = [];
	switch (dbInUse) {
		case "Estudiantes": tablaHeads = ["Nombres", "Apellidos", "Cédula", "Carrera", "Mención", "Cohorte", "Teléfono"]; break;
		case "Docentes": tablaHeads = ["Nombres", "Apellidos", "Cédula", "Especialidad", "Teléfono", "Correo"]; break;
		case "Carreras": tablaHeads = ["Carrera", "Mención", "Duración"]; break;
		case "Asignaturas": tablaHeads = ["Asignatura", "Horas", "Carrera","Mención","Cohorte"]; break;
	}
	
	for (var i = 0; i < tablaHeads.length; i++) {newTablaElement("th",tablaHeads[i]);}
	const next = document.createElement("tr");
	tabla.appendChild(next);
	tabla.hidden = true;
}

function newTablaElement(newElement, newText) {
	const element = document.createElement(newElement);
	element.textContent = newText;
	tabla.appendChild(element);
}

function search(sFilter, input, i) {
	var tablaChilds = [];
	switch (dbInUse) {
		case "Estudiantes": tablaChilds = [dbArray[i].Names, dbArray[i].SNames, dbArray[i].DNI, dbArray[i].Race, dbArray[i].Lie, dbArray[i].Time, dbArray[i].Phone]; break;
		case "Docentes": tablaChilds = [dbArray[i].Names, dbArray[i].SNames, dbArray[i].DNI, dbArray[i].Special, dbArray[i].Phone, dbArray[i].Mail]; break;
		case "Carreras": tablaChilds = [dbArray[i].Race, dbArray[i].Lie, dbArray[i].Time]; break;
		case "Asignaturas": tablaChilds = [dbArray[i].Work, dbArray[i].Hours, dbArray[i].Race, dbArray[i].Lie, dbArray[i].Time]; break;
	}
	
	var result;
	switch (sFilter) {
		case tablaFilters[0]: result = tablaChilds[0]; break;
		case tablaFilters[1]: result = tablaChilds[1]; break;
	}
	
	if (sFilter != null || sFilter != undefined) {
		if (sFilter == tablaFilters[2]) {result = tablaChilds[2];}
		if (sFilter == tablaFilters[3]) {result = tablaChilds[3];}
		if (sFilter == tablaFilters[4]) {result = tablaChilds[4];}
		if (sFilter == tablaFilters[5]) {result = tablaChilds[5];}
	}

	if (result != undefined) {
		var dato = result.toLowerCase();
		//if (dato.startsWith(input)) { //PREGUNTAR
		if (dato.includes(input)) {
			for (var e = 0; e < tablaChilds.length; e++) {newTablaElement("td",tablaChilds[e]);}
			const next = document.createElement("tr");
			tabla.appendChild(next);
			tabla.classList.add('fade-in');
			tabla.hidden = false;
		}
	}
}