	
	const title = localStorage.getItem("card");
	const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&page=1`
	const ytURL = "https://www.youtube.com/embed/"
	
	
	async function fetchData()
	{
		var response = await fetch(apiURL);
		var data = await response.json();
		var posPath = imgPrefixLink+data.results[0].poster_path;
		var backPath = imgPrefixLink+data.results[0].backdrop_path;
		var releaseDate = new Date(data.results[0].release_date);
		var movieId = data.results[0].id;
		var apiTrailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
		var response = await fetch(apiTrailer);
		var trailerData = await response.json();
		var ytKey;
		
		for(item of trailerData.results)
		{
			if(item.name.toLowerCase().includes("official trailer"))
			{
				ytKey = item.key;
				break;
			}
		}
		
		if(ytKey === undefined)
		{	
			for(item of trailerData.results)
			{
				if(item.name.toLowerCase().includes("trailer"))
				{
					ytKey = item.key;
					break;
				}
			}
			
			if(ytKey === undefined)
			ytKey = trailerData.results[0].key
		}
		
		var trailerURL = ytURL + ytKey;
		
	
		console.log(data.results[0]);
		console.log(trailerData.results);
		
		
		document.getElementById("heading").innerText = title;
		document.getElementById("rDate").innerText = releaseDate.toUTCString().slice(5,17);
		document.getElementById("poster").src = posPath;
		document.getElementById("trailer").src = trailerURL;
		document.getElementById("rating").innerText = "Rating: " + data.results[0].vote_average.toString().substr(0,3) + "/10";
		document.getElementById("voteCount").innerText = "(" + data.results[0].vote_count + ")";
		document.title = title;
	}
	
	
	
	fetchData();