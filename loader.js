const apiKey = 'f2ce292a2059f60e320ca8e3d58a779c';
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`

const imgPrefixLink = "https://image.tmdb.org/t/p/w500";
const movieGenres= {};
	
async function loadMovieGenres()
{
	let response = await fetch(genreUrl);
	let data = await response.json();
	data.genres.forEach(genre => movieGenres[genre.id] = genre.name);
}

function cardClick(event)
{
	localStorage.setItem("selectedMovieId",`${this.id}`);
	location.href = "detailedView.html"
}

function insertCard(cardArr, index, data, appendtagId)
{			
	cardArr[index] = document.createElement("a");
	cardArr[index].className = "movie-card";
	cardArr[index].id = data[index].id;
	
	cardArr[index].onclick = cardClick;
				
	var img = new Image();
	img.src = `${imgPrefixLink}${data[index].poster_path}`;
	cardArr[index].append(img);
				
	var head = document.createElement("h3");
	head.innerText = `${data[index].title}`;
	cardArr[index].append(head);
		
	for(id of data[index].genre_ids)
	{	
		var genretag = document.createElement("p");
		genretag.className = "genre-tag";
		genretag.innerText = movieGenres[id];
		cardArr[index].append(genretag);
	}
			
	document.getElementById(appendtagId).append(cardArr[index]);
		
}
	
function removeCard(cardArr, index)
{	
	let x = cardArr[index];
	cardArr[index].outerHTML = "";
		
	for(var i=index+1; i<cardArr.length; i++ )
	{
		cardArr[i-1] = cardArr[i];
	}
	cardArr.pop();
		
	return x;
}
	
	