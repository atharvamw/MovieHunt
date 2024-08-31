const apiKey = 'f2ce292a2059f60e320ca8e3d58a779c';
const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
const movieGenres= {};

fetch(genreUrl)
	.then(response=>{
		return response.json();
	})
	.then(data=>{
		
		data.genres.forEach(genre => movieGenres[genre.id] = genre.name);
	})

	function insertCard(cardArr, index, data, appendtag)
	{			
			cardArr[index] = document.createElement("div");
			cardArr[index].className = "movie-card";
				
			var img = new Image();
			img.src = `https://image.tmdb.org/t/p/w500${data.results[index].poster_path}`;
			cardArr[index].append(img);
				
			var head = document.createElement("h3");
			head.innerText = `${data.results[index].title}`;
			cardArr[index].append(head);
		
			for(id of data.results[index].genre_ids)
			{	
				var genretag = document.createElement("p");
				genretag.className = "genre-tag";
				genretag.innerText = movieGenres[id];
				cardArr[index].append(genretag);
			}
			
			document.getElementById(appendtag).append(cardArr[index]);
		
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