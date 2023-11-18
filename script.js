const elMoviesMainForm = document.querySelector(".movies-main-form");
const elSearchInput = elMoviesMainForm.querySelector(".search-input");
const elFilterFrom = elMoviesMainForm.querySelector(".from-year");
const elFilterTo = elMoviesMainForm.querySelector(".to-year");
const elBtnList = document.querySelector(".btn-list");
const elMoviesList = document.querySelector(".movies-list");
const elMoviesTemplate = document.querySelector(".movies-template").content;
const moviesFragment = new DocumentFragment();

function renderDom(arr, node) {
	node.innerHTML = "";

	arr.forEach((element) => {
		const templateClone = elMoviesTemplate.cloneNode(true);
		templateClone.querySelector(
			".movies-link"
		).href = `https://www.imdb.com/title/${element.imdbID}`;
		templateClone.querySelector(".movies-img").src = element.Poster;
		templateClone.querySelector(".movies-title").textContent =
			element.Title;
		templateClone.querySelector(".movies-type").textContent = element.Type;
		templateClone.querySelector(".movies-year").textContent = element.Year;
		moviesFragment.appendChild(templateClone);
	});
	node.appendChild(moviesFragment);
}

function filteredYear(arr, from = 0, to = 2024) {
	const resultArr = arr.filter((element) => {
		return element.Year >= from && element.Year <= to;
	});
	return resultArr;
}

async function proccesFetch(url, from = 0, to = 2024) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		// renderDom(data.Search, elMoviesList);
		renderDom(filteredYear(data.Search, from, to), elMoviesList);
		console.log(data);
	} catch (error) {
		console.error(error);
	}
}

elMoviesMainForm.addEventListener("submit", (evt) => {
	evt.preventDefault();

	const searchInputVal = elSearchInput.value.trim();
	const fromInputVal = Number(elFilterFrom.value) || 0;
	const toInputVal = Number(elFilterTo.value) || 2024;

	proccesFetch(
		`https://www.omdbapi.com/?apikey=5988671&s=${searchInputVal}`,
		fromInputVal,
		toInputVal
	);
});

elBtnList.addEventListener("click", (evt) => {
	const searchInputVal = elSearchInput.value.trim();
	const fromInputVal = Number(elFilterFrom.value) || 1;
	const toInputVal = Number(elFilterTo.value) || 2024;

	console.log(evt.target);

	if (evt.target.matches(".btn-series")) {
		proccesFetch(
			`https://www.omdbapi.com/?apikey=5988671&s=${searchInputVal}&type=series`,
			fromInputVal,
			toInputVal
		);
	} else if (evt.target.matches(".btn-movie", fromInputVal, toInputVal)) {
		proccesFetch(
			`https://www.omdbapi.com/?apikey=5988671&s=${searchInputVal}&type=movie`
		);
	} else if (evt.target.matches(".btn-episode")) {
		proccesFetch(
			`https://www.omdbapi.com/?apikey=5988671&s=${searchInputVal}&type=episode`,
			fromInputVal,
			toInputVal
		);
	}
});
