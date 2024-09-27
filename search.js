var ind = document.cookie.search("search");
var searchKey = document.cookie.substr(ind+7,).split(";")[0];
var searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchKey}`;

var searchedArr = new Array;

async function getSearchResults()
{
	var response = await fetch(searchURL);
	var data = await response.json();
	await loadMovieGenres();
	
	for(var i=0; i<data.results.length; i++)
	{
		insertCard(searchedArr, i, data, "searchCards");
	}
}






getSearchResults();
console.log(searchURL);
