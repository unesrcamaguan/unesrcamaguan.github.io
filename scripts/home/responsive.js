let windowWidth;
const ogSizes = {btnFont: 32, btnPadd: 3.5,	searchBg: 800, searchInput: 735, textSize: 20, srWidth: 50};
let sizes = {btnFont: 32, btnPadd: 3.5, searchBg: 800, searchInput: 735, textSize: 20, srWidth: 50};

const bannerImagen = document.getElementById("bannerImagen");
const mobileLogo = document.getElementById("mobileLogo");

document.addEventListener('DOMContentLoaded', function() {resizeAll();});
window.addEventListener('resize', () => {resizeAll();});

function resizeAll() {
	if (window.innerWidth >= 500) {
		windowWidth = window.innerWidth * .001;
		sizes.btnFont = ogSizes.btnFont * windowWidth;
		sizes.btnPadd = ogSizes.btnPadd / (windowWidth * .5);
		sizes.searchBg = ogSizes.searchBg * windowWidth;
		sizes.searchInput = ogSizes.searchInput * windowWidth;
		sizes.srWidth = ogSizes.srWidth / windowWidth;
		//doMobile(false);

		if (window.innerWidth >= 850) {
			sizes.textSize = ogSizes.textSize * windowWidth;
		}
	}
	
	if (window.innerWidth <= 849) {
		sizes.textSize = 17;
		if (window.innerWidth <= 499) {
			sizes.btnFont = 16;
			sizes.btnPadd = 14;
			sizes.searchBg = 400;
			sizes.searchInput = 367.5;
			sizes.srWidth = 100;
			//doMobile();
		}
	}
	
	if (sizes.srWidth >= 100) {sizes.srWidth = 100;} else if (sizes.srWidth <= 50) {sizes.srWidth = 50;}

	btnEstudiantes.style.fontSize = btnDocentes.style.fontSize = btnCarreras.style.fontSize = btnAsignaturas.style.fontSize = `${sizes.btnFont}px`;
	btnEstudiantes.style.padding = btnDocentes.style.padding = btnCarreras.style.padding = btnAsignaturas.style.padding = `${sizes.btnPadd}px ${sizes.btnFont}px ${sizes.btnPadd}px`;
	searchbox.style.width = `${sizes.searchBg}px`;
	inputBox.style.width = `${sizes.searchInput}px`;
	filterTxt.style.fontSize = `${sizes.textSize}px`;
	searchFilters.style.fontSize = `${sizes.textSize}px`;
	tabla.style.fontSize = `${sizes.textSize}px`;
	simonR.style.width = `${sizes.srWidth}%`;
}

function doMobile(isMobile = true) {
	//bannerImagen.hidden = btnEstudiantes.hidden = btnDocentes.hidden = btnCarreras.hidden = btnAsignaturas.hidden = isMobile;
	bannerImagen.hidden = isMobile;
	mobileLogo.hidden = !isMobile;
}